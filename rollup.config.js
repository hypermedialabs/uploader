import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const config = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel({ babelHelpers: 'bundled' }),
  ],
};

export default config;
