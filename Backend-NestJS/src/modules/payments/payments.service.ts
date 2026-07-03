import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { QueryPaymentDto } from './dto/query-payment.dto';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { BookingStatus } from '../../common/enums/booking-status.enum';
import { PaymentType } from '../../common/enums/payment-type.enum';
import { PaymentStatus } from '../../common/enums/payment-status.enum';
import { SeylanMpgsService } from '../../infrastructure/seylan/seylan-mpgs.service';
import { PaymentMethod } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private prisma: PrismaService,
    private seylanMpgsService: SeylanMpgsService,
    private configService: ConfigService,
  ) {}

  /**
   * ADMIN: Returns total number of payments.
   * Used for analytics.
   */
  async getStats() {
    try {
      // GET THE GRAND TOTAL
      const totalCount = await this.prisma.payment.count();

      return { total: totalCount };
    } catch (error) {
      this.handleError('fetching payment stats', error);
    }
  }

  /**
   * Step 1: Create a secure record stub and calculate the gateway signature hash configuration
   */
  async initiatePaymentIntent(userId: string, data: CreatePaymentDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: data.bookingId },
      include: { user: true, payments: true },
    });

    if (!booking || booking.userId !== userId) {
      throw new NotFoundException(
        'The requested booking structure was not found.',
      );
    }

    // Business Logic Guard: Prevent paying if already fully paid
    const payments = (booking.payments || []) as any[];

    const totalPaid = payments
      .filter((p) => p.status === PaymentStatus.SUCCESS)
      .reduce((sum, p) => sum + p.amount, 0);

    if (totalPaid >= booking.totalAmount) {
      throw new BadRequestException(
        'This booking has already been fully paid.',
      );
    }

    // Generate a order id string to pass to the gateway
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const orderId = `TV-${String(booking.id).padStart(6, '0')}-${dateStr}`;

    const gatewaySession = await this.seylanMpgsService.initiateCheckoutSession(
      orderId,
      data.amount,
      'USD',
    );

    return {
      sessionId: gatewaySession.session.id,
    };
  }

  /**
   * STEP 2: Securely capture payment feedback webhooks without causing unique constraint drops
   */
  async processWebhook(secret: string, payload: any) {
    this.verifyWebhookSecret(secret);

    const internalOrderId = payload.order.id;
    const gatewayTransactionId = payload.transaction.id;
    const gatewayResult = payload.result;
    const paidAmount = payload.order.amount;

    // 1. Extract the bookingId from the internalOrderId string
    const bookingId = parseInt(internalOrderId.split('-')[1], 10);

    let targetStatus: PaymentStatus = PaymentStatus.FAILED;
    if (gatewayResult === 'SUCCESS') targetStatus = PaymentStatus.SUCCESS;
    if (gatewayResult === 'PENDING') targetStatus = PaymentStatus.PENDING;

    try {
      return await this.prisma.$transaction(async (tx) => {
        // 2. Idempotency Check: Verify if this gateway transaction was already written
        const existingPayment = await tx.payment.findFirst({
          where: { transactionId: gatewayTransactionId },
        });

        if (existingPayment) {
          return {
            status: 'acknowledged',
            message: 'Duplicate transaction skipped',
          };
        }

        // 3. Fetch target booking context to extract target userId and calculate total status
        const targetBooking = await tx.booking.findUnique({
          where: { id: bookingId },
          include: { payments: true },
        });

        if (!targetBooking) {
          throw new NotFoundException(
            `Booking contextual framework with ID ${bookingId} missing.`,
          );
        }

        // 4. Dynamic validation of payment type context (FULL vs ADVANCE)
        // If payment meets or exceeds overall remaining cost, it's FULL. Otherwise ADVANCE.
        const totalPaidPrior = targetBooking.payments
          .filter((p) => p.status === PaymentStatus.SUCCESS)
          .reduce((sum, p) => sum + p.amount, 0);

        const dynamicType =
          totalPaidPrior + paidAmount >= targetBooking.totalAmount
            ? PaymentType.FULL
            : PaymentType.ADVANCE;

        // 5. Create the database record on demand right here
        await tx.payment.create({
          data: {
            bookingId: targetBooking.id,
            userId: targetBooking.userId,
            amount: paidAmount,
            type: dynamicType,
            method: PaymentMethod.SEYLAN_MPGS,
            status: targetStatus,
            transactionId: gatewayTransactionId,
            gatewayData: payload as any,
          },
        });

        // 6. Recalculate ledger metrics to switch parent booking states
        if (targetStatus === PaymentStatus.SUCCESS) {
          const totalAccumulatedFunds = totalPaidPrior + paidAmount;
          const isFullyPaid =
            totalAccumulatedFunds >= targetBooking.totalAmount;

          await tx.booking.update({
            where: { id: targetBooking.id },
            data: {
              status: isFullyPaid
                ? BookingStatus.CONFIRMED
                : BookingStatus.ACTIVE,
            },
          });
        }

        return { status: 'acknowledged' };
      });
    } catch (error) {
      this.logger.error(
        `Webhook sync execution failure: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      throw new BadRequestException('Data layer sequence adjustment failure.');
    }
  }

  async findAll(query: QueryPaymentDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 12;

    const skip = (page - 1) * limit;

    // BUILD DYNAMIC FILTER OBJECT
    const where: Prisma.PaymentWhereInput = {
      ...(query.type && { type: query.type }),
      ...(query.status && { status: query.status }),
      ...((query.minAmount || query.maxAmount) && {
        amount: {
          ...(query.minAmount && { gte: Number(query.minAmount) }),
          ...(query.maxAmount && { lte: Number(query.maxAmount) }),
        },
      }),
      ...((query.fromDate || query.toDate) && {
        createdAt: {
          ...(query.fromDate && {
            gte: new Date(new Date(query.fromDate).setHours(0, 0, 0, 0)),
          }),
          ...(query.toDate && {
            lte: new Date(new Date(query.toDate).setHours(23, 59, 59, 999)),
          }),
        },
      }),
    };

    // PARALLEL EXECUTION FOR PERFORMANCE
    const [data, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      this.prisma.payment.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Verify Webhook Secret
   */
  private verifyWebhookSecret(receivedSecret: string | undefined): void {
    const expectedSecret = this.configService.get<string>(
      'SEYLAN_WEBHOOK_SECRET',
    );

    if (!expectedSecret) {
      // fail closed if misconfigured — don't silently accept everything
      this.logger.error('SEYLAN_WEBHOOK_SECRET is not configured');
      throw new UnauthorizedException('Webhook verification not configured');
    }

    if (!receivedSecret) {
      throw new UnauthorizedException('Missing notification secret');
    }

    const expectedBuf = Buffer.from(expectedSecret);
    const receivedBuf = Buffer.from(receivedSecret);

    // timingSafeEqual throws if lengths differ, so check that first
    if (
      expectedBuf.length !== receivedBuf.length ||
      !timingSafeEqual(expectedBuf, receivedBuf)
    ) {
      throw new UnauthorizedException('Invalid notification secret');
    }
  }

  /**
   * Internal Error Handler for Logging and Standardized Response
   */
  private handleError(action: string, error: any) {
    this.logger.error(`Error ${action}: ${error.message}`, error.stack);
    if (
      error instanceof NotFoundException ||
      error instanceof BadRequestException
    )
      throw error;
    throw new InternalServerErrorException(
      `Failed to process review request during ${action}.`,
    );
  }
}
