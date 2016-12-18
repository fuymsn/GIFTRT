const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry:{
    app: [path.join(__dirname, '/src/app/app.js')],
    vendor: ['react', 'react-dom', 'redux', 'redux-thunk', 'react-redux', 'react-router', 'object-assign', "deep-assign", 'isomorphic-fetch', 'react-tap-event-plugin']
  } ,
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js', // Name of output file
    publicPath: 'http://s.wuled.com/mobile/build/' //线上环境html cdn
  },
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // suppresses warnings, usually from module minification
        warnings: false,
      },
    }),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),

    new HtmlWebpackPlugin({
      title: '第一坊',
      template: 'src/template/index.html'
    }),
    // Transfer Files, 将src/www 下的images 拷贝到 build
    new TransferWebpackPlugin([
      {from: 'images', to: 'images'},
    ], path.resolve(__dirname, 'src/www')),

    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ],
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.js$/, // All .js files
        loader: 'babel-loader', // react-hot is like browser sync and babel loads jsx and es6-7
        //query: { cacheDirectory: './tmp/' },
        exclude: [nodeModulesPath],
      },
      { 
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: 'url?limit=12000!img?progressive=true' 
      },
      // {
      //   test: /\.html$/,
      //   loader: 'string-replace',
      //   query: {
      //     multiple: [
      //       { search: '$app.js', replace: 'abc' }
      //     ]
      //   }
      // }
    ],
  },
};

module.exports = config;