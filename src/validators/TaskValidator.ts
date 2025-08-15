import { z } from 'zod';
import { TaskStatus } from '../entities/Task';

export const createTaskValidator = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(TaskStatus)
})

export const updateTaskValidator = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(TaskStatus).optional()
})