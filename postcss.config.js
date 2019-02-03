module.exports = {
	plugins: [
		require('autoprefixer')({
			browsers: [
				'last 4 versions',
				'iOS >= 8',
				'Chrome >= 26',
				'Android >= 4.1',
				'Firefox >= 20',
				'Safari >= 6.1',
				'Opera >= 12.1',
				'Explorer >= 10',
				'Edge >= 12',
			],
			flexbox: 'no-2009',
		}),
	]
}
