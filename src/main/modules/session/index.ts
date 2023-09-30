import config from 'config';
import ConnectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import { Application } from 'express';
import session from 'express-session';
import * as redis from 'redis';
import FileStoreFactory from 'session-file-store';

const RedisStore = ConnectRedis(session);
const FileStore = FileStoreFactory(session);

export const cookieMaxAge = 21 * (60 * 1000); // 21 minutes

export class SessionStorage {
  public enableFor(app: Application): void {
    app.use(cookieParser());

    app.use(
      session({
        name: 'fis-ds-update-web-session',
        resave: false,
        saveUninitialized: false,
        secret: config.get('session.secret'),
        cookie: {
          httpOnly: true,
          ...(config.get('session.secureCookie') === 'true' ? { secure: true } : {}),
          maxAge: cookieMaxAge,
          sameSite: 'lax', // required for the oauth2 redirect
        },
        rolling: true, // Renew the cookie for another 20 minutes on each request
        store: this.getStore(app),
      })
    );

    console.log('inside session');
  }

  private getStore(app: Application) {
    const redisHost = config.get('session.redis.host');
    if (redisHost) {
      const client = redis.createClient({
        host: redisHost as string,
        password: config.get('session.redis.key') as string,
        port: 6380,
        tls: true,
        connect_timeout: 15000,
      });

      app.locals.redisClient = client;
      console.log('inside redis client ');
      console.log(client);
      console.log('after client console');
      console.log('config.get("session.redis.key")')
      console.log(config.get('session.redis.key'));
      return new RedisStore({ client });
    }

    return new FileStore({ path: '/tmp' });
  }
}
