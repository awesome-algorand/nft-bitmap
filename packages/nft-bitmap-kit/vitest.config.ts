import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["lib/*"],
    coverage: {
      exclude: ["lib/*", "src/index.ts"],
    },
  },
});
