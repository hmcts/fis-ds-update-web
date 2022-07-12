import * as express from 'express';

/**
 * If we're in development mode, we'll use webpack-dev-middleware to serve our webpack bundle
 * @param app - express.Express - the express app
 * @param {boolean} developmentMode - boolean - This is a boolean that is passed in from the server.ts
 * file. It's used to determine if we're in development mode or not.
 */
export const setupDev = (app: express.Express, developmentMode: boolean): void => {
  if (developmentMode) {
    const webpackDev = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackconfig = require('../../webpack.config');
    const compiler = webpack(webpackconfig);
    app.use(
      webpackDev(compiler, {
        publicPath: '/',
      })
    );
  }
};

/* This is a common pattern in Node.js. It's used to export a single function from a file. */
module.exports = { setupDev };
