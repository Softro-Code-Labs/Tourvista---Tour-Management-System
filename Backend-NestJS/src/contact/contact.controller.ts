import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('api/v1/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() body: CreateContactDto) {
    return this.contactService.create(body);
  }

  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
    @Query('createdAt') createdAt?: string,
  ) {
    return this.contactService.findAll(+page, +limit, {
      search,
      createdAt,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
