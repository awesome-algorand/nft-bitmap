import { glob } from 'glob'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import * as packageJson from './package.json'
import {extname, relative, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const excludes = ["**/*.spec.tsx","**/*.stories.tsx", "**/__fixtures__/**"]
const esmExternals = [
 'react/jsx-runtime',
  '@nft-bitmap/kit/colors',
  '@nft-bitmap/kit/transactions',
  '@nft-bitmap/kit/client',
  'zustand/middleware'
]
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({
    exclude: excludes,
    beforeWriteFile: (filePath, content) => {
      return {
        filePath: filePath.replace('src/', ''),
        content: content.replace(/from "\.\/(.*?\.d\.ts)"/g, 'from "./$1"')
      }
    }
  })],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test.setup.ts',
    coverage: {
      reporter: ["text", ['json', { 'file': 'coverage.json' }], "html"],
      include: ["src/*"],
      exclude: ["**/index.ts", ...excludes]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    minify: false,
    copyPublicDir: false,
    outDir: 'lib',
    lib: {
      entry: resolve('src', 'index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
          ...esmExternals,
        ...Object.keys(packageJson.peerDependencies)],
      input: Object.fromEntries(
          glob.sync('src/**/*.{ts,tsx}', {
            ignore: ["src/**/*.d.ts",...excludes],
          }).map(file => [
            relative(
                'src',
                file.slice(0, file.length - extname(file).length)
            ),
            fileURLToPath(new URL(file, import.meta.url))
          ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      }
    },
  },
})
