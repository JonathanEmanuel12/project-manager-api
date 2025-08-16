import { z } from 'zod';

export const createProjectValidator = z.object({
    name: z.string(),
})

export const updateProjectValidator = z.object({
    name: z.string().optional(),
})

export const paginateValidator = z.object({
    page: z.string()
        .optional()
        .refine(
            (page) => page === undefined || (Number.isInteger(Number(page)) && Number(page) > 0),
            { message: 'Invalid input: page must be int and greater than zero' }
        )
        .transform(page => (page !== undefined) ? Number(page) : undefined),
    perPage: z.string()
        .optional()
        .refine(
            (perPage) => perPage === undefined || (Number.isInteger(Number(perPage)) && Number(perPage) > 0),
            { message: 'Invalid input: page must be int and greater than zero' }
        )
        .transform(perPage => (perPage !== undefined) ? Number(perPage) : undefined)

})