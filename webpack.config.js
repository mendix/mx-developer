/**
 * This is a quick (dirty) solution to get a one-file bundle
 * https://github.com/facebook/create-react-app/issues/3365
 *
 * The reason is that
 * - We dont' want to eject, so we still can use create-react-app features
 * - We need one-file bundle so that we can easily link it in the html file of our Mendix apps.
 *
 * Note that the output will be in `dist` folder. Don't know why 🤷‍.
 */

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebPackPlugin({
    template: './public/index-demo.html',
    filename: './index.html',
});

const isProd = process.env.REACT_APP_MX_ENV === 'prod';

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: {
        'bundle.js': glob
            .sync('build/static/?(js|css)/main.*.?(js|css)')
            .map(f => path.resolve(__dirname, f)),
    },
    output: {
        filename: 'bundle.min.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    {
                        loader: 'img-loader',
                        options: {
                            gifsicle: {
                                interlaced: false,
                            },
                            mozjpeg: {
                                progressive: true,
                                arithmetic: false,
                            },
                            optipng: true, // disabled
                            pngquant: {
                                floyd: 0.5,
                                speed: 2,
                            },
                            svgo: {
                                plugins: [
                                    {
                                        removeTitle: true,
                                    },
                                    {
                                        convertPathData: false,
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        HtmlWebpackPluginConfig,
        new UglifyJsPlugin(),
    ],
};
