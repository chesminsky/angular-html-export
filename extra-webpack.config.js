const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const url = require('postcss-url');
const urlPlugin = url([{ filter: '**/assets/*.png', url: 'inline' }]);


function customizeWebpackConfig(config, _) {

	addHTMLPluginForExports(config);
	addPostCSSUrlPlugin(config);

	return config;
}

function addPostCSSUrlPlugin(config) {
	for (const rule of config.module.rules) {
		const loader = Array.isArray(rule.use) && rule.use.find(x => x.loader && x.loader.includes('postcss-loader'));
		if (loader) {
			loader.options.plugins = [urlPlugin];
		}
	}
}


function addHTMLPluginForExports(config) {

	config.plugins.push(
		new HtmlWebpackPlugin({
			filename: 'export.html',
			template: './export-template.ejs',
			inlineSource: '.(js|css)$',
			chunks: ['styles', 'runtime', 'polyfills', 'main'],
			chunksSortMode: 'manual'
		})
	);

	config.plugins.push(new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin));
}

module.exports = customizeWebpackConfig;
