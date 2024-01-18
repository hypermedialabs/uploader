import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const config = {
  input: 'src/index.js',
  output: {
    dir: 'dist',
  },
  plugins: [resolve(), commonjs(), babel({ babelHelpers: 'bundled' })],
};

export default config;
