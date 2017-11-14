const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HashOutput = require('webpack-plugin-hash-output');
const AssetsPlugin = require('assets-webpack-plugin');

const thisYear = (new Date()).getFullYear();
const buildDate = (new Date()).toString();

module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: [
          'json-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules|vendor/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.(css|scss)$/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?minimize!sass-loader!postcss-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /\.vue$/,
        loaders: [
          'vue-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: [
          'url-loader?limit=10000',
          {
            loader: 'img-loader',
            options: {
              // enabled: process.env.NODE_ENV === 'production',
              gifsicle: {
                interlaced: false
              },
              mozjpeg: {
                progressive: true,
                arithmetic: false
              },
              optipng: true, // disabled
              pngquant: {
                floyd: 0.5,
                speed: 2
              },
              svgo: {
                plugins: [
                  {
                    removeTitle: true
                  },
                  {
                    convertPathData: false
                  }
                ]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        COPYRIGHT: `Copyright ${thisYear} Mendix. Author: J.W. Lagendijk <jelte.lagendijk@mendix.com>. Released under the MIT license.`
      }
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise'
    }),
    new webpack.optimize.UglifyJsPlugin({
      // output: {comments: false},
      compress: {unused: true, dead_code: true, warnings: false}, // eslint-disable-line camelcase
      output: {
        comments: false
      }
    }),
    new webpack.BannerPlugin(`Copyright ${thisYear} Mendix. Author: J.W. Lagendijk <jelte.lagendijk@mendix.com>. Released under the MIT license.

Build date: ${buildDate}, [[https://travis-ci.org/mendix/mx-developer]]
Source: https://github.com/mendix/mx-developer.
Report issues to: https://github.com/mendix/mx-developer/issues.

You like looking at source code? Javascript? Typescript? Come work for Mendix! Join a world-class team that's disrupting the status quo. (And may I suggest a position at the Community Team?)

https://www.mendix.com/careers/`),
    new ExtractTextPlugin('mx-header-[contenthash].css'),
    // new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      }
    }),
    new HashOutput(),
    new AssetsPlugin({
      filename: 'mappings.map',
      path: './dist/',
      processOutput: assets => {
        let str = `############################################################################################\n`;
        str += `# Mendix assets redirect mapping\n`;
        str += `############################################################################################\n\n`;
        str += `~*\\/mx-header.js /${assets['mx-header'].js};\n`;
        str += `~*\\/mx-header.css /${assets['mx-header'].css};\n`;
        return str;
      }
    })
  ],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    filename: '[name]-[hash].js'
  },
  entry: {
    'mx-header': `./${conf.path.src('index')}`
  },
  resolve: {
    alias: {
      Resources: path.resolve(__dirname, '../resources/'),
      vue$: 'vue/dist/vue.runtime.min.js'
    }
  }
};
