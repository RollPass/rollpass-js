const path = require('path');

module.exports = {
  entry: './browser.ts',
  mode: 'production',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.browser.json')
        },
        loader: 'ts-loader'
      }],
      exclude: /node_modules/,
    }]
  },
  output: {
    filename: 'rollpass.min.js',
    path: path.resolve(__dirname, 'static')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
};