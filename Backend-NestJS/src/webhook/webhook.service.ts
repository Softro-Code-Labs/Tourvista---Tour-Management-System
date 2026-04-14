import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';

@Injectable()
export class WebhookService {
  constructor(private prisma: PrismaService) {}

  async handleEvent(event: any) {
    switch (event.type) {
      case 'user.created': {
        const user = event.data;

        await this.prisma.user.create({
          data: {
            id: user.id,
            email: user.email_addresses[0]?.email_address,
            firstName: user.first_name ?? '',
            lastName: user.last_name ?? '',
            role: user.public_metadata?.role || 'USER',
          },
        });

        break;
      }

      case 'user.updated': {
        const user = event.data;

        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            email: user.email_addresses[0]?.email_address,
            firstName: user.first_name ?? '',
            lastName: user.last_name ?? '',
          },
        });

        break;
      }

      case 'user.deleted': {
        const user = event.data;

        await this.prisma.user.delete({
          where: { id: user.id },
        });

        break;
      }
    }
  }
}
