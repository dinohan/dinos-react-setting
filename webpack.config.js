/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const appIndex = path.resolve(__dirname, 'src', 'index.tsx');
const appSrc = path.resolve(__dirname, 'src');
const appDist = path.resolve(__dirname, 'dist');
const appPublic = path.resolve(__dirname, 'public');

module.exports = (webpackEnv) => ({
  entry: appIndex,
  mode: webpackEnv,
  output: {
    path: appDist,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: 'awesome-typescript-loader',
        include: appSrc,
      },
      {
        test: /\.(js|jsx)$/,
        include: appSrc,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env'],
          plugins: ['react-hot-loader/babel'],
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        loader: 'file-loader',
        exclude: [/\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        options: {
          outputPath: 'static/media',
          name: '[name].[hash:8].[ext]',
          esModule: false,
        },
      },
    ],
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },

  devServer: {
    contentBase: appPublic,
    host: '0.0.0.0',
    port: 3003,
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
      }),
    ],
  },
});
