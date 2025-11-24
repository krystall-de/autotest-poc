import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { PrismaClientModule } from '@autotest-poc/prisma-client';
import { UserController } from './user/user.controller';

@Module({
  imports: [PrismaClientModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
