import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: '@hypermedialabs/uploader',
      fileName: (format) => `uploader.${format}.js`,
    },
  },
});
