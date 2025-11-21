import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Allow resolving imports from `src/styles` without long relative paths
        includePaths: [path.resolve(__dirname, 'src', 'styles')],
      },
    },
  },
  server: {
    // Disable the HMR overlay so terminal shows full Sass errors
    hmr: { overlay: false },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
