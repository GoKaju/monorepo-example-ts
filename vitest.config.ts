import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    projects: ['contexts/*', 'apps/*', 'libs/*'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'text-summary'], // lcov es el formato compatible con SonarCloud
      reportsDirectory: './coverage',
      include: ['contexts/**/src/*', 'apps/*/src/*', 'libs/*/**'],
    },
  },
})
