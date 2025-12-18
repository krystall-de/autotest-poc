import z from 'zod';
import { signInSchema } from './auth.schema';

// Standard JWT claims set by the library, according to JWT config
export type JwtStandardClaims = {
  iat: number; // Issued at
  exp: number; // Expiration
  iss: string; // Issuer
  aud: string; // Audience
};

// Application-specific claims
export type JwtAppClaims = {
  sub: number; // User ID
  name: string; // User name
  email: string; // User email
};

export type JwtPayload = JwtStandardClaims & JwtAppClaims;

export type SignInInput = z.infer<typeof signInSchema>;

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};
