/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { UPLOAD_DOCUMENT } from '../../urls';

import { ANYTYPE } from './index';
/* The UploadDocumentController class extends the PostController class and overrides the
PostDocumentUploader method */
@autobind
export default class UploadDocumentController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    // console.log(req.body);
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { ...formData } = form.getParsedBody(req.body);

    /**
     *   req.session.errors = form.getErrors(formData);
    if (req.session.errors && req.session.errors.length) {
      return super.redirect(req, res, req.originalUrl);
    }
     */

    const newFormData: ANYTYPE = formData;
    delete newFormData['_csrf'];
    delete newFormData['saveAndContinue'];

    const dssQuestionAnswerPairs = req.session.verificationData['dssQuestionAnswerPairs'];
    const dssQuestionAnswerDatePairs = req.session.verificationData['dssQuestionAnswerDatePairs'];

    const datePairs = {};
    dssQuestionAnswerDatePairs.forEach((question, index) => {
      const date = question['answer'];
      const parsedDate = date.split('-');
      const calendarDate = parsedDate['2'];
      const calendarMonth = parsedDate['1'];
      const calendarYear = parsedDate['0'];
      datePairs[`DateFields_${index}-day`] = calendarDate;
      datePairs[`DateFields_${index}-month`] = calendarMonth;
      datePairs[`DateFields_${index}-year`] = calendarYear;
    });

    const InputFieldPairs = {};
    dssQuestionAnswerPairs.forEach((question, index) => {
      const field = question['answer'];
      const answerField = field.split(' ').join('').toLowerCase();
      InputFieldPairs[`InputFields_${index}`] = answerField;
    });

    const matcherData = { ...datePairs, ...InputFieldPairs };
    const transformedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]: ANYTYPE) => [key, value.split(' ').join('').toLowerCase()])
    );
    const checkIfDataMatched = JSON.stringify(matcherData) === JSON.stringify(transformedFormData);
    if (checkIfDataMatched) {
      req.session['isDataVerified'] = true;
      return super.redirect(req, res, UPLOAD_DOCUMENT);
    } else {
      req.session['isDataVerified'] = false;
      req.session['verificationData'] = {};
      if (!req.session.hasOwnProperty('errors')) {
        req.session['errors'] = [];
      }
      if (req.session.errors) {
        req.session['errors'].push({ propertyName: 'dataNotMatched', errorType: 'required' });
      }
      super.redirect(req, res, req.originalUrl);
    }
  }
}
