import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load VITE_* env vars so we can use VITE_GSHEET_ENDPOINT in the proxy target
  const env = loadEnv(mode, process.cwd(), '');
  const gsheetEndpoint = env.VITE_GSHEET_ENDPOINT || '';

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      // Proxy /api/gsheet to your Apps Script exec URL during local dev to avoid CORS
      proxy: gsheetEndpoint
        ? {
            '/api/gsheet': {
              target: gsheetEndpoint,
              changeOrigin: true,
              secure: true,
              rewrite: (path) => path.replace(/^\/api\/gsheet/, ''),
            },
          }
        : undefined,
    },
  };
});
