const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = ( env, argv ) => ({
  entry: {
    'dist/bundle.js':'./src/index.js',
  },
  output: {
    filename: ('bundle.js'),
    path: path.resolve(__dirname, 'dist')
  },

  // 最適化オプションを上書き
  optimization: {
    minimizer: [
      new TerserPlugin({}),
      new OptimizeCssAssetsPlugin({})
    ]
  },

  devtool: 'inline-source-map',

  //サーバーの設定 npm run start:dev
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    // watchContentBase: true,
    compress: true,
    port: 8000,
    open: true,
  },

  module: {
    rules: [
      // pug-loaderの設定
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
              root: path.resolve(__dirname,'src'),
            }
          }
        ]
      },

      // babel-loaderの設定
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
        exclude: /node_modules/,
      },

      // css/sass-loaderの設定
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true
            }
          },
          'sass-loader'
        ]
      },

      // imgの設定
      {
        test: /\.(png|svg|jpe?g|gif)/,
        use: {
          loader:'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './img/',
            publicPath: '../img'
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['img']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.pug',
    }),
  ]
});