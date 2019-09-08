const path = require('path')

const BannerPlugin = require('webpack').BannerPlugin
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin
const TypedocWebpackPlugin = require('typedoc-webpack-plugin')

const pkg = require('./package.json')

module.exports = (env, argv) => ({
  mode: argv.mode || 'production',
  entry: argv.mode === 'development' ? path.join(__dirname, 'example', 'index.js')
    : path.join(__dirname, 'src', 'index.js'),
  output: {
    library: 'Kokoro',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.join(__dirname, 'dist'),
    filename: argv.mode === 'development' ? 'index.js' : 'kokoro.min.js'
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
  plugins: argv.mode === 'development'
    ? [
      new HotModuleReplacementPlugin()
    ] : [
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
  devtool: argv.mode === 'development' ? 'eval-source-map' : 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: path.join(__dirname, 'example')
  }
})
