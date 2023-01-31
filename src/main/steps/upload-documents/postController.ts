/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';
import FormData from 'form-data';
import { isNull } from 'lodash';

import { C100DocumentInfo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../app/controller/PostController';
import { uploadDocument } from '../../app/fileUpload/documentManager';
import { FormFields, FormFieldsFn } from '../../app/form/Form';
import { RpeApi } from '../../app/s2s/rpeAuth';
/* The UploadDocumentController class extends the PostController class and overrides the
PostDocumentUploader method */
@autobind
export default class UploadDocumentController {
  private parent;
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    this.parent = new PostController(fields);
  }
  /**
   * A recursive function that calls itself.
   * @param req - AppRequest<AnyObject>
   * @param {Response} res - Response - This is the response object txhat will be sent back to the client.
   */

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { files }: AppRequest<AnyObject> = req;
    if (req.session) {
      req.session.errors = [];
    }

    if (req.body.saveAndComeLater) {
      this.parent.post(req, res);
    } else if (this.checkSaveandContinueDocumentExist(req)) {
      this.parent.redirect(req, res, '');
    } else {
      this.checkFileCondition(req, res, req.originalUrl, files);
    }
  }

  /**
   *
   * @param req
   * @param certificate
   * @returns
   */
  public checkSaveandContinueDocumentExist = (req: AppRequest<AnyObject>): any => {
    return req.body.saveAndContinue && this.checkIfDocumentAlreadyExist(req.session['caseDocuments']);
  };

  /**
   *
   * @param document
   * @returns
   */
  public checkIfDocumentAlreadyExist = (document: C100DocumentInfo): boolean => {
    if (document?.id) {
      return true;
    }
    return false;
  };

  /**
   *
   * @param certificate
   * @param req
   * @param res
   * @param redirectUrl
   * @param files
   * @param fileNamePrefix
   * @param paramCert
   */
  //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public checkFileCondition(
    req: AppRequest<AnyObject>,
    res: Response<any, Record<string, any>>,
    redirectUrl: string,
    //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    files: any
  ) {
    if (this.checkIfDocumentAlreadyExist(req.session['caseDocuments'])) {
      req.session.errors = [{ propertyName: 'document', errorType: 'multipleFiles' }];
      req.session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect(redirectUrl);
      });
    } else {
      this.checkFileValidation(files, req, res, redirectUrl);
    }
  }

  /**
   *
   * @param files
   * @param req
   * @param res
   * @param redirectUrl
   * @param fileNamePrefix
   * @param paramCert
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async checkFileValidation(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    files: any,
    req: AppRequest<AnyObject>,
    res: Response<any, Record<string, any>>,
    redirectUrl: string
  ) {
    if (this.fileNullCheck(files)) {
      this.uploadFileError(req, res, redirectUrl, {
        propertyName: 'document',
        errorType: 'required',
      });
      // Uncomment below checks, once there are validations in place
    } else if (!this.isValidFileFormat(files)) {
      this.uploadFileError(req, res, redirectUrl, {
        propertyName: 'fileValidation',
        errorType: 'required',
      });
    } else if (this.isFileSizeGreaterThanMaxAllowed(files)) {
      this.uploadFileError(req, res, redirectUrl, {
        propertyName: 'fileSize',
        errorType: 'required',
      });
    } else {
      const { documents }: any = files;

      const formData: FormData = new FormData();
      formData.append('file', documents.data, {
        contentType: documents.mimetype,
        filename: `${documents.name}`,
      });
      formData.append('caseTypeOfApplication', config.get('app.caseTypeOfApplication'));
      try {
        const seviceAuthToken = await RpeApi.getRpeToken();
        const s2sToken = seviceAuthToken.data;
        const uploadDocumentResponseBody = await uploadDocument(formData, s2sToken);
        const { url, fileName, documentId, binaryUrl } = uploadDocumentResponseBody['data']['document'];
        req.session['caseDocuments'].push({
          url,
          fileName,
          documentId,
          binaryUrl,
          description: req.body['event-name'],
        });
        req.session.save(() => res.redirect(redirectUrl));
      } catch (error) {
        console.log(error);
        res.redirect('/500');
      }
    }
  }

  /**
   *
   * @param files
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public fileNullCheck = (files: any): boolean => {
    return !!(isNull(files) || files === undefined);
  };

  private uploadFileError(
    req: AppRequest<AnyObject>,
    res: Response<any, Record<string, any>>,
    redirectUrl: string,
    errObj: any
  ) {
    req.session.errors = [errObj];
    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(redirectUrl);
    });
  }

  private isValidFileFormat(files) {
    const { documents } = files;
    const extension = documents.name.toLowerCase().split('.')[documents.name.split('.').length - 1];
    const AllowedFileExtentionList = ['jpg', 'jpeg', 'bmp', 'png', 'pdf', 'doc', 'docx', 'rtf', 'xlsx'];
    return AllowedFileExtentionList.indexOf(extension) > -1;
  }

  private isFileSizeGreaterThanMaxAllowed(files) {
    const uploadPolicySizeForFiles = Number(config.get('uploadPolicy.documentSize')) * 1000000;
    const { documents } = files;
    return documents.size > uploadPolicySizeForFiles;
  }
}
