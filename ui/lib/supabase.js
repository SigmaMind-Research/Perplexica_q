import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://your-supabase-url.supabase.co', // Your Supabase URL
  'your-public-anon-key' // Your Supabase Anon Key
);
