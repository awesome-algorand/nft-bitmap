import { glob } from 'glob'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import * as packageJson from './package.json'
import {extname, relative, resolve} from "node:path";
import {fileURLToPath} from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({
    exclude: ["src"],
    beforeWriteFile: (filePath, content) => {
      return {
        filePath: filePath.replace('lib/', ''),
        content: content.replace(/from "\.\/(.*?\.d\.ts)"/g, 'from "./$1"')
      }
    }
  })],
  resolve: {
    alias: {
      '@': resolve(__dirname, './lib'),
    },
  },
  build: {
    minify: false,
    copyPublicDir: false,
    lib: {
      entry: resolve('lib', 'main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react/jsx-runtime', 'nft-bitmap-kit/colors', 'zustand/middleware', ...Object.keys(packageJson.peerDependencies)],
      input: Object.fromEntries(
          // https://rollupjs.org/configuration-options/#input
          glob.sync('lib/**/*.{ts,tsx}', {
            ignore: ["lib/**/*.d.ts"],
          }).map(file => [
            // 1. The name of the entry point
            // lib/nested/foo.js becomes nested/foo
            relative(
                'lib',
                file.slice(0, file.length - extname(file).length)
            ),
            // 2. The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
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
