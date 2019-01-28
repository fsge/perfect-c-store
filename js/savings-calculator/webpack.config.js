'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  cache: false,
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.min.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'production'`
    })
  ]
};
