const path = require('path');
module.exports = {
  entry: './static/browser.ts',
  mode: 'production',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        options: {
          configFile: path.resolve(__dirname, '/static/tsconfig.browser.json')
        },
        loader: 'ts-loader'
      }],
      exclude: /node_modules/,
    }]
  },
  output: {
    filename: 'rollpass.min.js',
    path: path.resolve(__dirname, '/static/dist/')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
};
