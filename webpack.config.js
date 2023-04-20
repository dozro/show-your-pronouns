const path = require('path');

module.exports = {
  entry: {
    index: {
      import: './src/index.ts',
//      dependOn: 'PronounsPageUser',
    },
//    PronounsPageUser: './src/PronounsPageUser.ts'
  },
  mode: 'development',
//  devtool: 'inline-source-map',
  output: {
    filename: 'pronounsPage.js',
    library: "pronouns",
//    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
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
