import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { setupSecurity } from './common/security/security.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const port = configService.get<number>('PORT') ?? 5000;
  const environment = configService.get<string>('NODE_ENV') ?? 'development';
  const corsOrigin = configService.get<string>('CORS_ORIGIN') ?? '*';

  // 🌍 CORS
  app.enableCors({
    origin: corsOrigin === '*' ? true : corsOrigin.split(','),
    credentials: true,
  });

  // 🔐 Security
  setupSecurity(app);

  await app.listen(port);

  logger.log(`🚀 Server running on http://localhost:${port}`);
  logger.log(`🌍 Environment: ${environment}`);
  logger.log(`⏰ Started at: ${new Date().toLocaleString()}`);
}

bootstrap();
