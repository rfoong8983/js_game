const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  // plugins: [
  //   new BrowserSyncPlugin({
  //     host: 'localhost',
  //     port: 3000,
  //     server: { baseDir: ['dist'] },
  //     files: ['./dist/*'],
  //     notify: false
  //   }),
  //   new HtmlWebpackPlugin({
  //     filename: 'index.html',
  //     template: 'src/index.html'
  //   })
  // ],
  watch: true,
}
