const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const uglifyJs = require('uglifyjs-webpack-plugin');
 

module.exports = {
  entry: ['babel-polyfill', './example/app.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.jsx?$/,
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
    { test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/
      , loader: 'url-loader'
    },
  ]
  },
  plugins: [
    new Dotenv(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new uglifyJs({
      sourceMap: true
    })
  ],
  resolve: {
    extensions: ['.jsx', '.js']
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public')
  },
  node: {
    fs: "empty"
 }
};
