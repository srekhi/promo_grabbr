var path = require("path");
var webpack = require("webpack");

var plugins = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
   })
]; // if using any plugins for both dev and production

var devPlugins = []; // if using any plugins for development

var prodPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true
    }
  })
];

plugins = plugins.concat(
  process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins
)


module.exports = {
  context: __dirname,
  entry: "./frontend/promo_grabbr.jsx",
  output: {
    path: path.resolve(__dirname, 'promo_grabbr', 'static', 'promo_grabbr'),
    filename: "bundle.js"
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: [/\.css?$/],
        loader: 'style-loader!css-loader'  
      },
      {
        test: [/\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/],
        loader: 'file-loader?limit=10000',
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
