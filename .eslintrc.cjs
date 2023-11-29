module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    strict: ['error', 'never'],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-namespace': 'off',
    'react-refresh/only-export-components': 'off',
    'no-console': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['firebase/*'],
            message: 'Import from "@services/firebase" instead',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['src/services/firebase/*'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
