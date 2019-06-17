const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['stage-0'],
					}
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	]
};

module.exports = (env, options) => {
	const production = options.mode === 'production';
	conf.devtool = production
		? false
		: 'eval-sourcemap';
	return conf;
}
