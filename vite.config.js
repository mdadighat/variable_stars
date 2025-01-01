import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    outDir: 'build',
    rollupOptions: {
      external: [],
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  resolve: {
    alias: {
      'react': '/node_modules/react',
      'react-dom': '/node_modules/react-dom'
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})