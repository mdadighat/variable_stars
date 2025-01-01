import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@chakra-ui/react',
        '@chakra-ui/color-mode',
        '@emotion/react',
        '@emotion/styled',
        'framer-motion'
      ]
    }
  },
  optimizeDeps: {
    include: [
      '@chakra-ui/react',
      '@chakra-ui/color-mode',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion'
    ]
  }
})