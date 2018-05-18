import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    devtool: 'source-map',
    entry: {
        main: path.resolve(__dirname, 'src/index'),
        vendor: path.resolve(__dirname, 'src/vendor')
    },
    watch: true,
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        new ExtractTextPlugin('[name].[contenthash].css'),
        new WebpackMd5Hash(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true
        })
    ],
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
            {
                test: /\.css$/, use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    }

}
