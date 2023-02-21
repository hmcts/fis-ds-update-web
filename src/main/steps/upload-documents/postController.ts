/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

export const documentExtensions = () => {
  return ['jpg', 'jpeg', 'bmp', 'png', 'pdf', 'doc', 'docx', 'rtf', 'xlsx', 'txt'];
};

export const multimediaExtensions = () => {
  return ['mp3', 'mp4', 'wav'];
};
@autobind
export default class UploadDocumentController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { files }: AppRequest<AnyObject> = req;
    const ContinueFromPage = req['body'].hasOwnProperty('continue');
    if (req.session) {
      req.session.errors = [];
    }
    req.session['documentDetail'] = req.body['documentDetail'];
    req.session.save();
    if (ContinueFromPage) {
      if (!req.session.hasOwnProperty('caseDocuments') || req.session['caseDocuments'].length === 0) {
        this.uploadFileError(req, res, req.originalUrl, {
          propertyName: 'noDocumentUploaded',
          errorType: 'required',
        });
      } else {
        super.redirect(req, res, req.originalUrl);
      }
    } else {
      this.checkFileCondition(req, res, req.originalUrl, files);
    }
  }

  public checkIfMaxDocumentUploaded = (document: C100DocumentInfo[]): boolean => {
    if (document.length > Number(config.get('uploadPolicy.maxNoOfFiles')) - 1) {
      return true;
    }
    return false;
  };

  //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public checkFileCondition(
    req: AppRequest<AnyObject>,
    res: Response<any, Record<string, any>>,
    redirectUrl: string,
    //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    files: any
  ) {
    if (this.checkIfMaxDocumentUploaded(req.session['caseDocuments'])) {
      req.session.errors = [{ propertyName: 'maxFileError', errorType: 'required' }];
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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async checkFileValidation(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    files: any,
    req: AppRequest<AnyObject>,
    res: Response<any, Record<string, any>>,
    redirectUrl: string
  ) {
    const { documents } = files;
    const extension = documents.name.toLowerCase().split('.')[documents.name.split('.').length - 1];
    if (this.fileNullCheck(files)) {
      this.uploadFileError(req, res, redirectUrl, {
        propertyName: 'selectFileToUpload',
        errorType: 'required',
      });
      // Uncomment below checks, once there are validations in place
    } else if (!this.isValidFileFormat(files)) {
      this.uploadFileError(req, res, redirectUrl, {
        propertyName: 'fileValidation',
        errorType: 'required',
      });
    } else if (this.isFileSizeGreaterThanMaxAllowed(files)) {
      if (multimediaExtensions().includes(extension)) {
        this.uploadFileError(req, res, redirectUrl, {
          propertyName: 'multimediaFileSize',
          errorType: 'required',
        });
      } else {
        this.uploadFileError(req, res, redirectUrl, {
          propertyName: 'fileSize',
          errorType: 'required',
        });
      }
    } else if (req.body['event-name'] === '') {
      this.uploadFileError(req, res, redirectUrl, {
        propertyName: 'fileDescriptionRequired',
        errorType: 'required',
      });
    } else {
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
        this.uploadFileError(req, res, redirectUrl, {
          propertyName: 'uploadError',
          errorType: 'required',
        });
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

  public uploadFileError(
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

  public isValidFileFormat(files) {
    const { documents } = files;
    const extension = documents.name.toLowerCase().split('.')[documents.name.split('.').length - 1];
    const AllowedFileExtentionList = [...documentExtensions(), ...multimediaExtensions()];
    return AllowedFileExtentionList.indexOf(extension) > -1;
  }

  public isFileSizeGreaterThanMaxAllowed(files) {
    const uploadPolicySizeForFiles = Number(config.get('uploadPolicy.documentSize')) * 1000000;
    const uploadPolicySizeForMultimediaFiles = Number(config.get('uploadPolicy.multimediaSize')) * 1000000;
    const { documents } = files;
    const extension = documents.name.toLowerCase().split('.')[documents.name.split('.').length - 1];
    if (documentExtensions().includes(extension)) {
      return documents.size > uploadPolicySizeForFiles;
    }
    if (multimediaExtensions().includes(extension)) {
      return documents.size > uploadPolicySizeForMultimediaFiles;
    }
    return false;
  }
}
