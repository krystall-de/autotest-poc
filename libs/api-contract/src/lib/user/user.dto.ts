import { createUserSchema, updateUserSchema } from './user.schema.js';
import { createZodDto } from 'nestjs-zod';

export class CreateUserDto extends createZodDto(createUserSchema) {}

export class UpdateUserDto extends createZodDto(updateUserSchema) {}
