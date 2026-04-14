import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSecurity } from './common/security/security.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const port = configService.get<number>('PORT') ?? 5000;
  const environment = configService.get<string>('NODE_ENV') ?? 'development';
  const corsOrigin = configService.get<string>('CORS_ORIGIN') ?? '*';

  // 🌐 Global prefix (recommended)
  app.setGlobalPrefix('api');

  // 🌍 CORS
  app.enableCors({
    origin: corsOrigin === '*' ? true : corsOrigin.split(','),
    credentials: true,
  });

  // 🔐 Security (helmet, rate limit, etc.)
  setupSecurity(app);

  // ⚠️ Webhook raw body MUST come before JSON parser
  app.use('/api/webhooks/clerk', express.raw({ type: 'application/json' }));

  // 📦 JSON parser
  app.use(express.json());

  // 🧪 Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(port);

  logger.log(`🚀 Server running on http://localhost:${port}`);
  logger.log(`🌍 Environment: ${environment}`);
  logger.log(`⏰ Started at: ${new Date().toLocaleString()}`);
}

bootstrap();
