// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FastifyRequest } from 'fastify';
import { AuthUser } from './auth/types/auth.types';

declare module 'fastify' {
  interface FastifyRequest {
    user?: AuthUser;
  }
}
