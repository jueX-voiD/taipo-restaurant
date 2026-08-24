import { defineConfig } from "vite";
import path from "node:path";

// Builds the Express server (entry: server/node-build.ts) into
// dist/server/node-build.mjs, which `npm start` runs in production.
export default defineConfig({
  build: {
    ssr: "server/node-build.ts",
    outDir: "dist/server",
    target: "node22",
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: "node-build.mjs",
        format: "es",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
