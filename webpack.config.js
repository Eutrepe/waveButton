const webpack = require('webpack');

module.exports = {
  entry: './source/js/main.js',
  output: {
    filename: 'waveButton.min.js',
  },

  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false,
    }),
  ],
};
