import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/

const env = loadEnv('', process.cwd());

export default defineConfig({
  plugins: [
    vue(),
  ],
  base: env.VITE_BASE_URL,
  build:{
    outDir: env.VITE_OUT_DIR,
    emptyOutDir: false
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
