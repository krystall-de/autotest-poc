import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaClientModule } from '@autotest-poc/prisma-client';

@Module({
  imports: [PrismaClientModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
