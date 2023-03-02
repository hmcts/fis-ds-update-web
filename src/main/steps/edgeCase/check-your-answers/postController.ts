/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */

import autobind from 'autobind-decorator';
import axios from 'axios';
import config from 'config';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { RpeApi } from '../../../app/s2s/rpeAuth';
import { APPLICATION_CONFIRMATION } from '../../urls';
/* The CheckYourAnswersController class extends the PostController class */
@autobind
export default class CheckYourAnswersController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async serverCallForCaseSubmission(req: AppRequest<AnyObject>) {
    const caseDocuments = req.session['caseDocuments'];

    const documentRequestData: DocumentRequest = caseDocuments.map(document => {
      return {
        id: document.documentId,
        value: {
          document: {
            document_url: document.url,
            document_binary_url: document.binaryUrl,
            document_filename: document.fileName,
          },
          comment: document.description,
        },
      };
    });

    const data: DssUpdateRequest = {
      dssAdditionalCaseInformation: req.session['documentDetail'],
      dssCaseUpdatedBy: req.session['dssCaseUpdatedBy'],
      dssDocumentInfoList: documentRequestData,
    };

    const caseId = req.session['caseRefId'];
    const baseURL = `${config.get('api.cos')}/case/dss-orchestration/dss/${caseId}/update?event=UPDATE`;
    const seviceAuthToken = await RpeApi.getRpeToken();
    const s2sToken = seviceAuthToken.data;
    const updateRequest = await axios.put(baseURL, data, {
      headers: {
        ServiceAuthorization: `Bearer ${s2sToken}`,
      },
    });
    return updateRequest;
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { ...formData } = form.getParsedBody(req.body);
    req.session.errors = form.getErrors(formData);
    if (req.session.errors && req.session.errors.length) {
      return super.redirect(req, res, req.originalUrl);
    }
    try {
      const responseFromServerCall = await this.serverCallForCaseSubmission(req);
      if (responseFromServerCall.status === 200) {
        super.redirect(req, res, APPLICATION_CONFIRMATION);
      }
    } catch (error) {
      req.session.errors?.push({
        propertyName: 'submissionError',
        errorType: 'required',
      });
      super.redirect(req, res, req.originalUrl);
    }
  }
}

export interface DssUpdateRequest {
  dssAdditionalCaseInformation: string;
  dssCaseUpdatedBy: string;
  dssDocumentInfoList: DocumentRequest;
}
export interface DocumentRequest {
  id: string;
  value: {
    document: {
      document_url: string;
      document_binary_url: string;
      document_filename: string;
    };
    comment: string;
  };
}
