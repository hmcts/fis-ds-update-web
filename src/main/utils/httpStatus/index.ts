import { HTTPCODE } from '@lib/definitions.global';
/**
 * The function HTTPSTATUS returns a function that returns a number.
 * @returns The status code
 */
class HTTPSTATUS {
  /* A function that returns an array of objects. */
  protected httpCodes = function (): HTTPCODE[] {
    return [
      { status: 100, message: 'Continue' },
      { status: 101, message: 'Switching Protocols' },
      { status: 102, message: 'Processing ' },
      { status: 200, message: 'OK' },
      { status: 201, message: 'Created' },
      { status: 202, message: 'Accepted' },
      { status: 203, message: 'Non-authoritative Information' },
      { status: 204, message: 'No Content' },
      { status: 205, message: 'Reset Content' },
      { status: 206, message: 'Partial Content' },
      { status: 207, message: 'Multi - Status' },
      { status: 208, message: 'Already Reported' },
      { status: 226, message: 'IM Used' },
      { status: 300, message: 'Multiple Choices' },
      { status: 301, message: 'Moved Permanently' },
      { status: 302, message: 'Found' },
      { status: 303, message: 'See Other' },
      { status: 304, message: 'Not Modified' },
      { status: 305, message: 'Use Proxy' },
      { status: 307, message: 'Temporary Redirect' },
      { status: 308, message: 'Permanent Redirect' },
      { status: 400, message: 'Bad Request' },
      { status: 401, message: 'Unauthorized' },
      { status: 402, message: 'Payment Required' },
      { status: 403, message: 'Forbidden' },
      { status: 404, message: 'Not Found' },
      { status: 405, message: 'Method Not Allowed' },
      { status: 406, message: 'Not Acceptable' },
      { status: 407, message: 'Proxy Authentication Required' },
      { status: 408, message: 'Request Timeout' },
      { status: 409, message: 'Conflict' },
      { status: 410, message: 'Gone' },
      { status: 411, message: 'Length Required' },
      { status: 412, message: 'Precondition Failed' },
      { status: 413, message: 'Payload Too Large' },
      { status: 414, message: 'Request - URI Too Long' },
      { status: 415, message: 'Unsupported Media Type' },
      { status: 416, message: 'Requested Range Not Satisfiable' },
      { status: 417, message: 'Expectation Failed' },
      { status: 418, message: 'I’m a teapot' },
      { status: 421, message: 'Misdirected Request' },
      { status: 422, message: 'Unprocessable Entity' },
      { status: 423, message: 'Locked' },
      { status: 424, message: 'Failed Dependency' },
      { status: 426, message: 'Upgrade Required' },
      { status: 428, message: 'Precondition Required' },
      { status: 429, message: 'Too Many Requests' },
      { status: 431, message: 'Request Header Fields Too Large' },
      { status: 444, message: 'Connection Closed Without Response' },
      { status: 451, message: 'Unavailable For Legal Reasons' },
      { status: 499, message: 'Client Closed Request' },
      { status: 500, message: 'Internal Server Error' },
      { status: 501, message: 'Not Implemented' },
      { status: 502, message: 'Bad Gateway' },
      { status: 503, message: 'Service Unavailable' },
      { status: 504, message: 'Gateway Timeout' },
      { status: 505, message: 'HTTP Version Not Supported' },
      { status: 506, message: 'Variant Also Negotiates' },
      { status: 507, message: 'Insufficient Storage' },
      { status: 508, message: 'Loop Detected' },
      { status: 510, message: 'Not Extended' },
      { status: 511, message: 'Network Authentication Required' },
      { status: 599, message: 'Network Connect Timeout Error' },
    ];
  };

  /* Creating a new object with the status code as the key and the message as the value. */
  CODES = function (): any {
    const FormattedStatusCodes: any = {};
    const ParsedStatusCodes = this.httpCodes.map((codeObject: HTTPCODE) => Object.values(codeObject));
    for (const aCode of ParsedStatusCodes) {
      FormattedStatusCodes[aCode[1].toUpperCase().split(' ').join('_')] = aCode[0];
    }
    return FormattedStatusCodes;
  };
}

export default new HTTPSTATUS();
