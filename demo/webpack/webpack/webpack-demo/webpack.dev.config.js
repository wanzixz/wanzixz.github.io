var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
  // 设置入口文件。
  entry: './src/js/index.js',
  output: {
    // 设置输出文件夹
    path: __dirname + "/dist", //路径
    // 设置公用文件夹路径
    //publicPath: '../',

    // 设置输出的js文件的名字规则。
    // [name] 为chunk中的名称
    // [hash] 为webpack生成的哈希值
    filename: "js/[name].js"
  },
  module: {
    rules: [{
      // 处理css文件
      //test: /\.css$/,
      //loader: "style-loader!css-loader"
      test: /\.(scss|sass|css)$/,
      // loader: "css-loader?importLoaders=1!postcss-loader!sass-loader",
      // loader执行顺序是从右到左：sass-loader -> postcss-loader -> css-loader
      //设置打包哪些文件
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 2
          }
        },
        'postcss-loader',
        'sass-loader'
      ],
      exclude: path.resolve(__dirname, '/node_modules/'),
      //include:path.resolve(__dirname,'/src/'),
    }, {
      // 处理html文件，并处理img 中 src 和 data-src 的引入路径
      test: /\.html$/,
      loader: "html-loader?attrs=img:src img:data-src",
      exclude: path.resolve(__dirname, '/node_modules/'),
      include: path.resolve(__dirname, '/src/'),
    }, {
      // 处理字体文件
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=./fonts/[name].[ext]',
      exclude: path.resolve(__dirname, '/node_modules/'),
      include: path.resolve(__dirname, '/src/'),
    }, {
      // 处理图片，并将8k以下的图片转为base64编码
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=8192&name=./img/[hash].[ext]',
      exclude: path.resolve(__dirname, '/node_modules/'),
      include: path.resolve(__dirname, '/src/'),
    }, {
      test: /\.js$/,
      // 不编译 node_modules 下的文件
      exclude: path.resolve(__dirname, '/node_modules/'),
      loader: "babel-loader",
     /*  query:{
        "presets": ["env"]
      } */
    }]
  },
  plugins: [
    // 公共js提取
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
      // minChunks: 3 // 提取至少3个模块共有的部分
    }),
    // 提取公共css样式
    new ExtractTextPlugin('./css/[name].css'),
    // 处理html文件。
    new HtmlWebpackPlugin({
      filename: './view/index.html', //生成的html存放路径，相对于path
      template: './src/view/index.html', //html模板路径
      //template: './src/view/index.pug',
      inject: 'body', //js插入的位置，true/'head'/'body'/false
      hash: true, //为静态资源生成hash值
      // chunks: ['vendors', allDirs[i] + '/' + matches[1]], //需要引入的chunk，不配置就会引入所有页面的资源
      //chunks: ['vendors', 'index'], //需要引入的chunk，不配置就会引入所有页面的资源
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    })
  ],
  // 设置开发服务器
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    host: 'localhost',
    port: 9090,
    inline: true
  }
}

module.exports = webpackConfig