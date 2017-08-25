var entry = require('./config/webpack.entry.js')
var plugins = require('./config/webpack.plugins.js')

var webpack = require('webpack');
var path = require('path');

var webpackConfig = {
  entry,
  plugins,
  
}

module.exports = webpackConfig