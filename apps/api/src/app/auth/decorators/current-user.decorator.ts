import { createParamDecorator } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const CurrentUser = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest<FastifyRequest>();
  return request.user;
});
