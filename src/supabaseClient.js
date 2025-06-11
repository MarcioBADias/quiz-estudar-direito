import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase URL and Key are required. Make sure they are set in your .env.local file and start with VITE_',
  )
}

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }
