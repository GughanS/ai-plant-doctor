import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Needed for Docker
    port: 8001,
    watch: {
      usePolling: true // Needed for Windows/Docker file syncing
    }
  }
})