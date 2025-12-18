import { createZodDto } from 'nestjs-zod';
import { signInSchema } from './types/auth.schema';

export class SignInDto extends createZodDto(signInSchema) {}
