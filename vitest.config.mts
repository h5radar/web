import { resolve } from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
  test: {
    environment: "jsdom",
    coverage: {
      // istanbul or v8
      provider: "v8",
      reporter: ["text", "json", "html"],
      thresholds: {
        lines: 61.9,
        functions: 58.57,
        branches: 84.17,
        statements: 61.9,
        autoUpdate: false,
      },
    },
  },
});
