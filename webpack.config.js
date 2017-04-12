/**
 * Webpack v2
 */

const webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: './src/index.js',
        vendor: ['babel-polyfill']
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]
            }
        ]
    },
    devServer: {
        contentBase: `${__dirname}/dist`,
        compress: true,
        port: 3000
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
};