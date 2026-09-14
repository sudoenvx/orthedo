import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    babel({ presets: [reactCompilerPreset()] })
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, './src'),
      "@orthedo/ui": path.resolve(import.meta.dirname, '../../packages/ui'),
      "@orthedo/theme": path.resolve(import.meta.dirname, '../../packages/theme'),
      "@orthedo/utils": path.resolve(import.meta.dirname, '../../packages/utils'),
      "@orthedo/api-client": path.resolve(import.meta.dirname, '../../packages/api-client')
    }
  },

  optimizeDeps: {
    include: [
      "@orthedo/ui",
      "@orthedo/theme",
      "@orthedo/utils",
      "@orthedo/api-client"
    ]
  }
})
