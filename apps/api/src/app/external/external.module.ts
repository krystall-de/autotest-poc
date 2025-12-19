import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExternalService } from './services/external.service';
import { ExternalAxiosClient } from './clients/external.axios-client';
import { ExternalHttpClient } from './clients/external.http-client';
import { ExternalController } from './controllers/external.controller';

@Module({
  imports: [HttpModule],
  controllers: [ExternalController],
  providers: [ExternalService, ExternalAxiosClient, ExternalHttpClient],
  exports: [ExternalService],
})
export class ExternalModule {}
