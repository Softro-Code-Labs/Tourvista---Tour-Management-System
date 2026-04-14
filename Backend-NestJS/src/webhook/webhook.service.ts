import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { ClerkWebhookEvent } from '../common/enums/clerk-event-types.enum';
import { UserRole } from '../common/enums/user-roles.enum';
import type { ClerkClient } from '@clerk/backend';

@Injectable()
export class WebhookService {
  constructor(
    private prisma: PrismaService,
    private clerkClient: ClerkClient,
  ) {}

  async handleEvent(event: any) {
    switch (event.type) {
      case ClerkWebhookEvent.USER_CREATED: {
        const user = event.data;

        await this.prisma.user.create({
          data: {
            id: user.id,
            email: user.email_addresses[0]?.email_address,
            firstName: user.first_name ?? '',
            lastName: user.last_name ?? '',
            role: UserRole.USER,
          },
        });

        await this.clerkClient.users.updateUser(user.id, {
          publicMetadata: {
            role: UserRole.USER,
          },
        });

        break;
      }

      case ClerkWebhookEvent.USER_UPDATED: {
        const user = event.data;

        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            email: user.email_addresses[0]?.email_address,
            firstName: user.first_name ?? '',
            lastName: user.last_name ?? '',
            role: (user.public_metadata?.role as UserRole) || UserRole.USER,
          },
        });

        break;
      }

      case ClerkWebhookEvent.USER_DELETED: {
        const user = event.data;

        await this.prisma.user.delete({
          where: { id: user.id },
        });

        break;
      }
    }
  }
}
