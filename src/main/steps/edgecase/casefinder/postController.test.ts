import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../app/form/Form';

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
        applicantCaseId: '1675676483319900',
      },
      session: {
        applicantCaseId: 'caseRefId',
      },
    });
    const caseData = {};
    mockedAxios.post.mockResolvedValue({ data: caseData });
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });
});
