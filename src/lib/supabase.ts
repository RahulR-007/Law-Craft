import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug logging (remove in production)
console.log('Environment check:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlStart: supabaseUrl?.substring(0, 20) + '...',
    keyStart: supabaseAnonKey?.substring(0, 20) + '...'
})

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(`Missing Supabase environment variables. URL: ${!!supabaseUrl}, Key: ${!!supabaseAnonKey}`)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
