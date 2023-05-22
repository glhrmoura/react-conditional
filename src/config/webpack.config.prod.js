const path = require('path');

const rootPath = path.resolve(__dirname, '../../');

module.exports = {
  mode: 'production',

  entry: './src/lib/index.ts',

  output: {
    filename: 'index.js',
    path: path.resolve(rootPath, 'dist'),
    libraryTarget: 'commonjs',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(rootPath, 'src'),
    },
  },
};