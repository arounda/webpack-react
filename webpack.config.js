const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		modules: [
			'node_modules',
			path.resolve(__dirname, 'src')
		],
		alias: {
			'@': path.join(__dirname, 'src')
		},
	},
	mode: NODE_ENV,
	watch: isDev,
	devtool: isDev && 'source-map',
	module: {
		rules: [
				{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				}
				},
				{
					test: /\.(scss|css)$/,
					exclude: /node_modules/,
					use: [
							MiniCssExtractPlugin.loader
						,
						{
							loader: 'css-loader',
							options: {
								modules: true,
								localIdentName: isDev ? (
									'[name]__[local]__[hash:base64:5]'
								) : (
									'[hash:base64:12]'
								)
							}
						},
							"postcss-loader",
							"sass-loader"
						,
					]
				},
				{
					test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					use: [{
						loader: "file-loader",
						options: {
							name: "[path][name].[ext]",
							outputPath: "./fonts",
							context: path.resolve(__dirname, "src")   
						}
					}]
				},
				{
					test: /\.svg$/,
					use: ['@svgr/webpack'],
				},
				{
					test: /\.(png|jpg|gif|webp)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: 'images/[hash].[ext]',
							}
						}
					]
				},

			]
		},
		plugins: [
			new webpack.DefinePlugin({
				'__DEV__': JSON.stringify(isDev)
			}),
			new CopyWebpackPlugin([
				{
					from: path.resolve('./src/static'),
					to: path.resolve('./dist')
				}
			]),
			new MiniCssExtractPlugin({
				filename: 'bundle.css'
			}),
	]
};