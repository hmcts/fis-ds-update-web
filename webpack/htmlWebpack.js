const path = require('path');

/**
 * const HtmlWebpackPlugin = require('html-webpack-plugin');


const cssPath = path.resolve(__dirname, '../src/main/public/main-dev.css');
const jsPath = path.resolve(__dirname, '../src/main/public/main-dev.js');

const cssWebPackPlugin = new HtmlWebpackPlugin({
  template: cssPath,
  publicPath: '/',
  filename: cssPath.replace('-template', ''),
  inject: false,
});

const jsWebPackPlugin = new HtmlWebpackPlugin({
  template: jsPath,
  publicPath: '/',
  filename: jsPath.replace('-template', ''),
  inject: false,
});

module.exports = {
  plugins: [cssWebPackPlugin, jsWebPackPlugin],
};
 * 
 */


module.exports = {
  plugins: [],
};