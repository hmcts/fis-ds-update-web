import config = require('config');
import express from 'express';

import { setupDev } from './development';
import { AppInsights } from './modules/appinsights';
import { Helmet } from './modules/helmet';
import { Nunjucks } from './modules/nunjucks';
import { PropertiesVolume } from './modules/properties-volume';
import { RoutesEnabler } from './routes';
import { ExpressAppConfigurations } from './settings/appConfigurations/appConfigurations';
//import { SessionStorage } from './settings/redis/redis';
import { RouteExceptionHandler } from './settings/routeExceptions/routesExceptions';
/* Checking if the environment is development or not. */
const env = process.env.NODE_ENV || 'development';
const developmentMode = env === 'development';

export const app = express();
/* Setting the environment variable for the app. */
app.locals.ENV = env;

/* 
* @SystemConfigurations
Enabling the SessionStorage, ExpressAppConfigurations, PublicRoutesEnabler, PropertiesVolume, AppInsights, Nunjucks,
Helmet, and RouteExceptionHandler. */
new ExpressAppConfigurations().enableFor(app);

/* Enabling the session for the app.
   This is a session registry and makes session data available
*/
//new SessionStorage().enableFor(app);
new PropertiesVolume().enableFor(app);
new AppInsights().enable();
new Nunjucks(developmentMode).enableFor(app);
new Helmet(config.get('security')).enableFor(app);
new RoutesEnabler().enableFor(app);
new RouteExceptionHandler().enableFor(app);

setupDev(app, developmentMode);
// returning "not found" page for requests with paths not resolved by the router
