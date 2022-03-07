import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ToDo: Check this for refresh token and persist session:
// https://supabase.com/docs/reference/javascript/initializing#with-additional-parameters

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  autoRefreshToken: true,
});
