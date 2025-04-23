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
    outputFile: { junit: "./tests/results/junit.xml", html: "./tests/results/index.html" },
    reporters: ["default", "junit", "html"],
    coverage: {
      provider: "v8", // istanbul or v8
      reporter: ["text", "json", "html"],
      reportsDirectory: './tests/coverage',
      thresholds: {
        lines: 0.07,
        functions: 29.6,
        statements: 0.07,
        branches: 29.6,
        autoUpdate: false,
      },
    },
  },
});
