/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
import autobind from 'autobind-decorator';
import axios from 'axios';
import config from 'config';
import { Response } from 'express';

import { getSystemUser } from '../../../app/auth/oidc';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields } from '../../../app/form/Form';
import { RpeApi } from '../../../app/s2s/rpeAuth';
import { DATA_VERIFICATION } from '../../urls';

@autobind
export default class UploadDocumentController extends PostController<AnyObject> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async serverCallForCaseIdValidations(req: AppRequest<AnyObject>) {
    const baseURL = `${config.get('services.case.url')}/cases/${req.body.applicantCaseId}`;
    const serviceAuthToken = await RpeApi.getRpeToken();
    const systemUserDetails = await getSystemUser();
    const s2sToken = serviceAuthToken.data;

    return axios.get(baseURL, {
      headers: {
        Authorization: 'Bearer ' + systemUserDetails.accessToken,
        ServiceAuthorization: `Bearer ${s2sToken}`,
        experimental: 'true',
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);
    const { ...formData } = form.getParsedBody(req.body);
    req.session.errors = form.getErrors(formData);
    let nextUrl: string;
    if (req.session.errors.length === 0) {
      try {
        const responseFromServerCall = await this.serverCallForCaseIdValidations(req);
        if (responseFromServerCall.status === 200) {
          req.session.caseRefId = responseFromServerCall.data.id;
          nextUrl = DATA_VERIFICATION;
        }
      } catch (error) {
        console.log(error);
        req.session.errors.push({ propertyName: 'caseNotFound', errorType: 'required' });
        req.session.caseRefId = <string>req.body['applicantCaseId'];
        nextUrl = req.originalUrl;
      }
    } else {
      nextUrl = req.originalUrl;
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
