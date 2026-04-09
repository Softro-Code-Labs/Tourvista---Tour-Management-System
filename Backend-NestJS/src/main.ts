import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5000;
  const environment = configService.get<string>('NODE_ENV') || 'development';

  await app.listen(port);

  const logger = new Logger('Bootstrap');

  logger.log(`🚀 Server is running on: http://localhost:${port}`);
  logger.log(`📦 App Name: TourVista Tours API`);
  logger.log(`🌍 Environment: ${environment}`);
  logger.log(`⏰ Started at: ${new Date().toLocaleString()}`);
}
bootstrap();
