
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = `https://${process.env.SUPABASE_ID}.supabase.co`
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)