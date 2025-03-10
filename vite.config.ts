import path from "path";

import { defineConfig } from "vite";
export default defineConfig({
  define: { global: "window" },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});