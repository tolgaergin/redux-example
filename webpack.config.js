module.exports = {
  entry: './js/index.js',
  output: {
    path: __dirname,
    filename: './bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
};
