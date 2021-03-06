var webpack = require('webpack')
var path = require('path');
var utils = require('./utils.js')

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entry = require('./webpack.entry.js')

var plugins = [
    // 公共js提取
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
        minChunks: 3 // 提取至少3个模块共有的部分
    }),
    // 提取公共css样式
    new ExtractTextPlugin('./css/[name].css'),
]
let dir_root = path.resolve(__dirname, '../src/view');
var pugFiles = utils.getAllFiles(dir_root, 'pug')

pugFiles = utils.getEntry(pugFiles, ['.pug', dir_root+'/'])

for (var key in pugFiles) {
    if (pugFiles.hasOwnProperty(key)) {
        let opt = {
            filename: './view/'+ key +'.html',
            template: pugFiles[key],
            hash: true,
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }
        if (entry.hasOwnProperty(key)) {
            opt['chunks'] = ['vendors', key]
            opt['inject']= 'body'
        }
        console.log(opt);
        plugins.push(new HtmlWebpackPlugin(opt))
    }
}

module.exports = plugins