const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
	devtool: 'source-map',
	output: {
		path: `${__dirname}/dist/`,
		publicPath: '/pokemon/',
		filename: '[name].[chunkhash].js',
		chunkFilename: '[id].[chunkhash].js'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	]
})
