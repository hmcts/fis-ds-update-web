import * as path from 'path';

import * as bodyParser from 'body-parser';
import config = require('config');
import cookieParser from 'cookie-parser';
import express from 'express';
import favicon from 'serve-favicon';

import { AppInsights } from './modules/appinsights';
import { Helmet } from './modules/helmet';
import { Nunjucks } from './modules/nunjucks';
import { PropertiesVolume } from './modules/properties-volume';
import { PublicRoutesEnabler } from './settings/routeEnabler';
import { RouteExceptionHandler } from './settings/routeExceptions';

const { setupDev } = require('./development');

const env = process.env.NODE_ENV || 'development';
const developmentMode = env === 'development';

export const app = express();
app.locals.ENV = env;

app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
  next();
});

/**
 * @SystemConfigurations
 */

new PropertiesVolume().enableFor(app);
new AppInsights().enable();
new Nunjucks(developmentMode).enableFor(app);
new Helmet(config.get('security')).enableFor(app);
new PublicRoutesEnabler().enableFor(app);
new RouteExceptionHandler().enableFor(app);


setupDev(app, developmentMode);
// returning "not found" page for requests with paths not resolved by the router
