import { z } from 'zod';

const errorResponseScema = z.object({
  cod: z
    .union([z.string(), z.number()])
    .transform((value) => (typeof value !== 'number' ? Number(value) : value)),
  message: z.string()
});

export { errorResponseScema };
