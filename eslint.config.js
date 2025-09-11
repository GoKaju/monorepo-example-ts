// import js from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

// import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
// import domainEventsPlugin from './scripts/eslint-rules/domain-event-name.js'

export default defineConfig([
  // {
  //   files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  //   plugins: { js, domainEventsPlugin },
  //   extends: [js.configs.recommended],
  //   rules: {
  //     'domainEventsPlugin/domain-event-name': 'error',
  //     'no-console': 'warn',
  //     'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  //     'prettier/prettier': 'error',
  //   },
  // },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    ignores: [
      'coverage',
      '**/public',
      '**/dist',
      '**/cdk.out',
      'pnpm-lock.yaml',
      'pnpm-workspace.yaml',
    ],
  },
  tseslint.configs.recommended,
  // pluginReact.configs.flat.recommended,
  eslintPluginPrettierRecommended,
])
