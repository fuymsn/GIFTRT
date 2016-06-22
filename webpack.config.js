/**
 * Created by jf on 15/10/27.
 */

var webpack = require('webpack');
var path = require('path');

//自动打开浏览器插件
//var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    watch: true,
    entry: [
        //自动刷新网页配置
        //"webpack-dev-server/client?http://0.0.0.0:3000",
        //"webpack/hot/only-dev-server",
        path.resolve(__dirname, './src/app.es6')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: './bundle.js'
    },
    module: {
        loaders:[
            {
                test: /\.es6?$/,
                exclude: /node_modules/,
                //loader 加入热替换
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }, {
                test: /\.less$/,
                loader: 'style!css!autoprefixer!less'
            }, {
                test: /\.css/,
                loader: 'style!css'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            }
        ]
    },
    plugins: [
        //热替换代码，但不能自动刷新网页
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: false,
        //     mangle: false
        // }),
        
        //合并文件
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js",
            minChunks: Infinity
        })
    ]
};