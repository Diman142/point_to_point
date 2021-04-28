const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev


const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserPlugin()
    ]
  }

  return config
}

module.exports = {

  entry: {
    main: ['@babel/polyfill', './src/js/index.js'],
  },

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },

  optimization: optimization(),


  resolve: {
    extensions: ['.js', '.json'],
    alias: {

    }
  },

  devServer: {
    port: 4200,
    open: true,

  },

  plugins: [
    new HTMLWebpackPlugin({
      title: 'forms',
      template: './src/index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),

    new CleanWebpackPlugin(),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),




  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {

          },
        }, 'css-loader', {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "autoprefixer",
                ],
              ],
            },
          },
        }]
      },

      {
        test: /\.s[ac]ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {

          },
        }, {
          loader: 'css-loader',
          options: {

          }
        }, {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "autoprefixer",
                ],
              ],
            },
          },
        }, 'sass-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      }
    ]
  },


}
