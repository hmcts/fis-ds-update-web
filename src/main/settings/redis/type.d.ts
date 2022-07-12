export declare type SessionCookieExpiryMaxAge = number;

 /**
 * SessionConfigurableProperties is an object with three properties: PORT, TLS, and
 * CONNECTION_TIMEOUT, all of which are numbers.
 * @property {number} PORT - The port on which the server will listen for requests.
 * @property {boolean} TLS - If you want to use TLS, set this to true.
 * @property {number} CONNECTION_TIMEOUT - The time in milliseconds after which the
 * connection will be closed.
 * @property {number} COOKIE_MAX_AGE - The time in milliseconds for which the cookie
 * will be valid.
 */
  export declare type SessionConfigurableProperties = {
    PORT: number ,
    TLS: boolean,
    CONNECTION_TIMEOUT: number,
    COOKIE_MAX_AGE: number,
  }
