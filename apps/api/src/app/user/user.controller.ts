import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import type { CreateUserDto } from '@autotest-poc/api-contract';

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }
}
