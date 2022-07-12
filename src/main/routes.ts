import { Application } from 'express';
import { glob } from 'glob';

export class RoutesEnabler {
  /**
   * It takes an express application as an argument, and then it finds all the files in the routes folder
   * that end in .ts or .js, and then it requires each of those files, and then it calls the default
   * export of each of those files, passing in the express application
   * @param {Application} app - Application - The express application instance.
   */
  enableFor(app: Application): void {
    glob
      .sync(__dirname + '/routes/**/*.+(ts|js)')
      .map(filename => require(filename))
      .forEach(route => route.default(app));
  }
}
