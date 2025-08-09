import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // this means: if request starts with /solr, proxy it to localhost:8983
      '/solr': {
        target: 'http://localhost:8983',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/solr/, '/solr'),
      }
    }
  }
})
