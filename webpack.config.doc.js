const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devConfig = require('./webpack.config.dev');
const baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, devConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/chunks/[name].[hash].js',
    publicPath: 'http://cdn.yyzcl.cn/algae-ui'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpeg|jpg|gif|ico)$/,
        loader: 'file-loader',
        options: {
          limit: 8192,
          outputPath: './static/assets/images',
          name: '[name].[hash].[ext]'
          // publicPath: "./static/assets/images"
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: false,
      cacheGroups: {
        vendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'algae-ui',
      template: './site/index.html',
      filename: 'index.html',
      favicon: './site/img/favicon.ico',
      hash: true, //防止缓存
      minify: {
        removeComments: true, //删除Html注释
        collapseWhitespace: true, //去除空格
        removeAttributeQuotes: true //去除属性引号
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/index.[hash].css',
      chunkFilename: 'static/chunks/[id].css'
    })
  ]
});
