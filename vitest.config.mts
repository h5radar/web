import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

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
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./tests/coverage",
      thresholds: {
        lines: 0.05,
        functions: 27.55,
        statements: 0.05,
        branches: 27.55,
        autoUpdate: false,
      },
    },
  },
});
