import { PrismaClientService } from '@autotest-poc/prisma-client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserForCreate, UserForUpdate } from '@autotest-poc/api-contract';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaClientService) {}

  async getUsers() {
    return this.prismaService.user.findMany();
  }

  async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createUser(user: UserForCreate) {
    const userByEmail = await this.prismaService.user.findUnique({
      where: { email: user.email },
    });
    if (userByEmail) throw new BadRequestException('Email already exists');

    return this.prismaService.user.create({
      data: user,
    });
  }

  async updateUser(id: number, user: Omit<UserForUpdate, 'id'>) {
    // Check existence first
    const existing = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException('User not found');

    const userByEmail = await this.prismaService.user.findUnique({
      where: { email: user.email },
    });
    if (userByEmail && userByEmail.id !== id) {
      throw new BadRequestException('Email already exists');
    }

    return this.prismaService.user.update({
      where: { id },
      data: user,
    });
  }

  async deleteUser(id: number) {
    const existing = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException('User not found');
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
