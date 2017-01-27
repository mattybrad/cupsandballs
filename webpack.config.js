var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/entry.js',
  output: { path: __dirname, filename: 'bundle.js' },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    ]
  }
};
