import * as path from 'path';

import * as bodyParser from 'body-parser';
import config = require('config');
import cookies from 'cookie-parser';
import express, { RequestHandler } from 'express';
import favicon from 'serve-favicon';
import toobusy from 'toobusy-js';
import type { LoggerInstance } from 'winston';

import { TestApiRoutes } from './api/endpoints';
import { AppInsights } from './modules/appinsights';
import { ErrorHandler } from './modules/error-handler';
import { FileUpload } from './modules/fileupload';
import { HealthCheck } from './modules/health';
import { Helmet } from './modules/helmet';
import { LanguageToggle } from './modules/i18n';
import { Nunjucks } from './modules/nunjucks';
import { PropertiesVolume } from './modules/properties-volume';
import { SessionStorage } from './modules/session';
import { Webpack } from './modules/webpack';
import { Routes } from './routes';

const { Logger } = require('@hmcts/nodejs-logging');

const { setupDev } = require('./development');

const env = process.env.NODE_ENV || 'development';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const developmentMode = env === 'development';
const logger: LoggerInstance = Logger.getLogger('server');
export const app = express();

app.locals.ENV = env;

app.enable('trust proxy');
new PropertiesVolume().enableFor(app);
new SessionStorage().enableFor(app);
app.use(cookies());
new AppInsights().enable();
new HealthCheck().enableFor(app);
new ErrorHandler().enableFor(app, logger);
new ErrorHandler().handleNextErrorsFor(app);
new Nunjucks().enableFor(app);
new Webpack().enableFor(app);
app.locals.developmentMode = process.env.NODE_ENV !== 'production';
app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json() as RequestHandler);
app.use(bodyParser.urlencoded({ extended: false }) as RequestHandler);
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
  next();
});
new FileUpload().enableFor(app);
new Helmet(config.get('security')).enableFor(app);
new LanguageToggle().enableFor(app);
//api for session
new TestApiRoutes().enableFor(app);
new Routes().enableFor(app);

setupDev(app, developmentMode);

const port: number = parseInt(process.env.PORT || '3100', 10);
if (app.locals.ENV === 'development') {
  const server = app.listen(port, () => {
    logger.info(`Application started: http://localhost:${port}`);
  });
  process.on('SIGINT', function () {
    server.close();
    toobusy.shutdown();
    process.exit();
  });
} else {
  app.listen(port, () => {
    logger.info(`Application started: http://localhost:${port}`);
  });
}
