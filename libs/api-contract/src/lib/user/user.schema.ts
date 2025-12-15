import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  email: z.email(),
});

export const createUserSchema = userSchema.omit({ id: true });

export const updateUserSchema = userSchema;
