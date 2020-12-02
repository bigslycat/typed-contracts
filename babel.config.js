/* @flow */

const env = modules => [
  '@babel/env',
  {
    targets: {
      node: 6,
      browsers: ['last 4 version', '> 1%', 'not dead'],
    },
    modules: !!modules && 'commonjs',
  },
];

const config /* : any */ = {
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: ['@babel/flow', env()],
  env: {
    test: {
      presets: ['@babel/flow', env(true)],
    },
  },
};

module.exports = config;
