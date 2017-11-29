const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');

let config = {
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.scss',
      '.css',
      '.jpeg',
      '.jpg',
      '.gif',
      '.png'
    ],
    alias: {
      images: path.resolve(__dirname, 'app/assets/images')
    }
  },
  module: {
    rules: [
      {
        test: /index.html$/,
        exclude: /dist/,
        use: {
          loader: 'file-loader',
          options: {
            name: '/dist/index.html'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: ['css-hot-loader'].concat(
          ExtractTextWebpackPlugin.extract({
            use: ['css-loader', 'sass-loader', 'postcss-loader'],
            fallback: 'style-loader'
          })
        )
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?context=src/assets/images/&name=images/[path][name].[ext]',
          {
            // images loader
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 4
              },
              pngquant: {
                quality: '75-90',
                speed: 3
              }
            }
          }
        ],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('styles.css'),
    new FileManagerPlugin({
      onEnd: {
        copy: {
          source: path.resolve(__dirname, 'app/index.html'),
          destination: path.resolve(__dirname, 'dist')
        }
      }
    })
    // new CopyPlugin([
    //   {
    //     from: path.resolve(__dirname, 'app/index.html'),
    //     to: '/dist',
    //     force: true
    //   }
    // ])
    // new DashboardPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    historyApiFallback: true,
    inline: true,
    open: false
  },
  devtool: 'eval-source-map'
};

module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeCssAssets()
  );
}
