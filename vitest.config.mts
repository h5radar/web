import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "./src") },
      { find: "@tests", replacement: resolve(__dirname, "./tests") },
    ],
  },
  test: {
    environment: "jsdom",
    outputFile: { junit: "./output/tests/junit.xml", html: "./output/tests/index.html" },
    reporters: ["default", "junit", "html"],
    setupFiles: ["./tests/setup.ts"],
    coverage: {
      include: ["src/**"],
      exclude: ["src/ui/**"],
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./output/coverage",
      thresholds: {
        statements: 44.05,
        branches: 66.22,
        functions: 48.17,
        lines: 44.05,
        autoUpdate: false,
      },
    },
  },
});
