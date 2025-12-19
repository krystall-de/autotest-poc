import { createZodDto } from 'nestjs-zod';
import { signInSchema } from '../models/auth.schema';

export class SignInDto extends createZodDto(signInSchema) {}
