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
    console.log('inside get controller of data verficiation');
    if (res.locals.isError || res.headersSent) {
      return;
    }
    try {
      console.log('inside try');
      if (!req.session.hasOwnProperty('verificationData')) {
        console.log('inside verification data if loop');
        req.session['verificationData'] = {};
      }
      if (!req.session.hasOwnProperty('isDataVerified')) {
        console.log('inside isDataVerified  if loop');
        req.session['isDataVerified'] = false;
      }
      super.get(req, res, {});
    } catch (error) {
      console.log('error found please log');
      console.log(error);
      res.redirect('/error');
    }
  }
}
