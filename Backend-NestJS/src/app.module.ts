import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './contact/contact.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { BookingsModule } from './bookings/bookings.module';
import Joi from 'joi';
import { ClerkClientProvider } from './infrastructure/providers/clerk-client.provider';
import { AuthModule } from './infrastructure/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ClerkAuthGuard } from './common/guard/clerk-auth.guard';
import { RolesGuard } from './common/guard/roles.guard';
import { WebhookModule } from './webhook/webhook.module';

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
    AuthModule,
    PrismaModule,
    ContactModule,
    BookingsModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // 🔌 External providers
    ClerkClientProvider,

    // 🔐 Auth guard (global)
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },

    // 🛡️ Role guard (global)
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
