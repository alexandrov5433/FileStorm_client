import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  css: {
    preprocessorOptions: {
      sass: {
        quietDeps: true,
        api: 'modern-compiler'
      }
    }
  },
  build: {
    outDir: '../FileStorm_server/src/main/resources/static',
  }
})
