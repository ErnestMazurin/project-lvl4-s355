const path = require('path');

const SRC_ROOT = 'client';

module.exports = {
  jest: (config) => {
    config.roots = [path.resolve(__dirname, SRC_ROOT)];
    config.collectCoverageFrom = [`${SRC_ROOT}/**/*.{js,jsx,ts,tsx}`, `!${SRC_ROOT}/**/*.d.ts`];
    config.testMatch = [
      `${__dirname}/${SRC_ROOT}/src/**/__tests__/**/*.{js,jsx,ts,tsx}`,
      `${__dirname}/${SRC_ROOT}/src/**/*.{spec,test}.{js,jsx,ts,tsx}`,
    ];
    return config;
  },
  paths: (paths) => {
    paths.appIndexJs = path.resolve(__dirname, SRC_ROOT, 'index.jsx');
    paths.appSrc = path.resolve(__dirname, SRC_ROOT);
    paths.testsSetup = path.resolve(__dirname, SRC_ROOT, 'setupTests.js');
    paths.proxySetup = path.resolve(__dirname, SRC_ROOT, 'setupProxy.js');
    return paths;
  },
};
