import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // "jsdom"
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/db-mongo/**', '**/bin/**'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
