import config = require('config');
import express from 'express';
//import { glob } from 'glob';

import { AppInsights } from './modules/appinsights';
import { Helmet } from './modules/helmet';
import { Nunjucks } from './modules/nunjucks';
import { PropertiesVolume } from './modules/properties-volume';
import { ExpressAppConfigurations } from './settings/appConfigurations/appConfigurations';
import { SessionSystemConfigurations } from './settings/redis/redis';
import { PublicRoutesEnabler } from './settings/routeEnabler/routeEnabler';
import { RouteExceptionHandler } from './settings/routeExceptions/routesExceptions';

const { setupDev } = require('./development');

const env = process.env.NODE_ENV || 'development';
const developmentMode = env === 'development';

export const app = express();
app.locals.ENV = env;

/* 
* @SystemConfigurations
Enabling the ExpressAppConfigurations, PublicRoutesEnabler, PropertiesVolume, AppInsights, Nunjucks,
Helmet, and RouteExceptionHandler. */
new ExpressAppConfigurations().enableFor(app);

/* Enabling the session for the app.
   This is a session registry and makes session data available
*/
new SessionSystemConfigurations.AppSessionConfigurator().enableFor(app);
new PublicRoutesEnabler().enableFor(app);
new PropertiesVolume().enableFor(app);
new AppInsights().enable();
new Nunjucks(developmentMode).enableFor(app);
new Helmet(config.get('security')).enableFor(app);
new RouteExceptionHandler().enableFor(app);

setupDev(app, developmentMode);
// returning "not found" page for requests with paths not resolved by the router
