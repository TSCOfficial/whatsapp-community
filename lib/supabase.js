import { createClient } from '@supabase/supabase-js'

export default function Supabase() {
  return createClient(
    `https://${process.env.SUPABASE_ID}.supabase.co`,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
