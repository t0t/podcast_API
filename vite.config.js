import { defineConfig } from 'vite'

export default defineConfig({
  base: '/podcast_API/',
  build: {
    outDir: 'dist'
  },
  server: {
    cors: true
  }
})
