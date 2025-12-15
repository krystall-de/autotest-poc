import z from 'zod';
import {
  createUserSchema,
  updateUserSchema,
  userSchema,
} from './user.schema.js';

export type User = z.infer<typeof userSchema>;

export type UserForCreate = z.infer<typeof createUserSchema>;

export type UserForUpdate = z.infer<typeof updateUserSchema>;
