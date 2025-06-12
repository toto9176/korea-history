import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/korea-history/',
  server: {
    port: 8080,
    host: '0.0.0.0',
    strictPort: false,
    open: true
  }
}) 