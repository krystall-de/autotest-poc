import { PrismaClientModule } from '@autotest-poc/prisma-client';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers/health.controller';

@Module({
  imports: [TerminusModule, PrismaClientModule],
  controllers: [HealthController],
})
export class HealthModule {}
