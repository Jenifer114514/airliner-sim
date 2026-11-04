import { defineConfig } from 'vite';

// base: './' → 成果物を任意の静的ホストにそのまま置ける
// outDir: 'web' → Arena スナップショット保存対象（dist/ は保存除外のため使わない）
export default defineConfig({
  base: './',
  build: {
    outDir: 'web',
    target: 'es2020',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1200
  },
  server: {
    host: true,
    port: 5173
  }
});
