/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application } from 'express';

export class TestApiRoutes {
  /**
   *
   * @param app
   */
  public enableFor(app: Application): void {
    //api endpoint
    app.get('/api/v1/session', (req, res) => res.json(req.session));
  }
}
