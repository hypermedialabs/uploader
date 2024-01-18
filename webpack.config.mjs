import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.ts', // Asegúrate de cambiar esto a tu punto de entrada principal
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Para archivos TypeScript
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/, // Para archivos JavaScript
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // ... otras reglas
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  // ... otras configuraciones
};
