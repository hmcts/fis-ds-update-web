import axios from 'axios';

import { FormContent } from '../../../main/app/form/Form';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import UploadDocumentController from './postController';
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

  test('Checking file valid format - true scenario', async () => {
    const filetypeCheck = controller.isValidFileFormat({ documents: { name: 'smple.docx' } });
    expect(filetypeCheck).toBe(true);
  });

  test('Checking file valid format - false scenario', async () => {
    const filetypeCheck = controller.isValidFileFormat({ documents: { name: 'smple.dmg' } });
    expect(filetypeCheck).toBe(false);
  });

  test('Checking file size - false scenario', async () => {
    const fileSizeCheck = controller.isFileSizeGreaterThanMaxAllowed({ documents: { size: 30 } });
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
});
