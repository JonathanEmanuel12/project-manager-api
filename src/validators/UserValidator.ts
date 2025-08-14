import { z } from 'zod';

export const registerUserValidator = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
})


export const loginValidator = z.object({
    email: z.string(),
    password: z.string()
})