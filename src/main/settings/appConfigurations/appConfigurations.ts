import * as path from 'path';

import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import favicon from 'serve-favicon';

export class ExpressAppConfigurations {
  /**
   * It takes an express application as an argument, and then it finds all the files in the routes folder
   * that end in .ts or .js, and then it requires each of those files, and then it calls the default
   * export of each of those files, passing in the express application
   * @param {Application} app - Application - The express application instance.
   */
  enableFor(app: Application): void {
    /* Setting up the middleware for the express application. */
    app.use(favicon(path.join(__dirname, '../../public/assets/images/favicon.ico')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../../public')));
    app.use((req, res, next) => {
      res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
      next();
    });
  }
}
