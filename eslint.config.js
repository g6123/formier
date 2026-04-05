import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import import_ from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import ts from 'typescript-eslint';

const simpleImportSortGroups = [
  [
    // Side effect imports.
    '^\\u0000',
  ],
  [
    // Node.js builtins prefixed with `node:`.
    '^node:',
    // Packages.
    // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
    '^@?\\w',
    // Absolute imports and other imports such as Vue-style `@/foo`.
    // Anything not matched in another group.
    '^',
    // Relative imports.
    // Anything that starts with a dot.
    '^\\.',
  ],
];

export default defineConfig(
  js.configs.recommended,
  ts.configs.recommended,
  {
    plugins: {
      import: import_,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'import/newline-after-import': 'warn',
      'import/no-duplicates': ['warn', { 'prefer-inline': true }],
      'simple-import-sort/imports': ['warn', { groups: simpleImportSortGroups }],
      'simple-import-sort/exports': 'warn',
    },
  },
  react.configs.flat['jsx-runtime'],
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    extends: ['react-hooks/recommended'],
  },
  prettier,
  {
    rules: {
      'no-empty-pattern': ['warn', { allowObjectPatternsAsParameters: true }],
      'no-useless-rename': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '(^T[A-Z]|^T$)' }],
      'prettier/prettier': 'warn',
    },
  },
);
