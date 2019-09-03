const path = require('path')
const pkg = require('./package.json')
const BannerPlugin = require('webpack').BannerPlugin
const TypedocWebpackPlugin = require('typedoc-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    library: 'kokoro',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.join(__dirname, 'dist'),
    filename: 'kokoro.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new BannerPlugin(`${pkg.name} - ${pkg.description}
--------
@version ${pkg.version}
@homepage: ${pkg.homepage}
@license ${pkg.license}
@author ${pkg.author}
`),
    new TypedocWebpackPlugin({
      mode: 'file',
      name: `Kokoro API v${pkg.version}`,
      includeDeclarations: true,
      out: '../docs',
      readme: 'none'
    })
  ],
  devtool: 'source-map'
}
