import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  API_KEY: z.string().regex(/^[a-zA-Z0-9]{32}$/, 'Invalid API key provided'),
  CI: z.boolean().default(false),
  BASE_URL: z.string().url(),
  BASE_API_URL: z.string().url(),
  USER_EMAIL: z.string().email(),
  USER_PASSWORD: z.string()
});

const env = envSchema.parse(process.env);

export { env };
