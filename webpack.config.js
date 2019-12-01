const path = require('path');

module.exports = {
  // context: path.resolve(__dirname, 'src'),
  devtool: 'inline-source-map',
  entry: './src/browser.ts',
  mode: 'development',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
      configFile: 'tsconfig.browser.json'
    }]
  },
  output: {
    filename: 'rollpass.js',
    path: path.resolve(__dirname, 'static')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
};