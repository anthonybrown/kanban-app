const path    = require('path');
const merge   = require('webpack-merge');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

const common = {
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	}
};
// Default configuration
if (TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devServer: {
			contentBase: PATHS.build,
			// enable history API fallback so HTML5 History API based
			// routing works. This is a good default that will come in
			// handy in more complicated setups.
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,
			// Display only errors to reduce the amount of output.
			stats: 'errors-only',
			// Parse host and port from the env so this is easy to customize.
			//
			// if you use Vagrant or Cloud9, set
			// host: process.env.HOST || '0.0.0.0',
			//
			// 0.0.0.0 is available to all network devices unlike default
			// localhost
			host: process.env.HOST,
			port: process.env.PORT || 3000
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	});
}

if (TARGET === 'build') {
	module.exports = merge(common, {});
}
