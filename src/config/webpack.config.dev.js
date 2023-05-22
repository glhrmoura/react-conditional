const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.resolve(__dirname, '../../');

module.exports = {
  mode: 'development',

  entry: './src/dev/index.tsx',

  devServer: {
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(rootPath, 'src'),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootPath, 'src', 'dev', 'index.html'),
    }),
  ],
};