const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './main.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    library: 'defrost'
  },
  plugins: [
    new Dotenv({
      defaults: true
    })
  ]
};