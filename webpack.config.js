/*
 * Webpack configuration
 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const babelConfig = require('./babel.config');
const dotenv = require('dotenv').config({ path: __dirname + '/.env'});

module.exports = {
    context: __dirname,
    mode: 'production',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'bundle'),
        publicPath:'./bundle',
        filename: 'app.js'
    },
    stats: {
        colors: true,
        reasons: true,
        warnings: false // This should be true in future
    },
    target: 'node',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /plugins/, /vendor/, /libs/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelConfig
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': dotenv.parsed
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                exclude: /\/node_modules/,
                parallel: true,
                sourceMap: true,
                cache: true,
                terserOptions: {
                    mangle: true
                }
            }),
        ],
    }
};