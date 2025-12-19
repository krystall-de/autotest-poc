import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExternalService } from './external.service';
import { ExternalAxiosClient } from './client/external.axios-client';
import { ExternalHttpClient } from './client/external.http-client';
import { ExternalController } from './external.controller';

@Module({
  imports: [HttpModule],
  controllers: [ExternalController],
  providers: [ExternalService, ExternalAxiosClient, ExternalHttpClient],
  exports: [ExternalService],
})
export class ExternalModule {}
