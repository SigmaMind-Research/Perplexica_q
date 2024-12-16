// import { drizzle } from 'drizzle-orm/better-sqlite3';
// import Database from 'better-sqlite3';
// import * as schema from './schema';

// const sqlite = new Database('data/db.sqlite');
// const db = drizzle(sqlite, {
//   schema: schema,
// });

// export default db;
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Define the connection string for Supabase
const connectionString = "postgresql://postgres.lqfncvigfsrmhownygra:potatoai@123@aws-0-ap-south-1.pooler.supabase.com:5432/postgres";

// Initialize the PostgreSQL client
const client = postgres(connectionString, { ssl: 'require', prepare: false });

// Integrate with Drizzle ORM and provide the schema
const db = drizzle(client, {
  schema: schema,
});

// Export the database instance for use in your app
export default db;

