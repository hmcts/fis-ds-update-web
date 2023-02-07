import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../app/case/case';
import { AppRequest } from '../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../app/controller/GetController';
import { deleteDocument } from '../../app/fileUpload/documentManager';
import { RpeApi } from '../../app/s2s/rpeAuth';
import { UPLOAD_DOCUMENT } from '../../steps/urls';
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

@autobind
export default class DocumentUpload extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.headersSent || res.locals.isError) {
      return;
    }
    if (!req.session.hasOwnProperty('caseDocuments')) {
      req.session['caseDocuments'] = [];
    }
    if (req.query.hasOwnProperty('removeId')) {
      this.removeExistingConsentDocument(req.query.removeId as string, req, res);
    } else {
      super.get(req, res, { uploadedDocuments: req.session['caseDocuments'], FileErrors: req.session.errors });
    }
  }

  public removeExistingConsentDocument = async (documentId: string, req: AppRequest, res: Response): Promise<void> => {
    try {
      const seviceAuthToken = await RpeApi.getRpeToken();
      const s2sToken = seviceAuthToken.data;
      await deleteDocument(s2sToken, documentId);
      req.session['caseDocuments'] = req.session['caseDocuments'].filter(
        document => document.documentId !== documentId
      );
      req.session.save(error => {
        if (error) {
          throw error;
        }
        res.redirect(`${UPLOAD_DOCUMENT}`);
      });
    } catch (err) {
      console.log(err);
    }
  };
}
