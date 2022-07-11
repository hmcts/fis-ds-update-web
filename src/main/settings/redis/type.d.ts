export declare type SessionCookieExpiryMaxAge = number;

/**
 * `SessionConfigurableProperties` is an object with three properties: `PORT`, `TLS`, and
 * `CONNECTION_TIMEOUT`.
 * 
 * The `PORT` property is a number or a string.
 * 
 * The `TLS` property is a boolean.
 * 
 * The `CONNECTION_TIMEOUT` property is a number.
 * @property {number | string} PORT - The port on which the server will listen for incoming
 * connections.
 * @property {boolean} TLS - If you want to use TLS, set this to true.
 * @property {number} CONNECTION_TIMEOUT - The time in milliseconds that the server will wait for a
 * client to connect before timing out.
 */
export declare type SessionConfigurableProperties = {
    PORT: number ,
    TLS: boolean,
    CONNECTION_TIMEOUT: number,
  }
