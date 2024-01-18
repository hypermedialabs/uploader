import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';

const config = {
  input: 'src/index.js',
  output: {
    dir: 'dist',
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    css({ output: 'bundle.css' }),
  ],
};

export default config;
