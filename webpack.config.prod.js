import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    devtool: 'source-map',
    entry: [
        path.resolve(__dirname, 'src/index')
    ],
    watch: true,
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes:true,
                useShortDoctype:true,
                removeEmptyAttributes:true,
                keepClosingSlash:true,
                minifyJS:true,
                minifyCSS:true,
                minifyURLs:true
            },
            inject: true
        })
    ],
    module: {
        loaders: [
            {test: /\.css$/, exclude: /node_modules/, loaders: ['babel-loader']},
            {test: /\.css$/, loaders: ['style-loader', 'css-loader']}
        ]
    }

}
