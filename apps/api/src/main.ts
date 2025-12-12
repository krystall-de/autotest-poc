/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config } from './app/config/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // CORS setup
  const allowedOrigins = config.corsOrigin;
  if (allowedOrigins) {
    app.enableCors({
      origin: allowedOrigins,
      credentials: true, // allow cookies/auth headers
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type,Authorization',
      exposedHeaders: 'Content-Disposition',
    });
  }

  await app.listen({ port: config.port, host: config.host }, (err, address) => {
    if (err) {
      Logger.error(`Error starting server: ${err.message}`);
      process.exit(1);
    }
    Logger.log(`🚀 Application is running on: ${address}`);
  });
}

bootstrap();
