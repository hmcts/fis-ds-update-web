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

    req.session.errors = form.getErrors(formData);
    if (req.session.errors && req.session.errors.length) {
      return super.redirect(req, res, req.originalUrl);
    }

    const newFormData: ANYTYPE = formData;
    delete newFormData['_csrf'];
    delete newFormData['saveAndContinue'];

    const dssQuestionAnswerPairs = req.session.verificationData['dssQuestionAnswerPairs'];
    const dssQuestionAnswerDatePairs = req.session.verificationData['dssQuestionAnswerDatePairs'];

    const datePairs = {};
    dssQuestionAnswerDatePairs.forEach((question, index) => {
      const date = question['answer'];
      const parsedDate = date.split('-');
      const calendarDate = parsedDate['2'].startsWith('0', 0) ? parsedDate['2'].slice(1, 2) : parsedDate['2'];
      const calendarMonth = parsedDate['1'].startsWith('0', 0) ? parsedDate['2'].slice(1, 2) : parsedDate['2'];
      const calendarYear = parsedDate['0'];
      datePairs[`DateFields_${index}-day`] = calendarDate;
      datePairs[`DateFields_${index}-month`] = calendarMonth;
      datePairs[`DateFields_${index}-year`] = calendarYear;
    });

    const InputFieldPairs = {};
    dssQuestionAnswerPairs.forEach((question, index) => {
      const field = question['answer'];
      const answerField = field
        .replace(/^\s+|\s+$/gm, '')
        .split(' ')
        .join('')
        .toLowerCase();
      InputFieldPairs[`InputFields_${index}`] = answerField;
    });

    const matcherData = { ...datePairs, ...InputFieldPairs };
    const transformedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]: ANYTYPE) => [
        key,
        value.startsWith('0', 0)
          ? value
              .replace(/^\s+|\s+$/gm, '')
              .split(' ')
              .join('')
              .slice(1, 2)
          : value
              .replace(/^\s+|\s+$/gm, '')
              .split(' ')
              .join('')
              .toLowerCase(),
      ])
    );
    const checkIfDataMatched = JSON.stringify(matcherData) === JSON.stringify(transformedFormData);
    if (checkIfDataMatched) {
      req.session['isDataVerified'] = true;
      req.session.tempValidationData = {};
      req.session.errors = undefined;
      return super.redirect(req, res, UPLOAD_DOCUMENT);
    } else {
      const formDataToSessionValue = Object.fromEntries(
        Object.entries(formData).map(([key, value]: ANYTYPE) => [key, value])
      );

      const verificationDataForForm: ANYTYPE = req.session['verificationData'];
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { caseId } = verificationDataForForm;

      const mapped_dssQuestionAnswerPairs = dssQuestionAnswerPairs.map((item, index) => {
        let { answer } = item;
        answer = formDataToSessionValue[`InputFields_${index}`];
        return { ...item, answer };
      });

      const mapped_dssQuestionAnswerDatePairs = dssQuestionAnswerDatePairs.map((item, index) => {
        let { answer } = item;
        const day = formDataToSessionValue[`DateFields_${index}-day`];
        const month = formDataToSessionValue[`DateFields_${index}-month`];
        const year = formDataToSessionValue[`DateFields_${index}-year`];
        const parsedDate = `${year}-${month}-${day}`;
        answer = parsedDate;
        return { ...item, answer };
      });
      const filledFormDataWithErrors = {
        caseId,
        dssQuestionAnswerPairs: mapped_dssQuestionAnswerPairs,
        dssQuestionAnswerDatePairs: mapped_dssQuestionAnswerDatePairs,
      };

      req.session.tempValidationData = filledFormDataWithErrors;
      req.session['isDataVerified'] = false;
      if (!req.session.hasOwnProperty('errors')) {
        req.session['errors'] = [];
      }
      const isFieldEmpty = Object.values(formData).includes('');
      if (isFieldEmpty) {
        if (req.session.errors) {
          req.session['errors'] = [{ propertyName: 'isEmptyFields', errorType: 'required' }];
          return super.redirect(req, res, req.originalUrl);
        }
      } else {
        if (req.session.errors) {
          req.session['errors'] = [{ propertyName: 'dataNotMatched', errorType: 'required' }];
        }
        return super.redirect(req, res, req.originalUrl);
      }
    }
  }
}
