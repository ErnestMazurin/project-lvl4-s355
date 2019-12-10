module.exports = {
  extends: [
    require.resolve('eslint-config-airbnb'),
  ],
  plugins: ['jest', 'react', 'react-hooks'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'react/prop-types': ['off'],
  },
};
