import config from 'config';
import ConnectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import { Application } from 'express';
import session from 'express-session';
import * as redis from 'redis';
import FileStoreFactory from 'session-file-store';

// eslint-disable-next-line import/no-unresolved
import { SessionConfigurableProperties, SessionCookieExpiryMaxAge } from './type';

export class SessionStorage {
  /* Creating a new session store for Redis and FileStore. */
  public static RedisStore = ConnectRedis(session);
  public static FileStore = FileStoreFactory(session);

  /* Defining the default values for the session properties. */
  public static SessionProperties: SessionConfigurableProperties = {
    PORT: 6380,
    TLS: true,
    CONNECTION_TIMEOUT: 15000,
    COOKIE_MAX_AGE: 21,
  };

  /* Setting the cookieMaxAge to the value of the SessionProperties.COOKIE_MAX_AGE * (60 * 1000) */
  public static cookieMaxAge: SessionCookieExpiryMaxAge = SessionStorage.SessionProperties.COOKIE_MAX_AGE * (60 * 1000);

  /**
   * It enables the session middleware for the given Express application
   * @param {Application} app - Application - The express application object
   */
  public enableFor(app: Application): void {
    app.use(cookieParser());
    app.use(
      session({
        name: config.get('session.name'),
        resave: false,
        saveUninitialized: false,
        secret: config.get('session.secret'),
        cookie: {
          httpOnly: true,
          maxAge: SessionStorage.cookieMaxAge,
        },
        rolling: true, // Renew the cookie for another 20 minutes on each request
        store: this.getStore(app),
      })
    );
  }

  /**
   * If the redis host is set, create a redis client and return a redis store, otherwise return a file
   * store
   * @param {Application} app - Application - The express application
   * @returns A new instance of the RedisStore class.
   */
  private getStore(app: Application) {
    const redisHost = config.get('session.redis.host');
    if (redisHost) {
      const client = redis.createClient({
        host: redisHost as string,
        password: config.get('session.redis.key') as string,
        port: SessionStorage.SessionProperties.PORT,
        tls: SessionStorage.SessionProperties.TLS,
        connect_timeout: SessionStorage.SessionProperties.CONNECTION_TIMEOUT,
      });
      app.locals.redisClient = client;
      return new SessionStorage.RedisStore({ client });
    }
    return new SessionStorage.FileStore({ path: '/tmp' });
  }
}
