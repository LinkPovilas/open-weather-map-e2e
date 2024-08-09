import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  BASE_URL: z.string().url(),
  BASE_API_URL: z.string().url(),
  API_KEY: z.string().regex(/^[a-zA-Z0-9]{32}$/, 'Invalid API key provided'),
  CI: z.boolean().default(false)
});

const env = envSchema.parse(process.env);

export default env;
