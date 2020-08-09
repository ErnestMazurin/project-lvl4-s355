module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  settings: {
    react: {
      version: 'latest',
    },
  },
  rules: {
    'react/destructuring-assignment': 0,
    'react/prop-types': 'off',
    'react/display-name': 'off',
  },
};
