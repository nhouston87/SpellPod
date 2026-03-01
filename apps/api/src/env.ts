import { z } from 'zod';

const apiEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3001),
  CORS_ORIGIN: z.string().min(1),

  FIREBASE_PROJECT_ID: z.string().min(1),
  FIREBASE_CLIENT_EMAIL: z.string().min(1),
  FIREBASE_PRIVATE_KEY: z.string().min(1),

  SCRYFALL_BASE_URL: z.string().url().default('https://api.scryfall.com'),

  AI_PROVIDER: z.string().optional(),
  AI_API_KEY: z.string().optional(),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(120),
  LOG_RETENTION_DAYS: z.coerce.number().int().positive().default(60),
});

const parsed = apiEnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid API environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid API environment configuration');
}

export const env = parsed.data;
