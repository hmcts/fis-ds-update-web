import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { START_HOME } from '../urls';

export class HomeGetController {
  public get(req: AppRequest, res: Response): void {
    res.redirect(START_HOME);
  }
}
