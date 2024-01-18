const path = require('path');

module.exports = {
  entry: './src/index.ts', // Asegúrate de cambiar esto a tu punto de entrada principal
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
      chunks: 'all', // Puedes ajustar esto según tus necesidades
    },
  },
  // ... otras configuraciones
};
