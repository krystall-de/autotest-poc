import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [HealthModule, UserModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
