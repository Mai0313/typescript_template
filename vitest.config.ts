import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.config.{js,ts}",
        "**/*.d.ts",
        "**/types/**",
        "**/__tests__/**",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    include: ["tests/**/*.test.ts", "src/**/*.test.ts"],
    exclude: ["node_modules", "dist", ".github"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});

