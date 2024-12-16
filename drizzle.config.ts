import { defineConfig } from 'drizzle-kit';
import { getDatabaseUrl } from './src/config';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: getDatabaseUrl.toString(),
  },
  
});
    // url: './data/db.sqlite',
  // },
// });

