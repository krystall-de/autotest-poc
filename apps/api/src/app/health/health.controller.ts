import { PrismaClientService } from '@autotest-poc/prisma-client';
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private prismaHealthIndicator: PrismaHealthIndicator,
    private prismaClientService: PrismaClientService
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () =>
        this.prismaHealthIndicator.pingCheck(
          'database',
          this.prismaClientService
        ),
    ]);
  }
}
