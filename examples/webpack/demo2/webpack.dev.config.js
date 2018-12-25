const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    entry: {
        'main': './src/index.js'
    },
    output: {
        filename: 'js/bundle.js'
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.(jpg|jpeg|png|gif|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 20000,
                    name: 'img/[name].[ext]'
                }
            }]
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: ['transform-runtime']
                }
            }]

        }, {
            test: /\.vue$/,
            use: 'vue-loader'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 请确保引入这个插件！
        new VueLoaderPlugin()
    ],
    watch: true
}