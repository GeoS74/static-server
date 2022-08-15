// {
//     "env": {
//         "browser": true,
//         "commonjs": true,
//         "es2021": true
//     },
//     "extends": [
//         "airbnb-base",
//         "plugin:@typescript-eslint/recommended"
//     ],
//     "overrides": [
//     ],
//     "parser": "@typescript-eslint/parser",
//     "parserOptions": {
//         "ecmaVersion": "latest",
//         "sourceType": "module"
//     },
//     "plugins": [
//         "@typescript-eslint"
//     ],
//     "rules": {
//     }
// }

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
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
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['*.js', '/client/*'],
};
