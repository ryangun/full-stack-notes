const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: {
        'main1': './src/main1.js',
        'main2': './src/main2.js'
    },
    output: {
        filename: 'js/[name].js'
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    watch: true
}