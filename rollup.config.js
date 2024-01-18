import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    name: '@hypermedialabs/uploader',
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    resolve(),
    commonjs(),
    typescript({
      include: ['src/**/*.ts', 'node_modules/tus-js-client/**/*.ts'],
    }),
    terser(),
  ],
};
