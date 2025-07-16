import { createClient } from '@supabase/supabase-js'

const supabaseId = import.meta.env.VITE_SUPABASE_ID;
const supabasePublicKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

export default function Supabase() {
  return createClient(
    `https://${supabaseId}.supabase.co`,
    supabasePublicKey
  );
}
