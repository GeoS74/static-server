module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "airbnb-typescript/base"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'no-console': 1,
    'linebreak-style': 1,
    'no-template-curly-in-string': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['*.js', '/repo/*'],
};
