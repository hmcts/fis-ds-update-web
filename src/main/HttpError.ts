/* HTTPError is a class that extends Error and has a status property. */
export class HTTPError extends Error {
  status: number;

  /**
   * The constructor function is a special function that is called when an object is created from a class
   * @param {string} message - The error message.
   * @param {number} status - The HTTP status code.
   */
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
