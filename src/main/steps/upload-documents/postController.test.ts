import axios from 'axios';

import { FormContent } from '../../../main/app/form/Form';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import UploadDocumentController, { documentExtensions, multimediaExtensions } from './postController';

jest.mock('axios');
let req, res;

const mockedAxios = axios as jest.Mocked<typeof axios>;
beforeEach(() => {
  req = mockRequest();
  res = mockResponse();
});

const mockFormContent = {
  fields: {},
} as unknown as FormContent;

const controller = new UploadDocumentController(mockFormContent.fields);

describe('Testing the post controller', () => {
  test('upload document sequence', async () => {
    req = mockRequest({
      body: {
        saveAndContinue: true,
        files: { documents: {} },
      },
      session: {
        applicantCaseId: 'caseRefId',
        caseDocuments: [],
      },
    });
    const data = {
      status: 'Success',
      document: {
        url: 'http://demo.com',
        fileName: 'Screenshot 2023-01-24 at 11.52.19.png',
        documentId: '93de8780-e3f3',
        binaryUrl: 'http://demon.com',
      },
    };
    mockedAxios.post.mockResolvedValue({ data });
    //await controller.post(req, res);
    expect(res.redirect).not.toHaveBeenCalled();
  });

  test('Checking filevalidation type for documents', async () => {
    expect(documentExtensions().toString()).toEqual(
      ['jpg', 'jpeg', 'bmp', 'png', 'pdf', 'doc', 'docx', 'rtf', 'xlsx', 'txt'].toString()
    );
  });

  test('Checking filevalidation type for multimedia', async () => {
    expect(multimediaExtensions().toString()).toEqual(['mp3', 'mp4', 'wav'].toString());
  });

  test('Checking file valid format - true scenario', async () => {
    const filetypeCheck = controller.isValidFileFormat({ documents: { name: 'smple.docx' } });
    expect(filetypeCheck).toBe(true);
  });

  test('Checking file valid format - false scenario', async () => {
    const filetypeCheck = controller.isValidFileFormat({ documents: { name: 'smple.dmg' } });
    expect(filetypeCheck).toBe(false);
  });

  test('Checking file size - false scenario', async () => {
    const fileSizeCheck = controller.isFileSizeGreaterThanMaxAllowed({ documents: { size: 30, name: 'm.docx' } });
    expect(fileSizeCheck).toBe(false);
  });

  test('Checking file size for multimedia files', async () => {
    const fileSizeCheck = controller.isFileSizeGreaterThanMaxAllowed({ documents: { size: 200, name: 'm.mp4' } });
    expect(fileSizeCheck).toBe(false);
  });

  test('Checking file size for multimedia files - false scenario', async () => {
    const fileSizeCheck = controller.isFileSizeGreaterThanMaxAllowed({ documents: { size: 510, name: 'm.mp4' } });
    expect(fileSizeCheck).toBe(false);
  });

  test('Checking file is null', async () => {
    const fileNullCheck = controller.fileNullCheck({});
    expect(fileNullCheck).toBe(false);
  });

  test('File validations', async () => {
    const newRequest = req;
    newRequest.session['save'] = () => '';
    newRequest.files = { documents: { name: 'smple.pdf', size: 10, mimetype: 'application/pdf', data: '' } };
    const data = {
      status: 'Success',
      document: {
        url: 'http://demo.com',
        fileName: 'Screenshot 2023-01-24 at 11.52.19.png',
        documentId: '93de8780-e3f3',
        binaryUrl: 'http://demon.com',
      },
    };
    mockedAxios.post.mockResolvedValue({ data });
    await controller.checkFileValidation(
      { documents: { name: 'smple.pdf', size: 10, mimetype: 'application/pdf', data: '' } },
      newRequest,
      res,
      ''
    );
    expect(res.redirect).not.toHaveBeenCalled();
  });

  test('File validations - multimedia file error', async () => {
    const newRequest = req;
    newRequest.session['save'] = () => '';
    newRequest.files = { documents: { name: 'sample.mp3', size: 510, mimetype: 'audio/mpeg', data: '' } };
    const data = {};
    mockedAxios.post.mockRejectedValue({ data });
    await controller.checkFileValidation(
      { documents: { name: 'sample.mp3', size: 510, mimetype: 'audio/mpeg', data: '' } },
      newRequest,
      res,
      ''
    );
    expect(res.redirect).not.toHaveBeenCalled();
    expect(req.session?.errors).toHaveLength(1);
  });

  test('File validations - file uploading successfull', async () => {
    const newRequest = req;
    newRequest.session['save'] = () => '';
    newRequest.files = { documents: { name: 'sample.pdf', size: 10, mimetype: 'application/pdf', data: '' } };
    const data = {
      status: 'Success',
      document: {
        url: 'http://demo.com',
        fileName: 'sample.mp3',
        documentId: '93de8780-e3f3',
        binaryUrl: 'http://demon.com',
      },
    };
    mockedAxios.post.mockRejectedValue({ data });
    await controller.checkFileValidation(
      { documents: { name: 'sample.pdf', size: 10, mimetype: 'application/pdf', data: '' } },
      newRequest,
      res,
      ''
    );
    expect(res.redirect).not.toHaveBeenCalled();
    expect(req.session?.errors).toHaveLength(1);
  });

  test('uploadFileError', () => {
    const newRequest = req;
    newRequest.session['save'] = () => '';
    controller.uploadFileError(newRequest, res, '', {
      propertyName: 'fileValidation',
      errorType: 'required',
    });
    expect(res.redirect).not.toHaveBeenCalled();
  });
});
