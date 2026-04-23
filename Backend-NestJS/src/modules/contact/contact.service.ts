import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { toSriLankaDateTime } from '../../common/utils/date.util';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateContactDto) {
    return this.prisma.contact.create({
      data,
    });
  }

  async findAll(
    page = 1,
    limit = 10,
    filters?: {
      search?: string;
      fromDate?: string;
      toDate?: string;
      isRead?: string;
    },
  ) {
    const skip = (page - 1) * limit;

    let where: any = {};

    // SEARCH FILTER
    if (filters?.search) {
      where = {
        OR: [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { email: { contains: filters.search, mode: 'insensitive' } },
          { subject: { contains: filters.search, mode: 'insensitive' } },
        ],
      };
    }

    // DATE RANGE FILTER
    if (filters?.fromDate || filters?.toDate) {
      where.createdAt = {};

      if (filters.fromDate) {
        const from = new Date(filters.fromDate);
        if (!isNaN(from.getTime())) {
          where.createdAt.gte = from;
        }
      }

      if (filters.toDate) {
        const to = new Date(filters.toDate);
        if (!isNaN(to.getTime())) {
          where.createdAt.lte = to;
        }
      }
    }

    // IS READ FILTER
    if (filters?.isRead !== undefined) {
      if (filters.isRead === 'true') {
        where.isRead = true;
      } else if (filters.isRead === 'false') {
        where.isRead = false;
      }
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.contact.count({ where }),
    ]);

    return {
      data: data.map((item) => ({
        ...item,
        createdAt: toSriLankaDateTime(item.createdAt),
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateIsRead(id: number, isRead: boolean) {
    return this.prisma.contact.update({
      where: { id },
      data: { isRead },
    });
  }

  async remove(id: number) {
    return this.prisma.contact.delete({ where: { id } });
  }
}
