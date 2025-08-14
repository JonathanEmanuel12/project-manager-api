import { z } from 'zod';

export const createProjectValidator = z.object({
    name: z.string(),
})

export const updateProjectValidator = z.object({
    name: z.string().optional(),
})