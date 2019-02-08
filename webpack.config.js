const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const conf = {
	context: path.resolve(__dirname,'./src/js'),
	entry: {
		index: './index.js',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
		publicPath: '/dist/',
	},
	devServer: {
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				use: 'babel-loader',
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['stage-0'],
					}
				}
			},
			{
				test: /\.s?css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'sass-loader']
				})
			},
		]
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
	]
};

module.exports = (env, options) => {
	const production = options.mode === 'production';
	conf.devtool = production
		? false
		: 'eval-sourcemap';
	return conf;
}
