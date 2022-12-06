module.exports = {
  env: {
    commonjs: true,
    node: true,
    mocha: true,
    es6: true,
    browser: true,
    'jest/globals': true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['jest'],
  rules: {}
};
