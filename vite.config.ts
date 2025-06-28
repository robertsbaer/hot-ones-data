import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginSitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    VitePluginSitemap({
      hostname: 'https://hotones-data.com',
      dynamicRoutes: ['/', '/data']
    })
  ],
  base: '/', // Change this to root
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
