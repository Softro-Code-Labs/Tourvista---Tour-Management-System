import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';

import { BookingsService } from './bookings.service';

import { CreateBookingDto } from './dto/create-booking.dto';
import { QueryBookingDto } from './dto/query-booking.dto';
import { UpdateBookingAdminDto } from './dto/update-booking-admin.dto';
import { UpdateBookingUserDto } from './dto/update-booking-user.dto';

import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';

@Controller('v1/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Roles(Role.USER)
  create(@Body() body: CreateBookingDto) {
    return this.bookingsService.create(body);
  }

  @Get()
  findAll(@Query() query: QueryBookingDto) {
    return this.bookingsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Patch(':id/admin')
  @Roles(Role.ADMIN)
  updateByAdmin(@Param('id') id: string, @Body() body: UpdateBookingAdminDto) {
    return this.bookingsService.updateByAdmin(+id, body);
  }

  @Patch(':id/user')
  @Roles(Role.USER)
  updateByUser(
    @Param('id') id: string,
    @Body() body: UpdateBookingUserDto,
    @Query('userId') userId: string,
  ) {
    return this.bookingsService.updateByUser(+id, userId, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }
}
