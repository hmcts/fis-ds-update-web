/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
import autobind from 'autobind-decorator';
//import config from 'config';
import axios from 'axios';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { UPLOAD_DOCUMENT } from '../../urls';
/* The UploadDocumentController class extends the PostController class and overrides the
PostDocumentUploader method */
@autobind
export default class UploadDocumentController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async serverCallForCaseIdValidations(req: AppRequest<AnyObject>) {
    const baseURL = `http://localhost:3100/case/dss-orchestration/${req.session['caseRefId']}`;
    const fetchRequest = await axios.get(baseURL);
    return fetchRequest;
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    console.log(req.body);
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { ...formData } = form.getParsedBody(req.body);
    req.session.errors = form.getErrors(formData);
    if (req.session.errors && req.session.errors.length) {
      return super.redirect(req, res, req.originalUrl);
    }

    try {
      const responseFromServerCall = await this.serverCallForCaseIdValidations(req);
      if (responseFromServerCall.status === 200) {
        const date = `${req.body['dateOfBirth-year']}-${req.body['dateOfBirth-month']}-${req.body['dateOfBirth-day']}`;
        const fullName: any = req.body['applicantName'];
        const parsedFullName = fullName.split(' ').join('').toLowerCase();

        // api check values
        const { dssQuestionAnswerPairs, dssQuestionAnswerDatePairs } = responseFromServerCall.data;
        const checkIfNameMatch = dssQuestionAnswerPairs[0].answer.split(' ').join('').toLowerCase() === parsedFullName;
        const checkIfDateMatch = dssQuestionAnswerDatePairs[0].answer === date;
        if (checkIfDateMatch && checkIfNameMatch) {
          super.redirect(req, res, UPLOAD_DOCUMENT);
        } else {
          req.session.errors.push({ propertyName: 'dataNotMatched', errorType: 'required' });
          super.redirect(req, res, req.originalUrl);
        }
      }
    } catch (error) {
      req.session.errors.push({ propertyName: 'caseNotFound', errorType: 'required' });
      super.redirect(req, res, req.originalUrl);
    }
  }
}
