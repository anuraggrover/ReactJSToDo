/**
 * Created by anurag on 14/06/16.
 */

module.exports = {
  entry: './src/index.js',
  output: { path: __dirname + '/dist', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: 'node_modules',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};