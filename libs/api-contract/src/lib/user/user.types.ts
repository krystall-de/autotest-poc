import z from 'zod';
import {
  createUserSchema,
  updateUserSchema,
  userSchema,
} from './user.schema.js';

export type User = z.infer<typeof userSchema>;

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
