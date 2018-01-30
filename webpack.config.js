// webpack.config.js
var path = require('path');

module.exports = {
  entry: "./frontend/promo_grabbr.jsx",
  output: {
      path: path.resolve(__dirname, 'app', 'assets', 'javascripts'), // TODO (sunny): figure out where we want to output assets
      filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  devtool: 'source-map'
};