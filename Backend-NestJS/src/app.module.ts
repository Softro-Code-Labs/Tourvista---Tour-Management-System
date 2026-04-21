import Joi from 'joi';

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { WebhookModule } from './webhook/webhook.module';
import { BookingsModule } from './bookings/bookings.module';
import { ContactModule } from './contact/contact.module';

import { AuthGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClerkClientProvider } from './infrastructure/providers/clerk.provider';

@Module({
  imports: [
    // ⚙️ Global config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        CORS_ORIGIN: Joi.string().required(),
        CLERK_PUBLISHABLE_KEY: Joi.string().required(),
        CLERK_SECRET_KEY: Joi.string().required(),
        CLERK_WEBHOOK_SECRET: Joi.string().required(),
      }),
    }),

    // 🧩 Feature modules
    PrismaModule,
    WebhookModule,
    BookingsModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // 🔑 Clerk
    ClerkClientProvider,

    // 🔐 Auth guard (global)
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

    // 🛡️ Role guard (global)
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
