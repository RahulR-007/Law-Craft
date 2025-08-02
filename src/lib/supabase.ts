import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yonzyrsjzcwabxvlpvtk.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlvbnp5cnNqemN3YWJ4dmxwdnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNzM2NTgsImV4cCI6MjA2OTY0OTY1OH0.3lrHq7uJ6nxhd6L6T4ZwJ8sbA4Jv00eL-6zUh3Y51o0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
