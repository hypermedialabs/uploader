import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: '@hypermedialabs/uploader',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      include: ['src/**/*.ts', 'node_modules/tus-js-client/**/*.ts'],
    }),
    terser(),
  ],
};
