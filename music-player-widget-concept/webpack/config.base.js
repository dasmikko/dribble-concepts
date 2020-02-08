const path = require('path');
const rootPath = path.resolve(__dirname, '..');
const autoprefixer = require('autoprefixer');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: rootPath,

  entry: './src/index.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(rootPath, 'dist'),
    publicPath: '',
  },

  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: `postcss-loader`,
            options: {
              plugins: (loader) => [
                require('postcss-import'),
                require('autoprefixer')
              ]
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: 'assets' },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
  },
};