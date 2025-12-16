/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './app/config/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const configService = app.get(ConfigService<AppConfig>);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // CORS setup
  const allowedOrigins = configService.get('corsOrigin', { infer: true });
  if (allowedOrigins) {
    app.enableCors({
      origin: allowedOrigins,
      credentials: true, // allow cookies/auth headers
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type,Authorization',
      exposedHeaders: 'Content-Disposition',
    });
  }

  const port = configService.get('port', { infer: true });
  const host = configService.get('host', { infer: true });
  await app.listen({ port, host }, (err, address) => {
    if (err) {
      Logger.error(`Error starting server: ${err.message}`);
      process.exit(1);
    }
    Logger.log(`🚀 Application is running on: ${address}`);
  });
}

bootstrap();
