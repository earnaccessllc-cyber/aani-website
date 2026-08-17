import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', // Suppress warnings, only show errors
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      // The old @base44/vite-plugin used to provide this "@/*" -> "src/*"
      // alias implicitly. Now that it's removed, it's declared explicitly
      // here (matching jsconfig.json's "paths" mapping) so all the existing
      // "@/..." imports across the codebase keep resolving.
      '@': path.resolve(__dirname, './src'),
    },
  },
});
