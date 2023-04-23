const path = require('path');

module.exports = {
  entry: {
    index: {
      import: './src/index.ts',
    },
  },
  mode: 'production',
  target: ['node'],
  devtool: 'inline-source-map',
  output: {
    filename: 'pronounsPage.js',
    library: "pronouns",
    libraryTarget: "umd",
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    globalObject: "this",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        exclude: /tests/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
