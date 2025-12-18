import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../../src/app/auth/decorators/public.decorator';
import { FastifyRequest } from 'fastify';

@Injectable()
export class MockAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    // Skip checking if the route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    // Mock user data
    request.user = {
      id: 2, // ID #1 is a common seed, #2 is for test user
      name: 'Test User',
      email: 'testuser@example.com',
    };
    return true;
  }
}
