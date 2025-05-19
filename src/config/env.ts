import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'local'}` });

const schema = z.object({
  NODE_ENV: z.enum(['local', 'development', 'staging', 'production']),
  PORT: z.coerce.number().default(3000),
  DB_URL: z.string().url(),
});

const result = schema.safeParse(process.env);
console.log({ result });

if (!result.success) {
  console.error('❌ Invalid environment variables:', result.error.format());
  process.exit(1);
}

export const env = result.data;
