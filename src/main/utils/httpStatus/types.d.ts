/**
 * HTTP_STATUS_CODE is a type that is a number.
 */
type HTTP_STATUS_CODE = number;

/**
 * HTTPCODES is a type that is an object with string keys and HTTP_STATUS_CODE values.
 * @property {HTTP_STATUS_CODE} [keyNameOfHttpStatusCode: HTTP_STATUS_CODE] - This is the key name of
 * the HTTP status code.
 */
export type HTTPCODES = {
  [keyNameOfHttpStatusCode: string]: HTTP_STATUS_CODE;
};
