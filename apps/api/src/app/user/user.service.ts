import { PrismaClientService } from '@autotest-poc/prisma-client';
import { Injectable } from '@nestjs/common';
import { UserForCreate } from '@autotest-poc/api-contract';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaClientService) {}

  async getUsers() {
    return this.prismaService.user.findMany();
  }

  async createUser(user: UserForCreate) {
    return this.prismaService.user.create({
      data: user,
    });
  }
}
