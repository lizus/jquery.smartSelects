const path = require('path');
const Etp = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const etpLess = new Etp('../css/jquery.smartSelect.css');

module.exports = {
  mode:'production',
  entry: {
    'jquery.smartSelect': './src/jquery.smartSelect.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'dist/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude:/node_modules/,
        use:{
          loader:'babel-loader',
          options:{
            plugins: ['ramda'],
            presets:['@babel/preset-env']
          }
        }
      },
      {
        test:/\.less$/,
        use:etpLess.extract({
          fallback:'style-loader',
          use:['css-loader','postcss-loader','less-loader']
        })
      }
    ]
  },
  plugins: [
    etpLess
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,//缓冲
        parallel: true, //并发打包,一次打包多个
        sourceMap:true,//源码调试
        uglifyOptions:{
          ie8:true
        }
      }),
      new OptimizeCSSAssetsPlugin()//优化css为压缩格式
    ]
  },
  watchOptions: {
    poll:1000,//监测修改的时间(ms)
    aggregateTimeout:500, //防止重复按键，500毫米内算按键一次
    ignored:/node_modules/,//不监测
  }
};
