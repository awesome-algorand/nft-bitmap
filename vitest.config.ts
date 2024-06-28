import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: ['html'],
    coverage: {
      reporter:  ['json', 'html', 'lcov', 'text'],
      include:[
            "packages/nft-bitmap-kit/src/*",
            "packages/nft-bitmap-react/src/*",
      ],
      exclude: [
          "**/*.stories.tsx",
          "**/__fixtures__/**",
          "**/index.ts",
      ],
    },
  },
});
