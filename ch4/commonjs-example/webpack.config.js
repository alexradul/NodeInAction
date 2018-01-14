const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    output: {path: __dirname, filename: 'target/main.js'},
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['env', 'minify']
                }
            }
        ]
    }
};