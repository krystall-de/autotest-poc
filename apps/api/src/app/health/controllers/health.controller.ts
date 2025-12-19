import { PrismaClientService } from '@autotest-poc/prisma-client';
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { Public } from '../../auth/decorators/public.decorator';

@Public()
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
