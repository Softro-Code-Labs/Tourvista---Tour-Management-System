import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { toSriLankaDateTime } from '../common/utils/date.util';

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
      createdAt?: string;
    },
  ) {
    const skip = (page - 1) * limit;

    let where: any = {};

    if (filters?.search) {
      where = {
        OR: [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { email: { contains: filters.search, mode: 'insensitive' } },
          { subject: { contains: filters.search, mode: 'insensitive' } },
        ],
      };
    }

    if (filters?.createdAt) {
      const date = new Date(filters.createdAt);

      if (!isNaN(date.getTime())) {
        where.createdAt = { gte: date };
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

  async remove(id: number) {
    return this.prisma.contact.delete({ where: { id } });
  }
}
