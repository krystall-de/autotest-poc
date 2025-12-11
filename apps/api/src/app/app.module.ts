import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule, UserModule],
  providers: [],
})
export class AppModule {}
