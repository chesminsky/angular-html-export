const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

function customizeWebpackConfig(config, _) {

	addHTMLPluginForExports(config);

	return config;
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
