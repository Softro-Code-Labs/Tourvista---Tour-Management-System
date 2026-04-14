import { Module } from '@nestjs/common';
import { ClerkModule } from '../../infrastructure/providers/clerk/clerk.module';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';

@Module({
  imports: [ClerkModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
