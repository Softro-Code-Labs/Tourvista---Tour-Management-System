import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { QueryBookingDto } from './dto/query-booking.dto';
import { UpdateBookingAdminDto } from './dto/update-booking-admin.dto';
import { UpdateBookingUserDto } from './dto/update-booking-user.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBookingDto) {
    return this.prisma.booking.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });
  }

  async findAll(query: QueryBookingDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    // Filter by user ID
    if (query.userId) {
      where.userId = query.userId;
    }

    // Filter by status
    if (query.status) {
      where.status = query.status;
    }

    // Filter by user email (relation)
    if (query.userEmail) {
      where.user = {
        email: {
          contains: query.userEmail,
          mode: 'insensitive',
        },
      };
    }

    // Date range filter
    if (query.fromDate || query.toDate) {
      where.createdAt = {};

      if (query.fromDate) {
        where.createdAt.gte = new Date(query.fromDate);
      }

      if (query.toDate) {
        where.createdAt.lte = new Date(query.toDate);
      }
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.booking.findMany({
        where,
        include: {
          user: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.booking.count({ where }),
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

  async findOne(id: number) {
    return this.prisma.booking.findUnique({
      where: { id },
    });
  }

  async updateByAdmin(id: number, data: UpdateBookingAdminDto) {
    return this.prisma.booking.update({
      where: { id },
      data,
    });
  }

  async updateByUser(id: number, userId: string, data: UpdateBookingUserDto) {
    return this.prisma.booking.updateMany({
      where: {
        id,
        userId,
      },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.booking.delete({
      where: { id },
    });
  }
}
