import toobusy from 'toobusy-js';

import { app } from './app';

const { Logger } = require('@hmcts/nodejs-logging');

const logger = Logger.getLogger('server');

// TODO: set the right port for your application
const port: number = parseInt(process.env.PORT || '3100', 10);

const server = app.listen(port, () => {
  logger.info(`Application started: http://localhost:${port}`);
});

process.on('SIGINT', function () {
  server.close();
  toobusy.shutdown();
  process.exit();
});
