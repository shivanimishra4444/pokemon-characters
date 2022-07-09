const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(common, {
    devtool: 'source-map',
    output: {
        path: `${__dirname}/dist/`,
        publicPath: "/",
        filename: "[name].js"
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      https: true,
      port: 3000,
      compress: true,
      historyApiFallback: true,
     },
     devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.EnvironmentPlugin(['NODE_ENV'])
    ]
})
