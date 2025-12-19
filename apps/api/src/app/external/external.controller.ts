import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ExternalService } from './external.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth.types';

@Controller('external')
export class ExternalController {
  constructor(private readonly externalService: ExternalService) {}

  @Get()
  async getAllData(@CurrentUser() currUser: AuthUser) {
    return this.externalService.getAllData(currUser);
  }

  @Get(':id')
  async getDataById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currUser: AuthUser
  ) {
    const data = await this.externalService.getDataById(id, currUser);
    if (!data) throw new NotFoundException('Data not found');
    return data;
  }
}
