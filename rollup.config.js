import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import merge from 'babel-merge';
import flowEntry from 'rollup-plugin-flow-entry';
import clear from 'rollup-plugin-clear';

import packageJson from './package.json';

const babelConfig = require('./babel.config');

const { dependencies } = packageJson;

const deps = dependencies && Object.keys(dependencies).join('|');
const reg = deps && new RegExp(`^(${deps})($|/)`);

const banner = `
/**
 * ${packageJson.name} v${packageJson.version}
 * ${packageJson.description}
 */
`;

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/bundle.js',
    format: 'cjs',
    banner,
  },
  plugins: [
    clear({
      targets: ['lib'],
    }),
    flowEntry(),
    babel(
      merge(babelConfig, {
        babelrc: false,
        exclude: 'node_modules/**',
        presets: [['@babel/env', { modules: false }]],
      }),
    ),
    commonjs(),
  ],
  external: id => !!reg && reg.test(id),
};
