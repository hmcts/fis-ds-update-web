import config from 'config';
import ConnectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import { Application } from 'express';
import session from 'express-session';
import * as redis from 'redis';
import FileStoreFactory from 'session-file-store';

// eslint-disable-next-line import/no-unresolved
import { SessionConfigurableProperties, SessionCookieExpiryMaxAge } from './type';

/* The below code is creating a new class named AppSessionConfigurator. This class has a method named
enableFor which takes an argument of type Application. This method is then parsing the cookie from
the request and creating a new instance of the StoreConfigurator class. The method is then using the
session middleware and passing in the configuration options. */
const RedisStore = ConnectRedis(session);
const FileStore = FileStoreFactory(session);

const SessionProperties: SessionConfigurableProperties = {
  PORT: 6380,
  TLS: true,
  CONNECTION_TIMEOUT: 15000,
};

/* Creating a new class named StoreConfigurator. This class has a method named configuration
which takes an argument of type Application. This method is then parsing the cookie from the request
and creating a new instance of the StoreConfigurator class. The method is then using the session
middleware and passing in the configuration options. */
namespace SessionStoreConfigurations {
  /* The StoreConfigurator class is a class that has a configuration method that takes an Application
 object as a parameter and returns void. */
  export class StoreConfigurator {
    /**
     * If the redis host is set in the configuration, then create a redis client and return a redis
     * store, otherwise return a file store
     * @param {Application} app - Application - The express application instance
     * @returns A new instance of the RedisStore class.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public configuration(app: Application): session.Store {
      const redisHost = config.get('session.redis.host');
      if (redisHost) {
        const client = redis.createClient({
          url: redisHost,
          password: config.get('session.redis.key') as string,
          port: Number(SessionProperties.PORT),
          tls: SessionProperties.TLS,
          connect_timeout: SessionProperties.CONNECTION_TIMEOUT,
        });

        app.locals.redisClient = client;
        return new RedisStore({ client });
      }
      return new FileStore({ path: '/tmp' });
    }
  }
}

/* The above code is creating a new class named AppSessionConfigurator. This class has a method named
enableFor which takes an argument of type Application. This method is then parsing the cookie from
the request and creating a new instance of the StoreConfigurator class. The method is then using the
session middleware and passing in the configuration options. */
export namespace SessionSystemConfigurations {
  /* Defining a constant named SessionCookieExpiryAge with a value of 21 minutes. */
  export const SessionCookieExpiryAge: SessionCookieExpiryMaxAge = 21 * (60 * 1000);

  export class AppSessionConfigurator {
    /**
     * It enables the session for the application
     * @param {Application} app - Application - The express application instance.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public enableFor(app: Application): void {
      /* Parsing the cookie from the request. */
      app.use(cookieParser());
      /* Creating a new instance of the StoreConfigurator class. */
      const { StoreConfigurator } = SessionStoreConfigurations;
      const InstanceOfStoreConfig = new StoreConfigurator();
      app.use(
        session({
          name: 'ds-update-ui-session',
          resave: false,
          saveUninitialized: false,
          secret: config.get('session.secret'),
          cookie: {
            httpOnly: true,
            maxAge: SessionSystemConfigurations.SessionCookieExpiryAge,
          },
          rolling: true, // Renew the cookie for another 20 minutes on each request
          store: InstanceOfStoreConfig.configuration(app),
        })
      );
    }
  }
}
