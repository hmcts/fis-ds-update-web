import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';

@autobind
export default class CitizenDataVerificationGetController extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      return;
    }
    try {
      if (!req.session.hasOwnProperty('verificationData')) {
        req.session['verificationData'] = {};
      }
      if (!req.session.hasOwnProperty('isDataVerified')) {
        req.session['isDataVerified'] = false;
      }
      super.get(req, res, {});
    } catch (error) {
      console.log(error);
      res.redirect('/error');
    }
  }
}
