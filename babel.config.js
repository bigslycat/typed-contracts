/* @flow */

const env = modules => [
  '@babel/env',
  {
    targets: {
      node: 6,
      browsers: ['last 4 version', '> 1%', 'not dead'],
    },
    useBuiltIns: 'usage',
    modules: !!modules && 'commonjs',
  },
];

module.exports = {
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: ['@babel/flow', env()],
  env: {
    test: {
      presets: ['@babel/flow', env(true)],
    },
  },
};
