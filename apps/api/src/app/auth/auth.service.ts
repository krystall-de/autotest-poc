import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAppClaims } from './types/auth.types';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async authenticate(email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload: JwtAppClaims = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken: accessToken,
    };
  }
}
