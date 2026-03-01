import { z } from 'zod';

const webEnvSchema = z.object({
  VITE_APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  VITE_API_BASE_URL: z.string().url(),

  VITE_FIREBASE_API_KEY: z.string().min(1),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  VITE_FIREBASE_APP_ID: z.string().min(1),
});

const parsed = webEnvSchema.safeParse(import.meta.env);

if (!parsed.success) {
  // Keep error readable in browser/dev console
  // eslint-disable-next-line no-console
  console.error('Invalid web environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid web environment configuration');
}

export const env = parsed.data;
