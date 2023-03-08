import config from 'config';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { START_HOME } from '../urls';

export class HomeGetController {
  public get(req: AppRequest, res: Response): void {
    if (!req.query.hasOwnProperty('logged-in')) {
      return res.redirect('/error');
    } else {
      const users = config.get('loggedInUsers') as string[];
      if (users.includes(req.query['logged-in'] as string)) {
        const loggedInUser = req.query['logged-in'];
        return res.redirect(START_HOME + `?logged-in=${loggedInUser}`);
      } else {
        return res.redirect('/error');
      }
    }
  }
}
