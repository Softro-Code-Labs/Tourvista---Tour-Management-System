import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../../infrastructure/cloudinary/cloudinary.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { FilterTourDto } from './dto/filter-tour.dto';

@Injectable()
export class ToursService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(data: CreateTourDto, file?: Express.Multer.File) {
    let imageUrl = data.image;

    if (file) {
      const uploadResult = await this.cloudinary.uploadImage(
        file,
        'tour-plans',
      );
      imageUrl = uploadResult.secure_url;
    }

    return this.prisma.tour.create({
      data: {
        ...data,
        price: Number(data.price),
        duration: Number(data.duration),
        image: imageUrl,
      },
    });
  }

  async findAll(filters: FilterTourDto) {
    const page = Number(filters.page || 1);
    const limit = Number(filters.limit || 10);
    const skip = (page - 1) * limit;

    const where: any = {};

    // 🔍 SEARCH FILTER
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { location: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    // 📍 LOCATION FILTER
    if (filters.location) {
      where.location = {
        contains: filters.location,
        mode: 'insensitive',
      };
    }

    // 💰 PRICE RANGE FILTER
    if (filters.minPrice || filters.maxPrice) {
      where.price = {
        ...(filters.minPrice && { gte: Number(filters.minPrice) }),
        ...(filters.maxPrice && { lte: Number(filters.maxPrice) }),
      };
    }

    // 🔘 ACTIVE FILTER
    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.tour.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.tour.count({ where }),
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
    return this.prisma.tour.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateTourDto, file?: Express.Multer.File) {
    const updateData: any = { ...data };

    if (file) {
      const currentTour = await this.prisma.tour.findUnique({ where: { id } });
      let existingId: string | undefined;

      if (currentTour?.image) {
        existingId = this.cloudinary.extractPublicId(currentTour.image);
      }

      const uploadResult = await this.cloudinary.uploadImage(
        file,
        'tourvista/tours',
        existingId,
      );
      updateData.image = uploadResult.secure_url;
    }

    if (data.price) updateData.price = Number(data.price);
    if (data.duration) updateData.duration = Number(data.duration);

    return this.prisma.tour.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    return this.prisma.tour.delete({
      where: { id },
    });
  }
}
