import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      reporter:  ['lcov', 'html'],
      exclude: [
          "vitest.workspace.ts",
          "docs/*",
          "packages/nft-bitmap-kit/lib/*",
          "packages/nft-bitmap-kit/src/index.ts",
          "packages/nft-bitmap-kit/coverage/*",
          "packages/nft-bitmap-react/.storybook",
          "packages/nft-bitmap-react/stories/*",
          "packages/nft-bitmap-ui/*"
      ],
    },
  },
});
