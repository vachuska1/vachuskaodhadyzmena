const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const PrettierPlugin = require("prettier-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        main: './src/components/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'string-replace-loader',
                options: {
                    search: './src/API/',
                    replace: 'http://localhost:8000/VachuskaOdhady/vachuskaodhady/src/API/',
                    flags: 'g'
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                exclude: /\.module\.less$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            strictMath: true,
                            noIeCompat: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: "file-loader",
                options: {
                    name: '[path][name].[ext]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader"
            }
        ]
    },
    // devServer: {
    //     contentBase: path.resolve(__dirname, '/build'),
    //     hot: true,
    //     host: '0.0.0.0',
    //     port: 3000,
    //     open: true
    //   },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin(),
            new TerserJSPlugin(),
        ],
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new PrettierPlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'src/images', to: 'src/images' },
            ],
        }),
        new HtmlWebpackPlugin(
            {
                'template': './src/index.html',
                'minify': {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                },
                'hash': true,
            }
        ),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3008,
            server: { baseDir: ['./build'] }
        }),
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.components', '.js', '.json' ],
    },
};