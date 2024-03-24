import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/',
  plugins: [react(), viteTsconfigPaths(), svgr()],
  server: {
    open: true,
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[folder]__[local]___[hash:base64:5]',
    },
  },
});
