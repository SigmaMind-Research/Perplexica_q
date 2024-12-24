import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}



// import { createBrowserClient } from "@supabase/ssr";

// // This function initializes and returns the Supabase client
// export function createClient() {
//   if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
//     throw new Error("Supabase environment variables are not set!");
//   }

//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//   );
// }


// // utils/supabase/client.ts
// import { createClient } from '@supabase/supabase-js';

// // Replace with your Supabase URL and anon key
// const supabaseUrl = 'https://piziynjnmherziagcrlu.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeml5bmpubWhlcnppYWdjcmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2ODA0NjEsImV4cCI6MjA0NzI1NjQ2MX0.UIXq-jibMCaZLunlRn3euhDHUdOiYxuac7OsW5EyGgc';

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export default supabase;
