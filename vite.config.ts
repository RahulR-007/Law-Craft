import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/Law-Craft/' : '/',
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(
      process.env.VITE_SUPABASE_URL || 'https://snbwdyhegzjprtcxbnvn.supabase.co'
    ),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(
      process.env.VITE_SUPABASE_ANON_KEY ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuYndkeWhlZ3pqcHJ0Y3hibnZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDEwOTcsImV4cCI6MjA4ODgxNzA5N30.yzhWSsdc-bhDjqRu7_A3qDgw2tkI89vShlb-labTtzs'
    ),
    // Legacy envs kept for compatibility, but frontend should prefer backend APIs.
    'import.meta.env.VITE_OLLAMA_URL': JSON.stringify(process.env.VITE_OLLAMA_URL || 'http://127.0.0.1:11434'),
    'import.meta.env.VITE_OLLAMA_MODEL': JSON.stringify(process.env.VITE_OLLAMA_MODEL || 'llama3.1:8b'),
  },
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
          'animation-vendor': ['framer-motion'],
          'icons-vendor': ['react-icons'],
          'supabase-vendor': ['@supabase/supabase-js'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase limit to 1000kb
  },
})
