import { z } from 'zod';

const errorResponseSchema = z.object({
  cod: z
    .union([z.string(), z.number()])
    .transform((value) => (typeof value !== 'number' ? Number(value) : value)),
  message: z.string()
});

type ErrorResponse = z.infer<typeof errorResponseSchema>;

export { errorResponseSchema, ErrorResponse };
