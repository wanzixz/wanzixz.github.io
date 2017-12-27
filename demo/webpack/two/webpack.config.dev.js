var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

  //开启sourceMap便于调试
  //devtool: 'eval-source-map',

  //入口文件，
  entry: './src/index.js',

  output: {
    // 输出文件到当前目录下的 dist文件夹内
    path: path.resolve(__dirname, 'dist/'),

    publicPath: '/', //指定资源文件引用的目录

    filename: 'assets/js/bundle.js', // 指定打包为一个文件bundle.js

    // filename: '[name].js' // 可以打包为多个文件

  },
  module: { // 使用loader模块
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options:{
          presets:['react','env'],
          plugins: ["transform-object-rest-spread"]
        }
      }],
      exclude:[path.resolve(__dirname,'node_modules')]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },{
      test: /\.(png|svg|jpg|gif|jpeg)$/,
      use: [{
        loader: 'url-loader',
        options:{
          limit:20000,
          name:"assets/img/[name]_[hash:8].[ext]"
        }
      }]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [{
        loader: 'file-loader',
        options:{
          name:"assets/fonts/[name]_[hash:8].[ext]"
        }
      }]
    }]
  },
  devServer: {
    contentBase: "./src/",   // 本地服务器所加载的页面所在的目录
    hot: true,              // 配置HMR之后可以选择开启
    historyApiFallback: true, // 不跳转
    publicPath: '/',
    inline: true, // 实时刷新 
    open: true, //自动打开浏览器
    port: 8080 //监听端口
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html', // 模版文件
      inject: true,
      hash: false,
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      } 
    }),
    new webpack.HotModuleReplacementPlugin(), // 热加载插件
    new CleanWebpackPlugin(['dist'])
  ]
}