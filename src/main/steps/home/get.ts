import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { CITIZEN_HOME_URL } from '../urls';

export class HomeGetController {
  public get(req: AppRequest, res: Response): void {
    const isFirstQuestionComplete = true;
    res.redirect(applicant1RedirectPageSwitch(isFirstQuestionComplete));
  }
}

const applicant1RedirectPageSwitch = (isFirstQuestionComplete: boolean) => {
  return isFirstQuestionComplete ? CITIZEN_HOME_URL : CITIZEN_HOME_URL;
};
