/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    include: ["**/*.unit.test.tsx", "**/*.integration.test.tsx"],
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./tests/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./tests/coverage",
    },
  },
});
