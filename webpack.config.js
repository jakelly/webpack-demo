const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    // main: './src/index.js',
    // app: './src/index2.js',
    app3: './src/index3.js'
    // print: './src/print.js'
    // mod1: './src/mod1.js',
    // mod2: './src/mod2.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    openPage: 'index3.html',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // Generates an HTML file
    new HtmlWebpackPlugin({
      title: 'Webpack',
      filename: 'index3.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};