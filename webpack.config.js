const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
 

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
    {
      test: /\.(png|jpg|gif|jpeg)$/,
      use: ['file-loader']
    }
  ]
  },
  plugins: [
    new Dotenv()
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
