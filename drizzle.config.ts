import { defineConfig } from 'drizzle-kit';
import { getDatabaseUrl } from './src/config';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: "postgresql://postgres.lqfncvigfsrmhownygra:potatoai@123@aws-0-ap-south-1.pooler.supabase.com:5432/postgres",
  },
  
});
    // url: './data/db.sqlite',
  // },
// });

