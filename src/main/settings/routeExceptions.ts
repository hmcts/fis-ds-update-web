import { Application, Request, Response } from 'express';

import { HTTPError } from '../HttpError';

const { Logger } = require('@hmcts/nodejs-logging');

/* It takes an express application as an argument, and then it finds all the files in the routes folder
that end in .ts or .js, and then it requires each of those files, and then it calls the default
export of each of those files, passing in the express application */

export class RouteExceptionHandler {
  static ApplicationLogger = Logger.getLogger('app');

  /* A middleware that handles the 404 Not Found error. */
  static NOTFOUND_HANDLER = (app: Application): void => {
    app.use((req, res) => {
      res.status(404);
      res.render('not-found');
    });
  };

  /* A middleware that handles the 500 Internal Server error. */
  static INTERNAL_SERVER_HANDLER = (app: Application): void => {
    // error handler
    app.use((err: HTTPError, req: Request, res: Response) => {
      const logger = RouteExceptionHandler.ApplicationLogger;
      logger.error(`${err.stack || err}`);

      // set locals, only providing error in development
      res.locals.message = err.message;
      // res.locals.error = env === 'development' ? err : {};
      res.status(err.status || 500);
      res.render('error');
    });
  };

  /**
   * It takes an express application as an argument, and then it finds all the files in the routes folder
   * that end in .ts or .js, and then it requires each of those files, and then it calls the default
   * export of each of those files, passing in the express application
   * @param {Application} app - Application - The express application instance.
   */
  enableFor(app: Application): void {
    RouteExceptionHandler.NOTFOUND_HANDLER(app);
    RouteExceptionHandler.INTERNAL_SERVER_HANDLER(app);
  }
}
