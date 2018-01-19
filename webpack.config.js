var path = require('path');

const webpack = require('webpack');

module.exports = {
	entry: './src/clientApp.js',
	output: {
		filename: 'boundle.js',
		path: path.resolve(__dirname, 'public')
	},
	watch: true,
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node-modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'env', 'stage-2']
				}
			}
		]
	}
}