import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from './auth.dto';
import { Public } from '../decorators/public.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import type { AuthUser } from '../models/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in')
  async signIn(@Body() body: SignInDto) {
    return this.authService.authenticate(body.email);
  }

  @Get('me')
  getMe(@CurrentUser() currUser: AuthUser) {
    return currUser;
  }
}
