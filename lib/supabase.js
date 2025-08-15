import { createClient } from '@supabase/supabase-js'

const supabaseId =
    typeof window !== 'undefined'
        ? import.meta.env.VITE_SUPABASE_ID // allow frontend usage
        : process.env.VITE_SUPABASE_ID; // allow vercel usage

const supabasePublicKey =
    typeof window !== 'undefined'
        ? import.meta.env.VITE_SUPABASE_PUBLIC_KEY
        : process.env.VITE_SUPABASE_PUBLIC_KEY;

export default function Supabase() {
  return createClient(
    `https://${supabaseId}.supabase.co`,
    supabasePublicKey
  );
}
