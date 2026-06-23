import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Make design tokens + mixins available in every *.module.scss
        // without an explicit @use in each file.
        additionalData: `@use "@/styles/_tokens.scss" as *;\n`,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
