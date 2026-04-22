import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/bec-motivation/',
  build: {
    outDir: 'dist',
  },
})
