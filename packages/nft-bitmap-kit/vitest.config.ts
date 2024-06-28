import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["lib/*"],
    coverage: {
      reporter: ["json", "html", "text"],
      exclude: ["lib/*", "src/index.ts"],
    },
  },
});
