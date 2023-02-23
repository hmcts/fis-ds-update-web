import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Document } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import CheckYourAnswersController from './postController';

jest.mock('axios');
let req, res;

const finalDocument: Document = {
  document_url: '/document/dummy/download',
  document_filename: 'dummy file',
  document_binary_url: 'http://dummy.document.download',
};

describe('CheckYourAnswersController test cases', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should submit the case and navigate to confirmation page', async () => {
    req = mockRequest({
      body: {
        saveAndContinue: true,
      },

      session: {
        caseDocuments: [
          {
            url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/770fe5b7-77d6-41e8-81aa-d16730c440c5',
            fileName: 'test.pdf',
            documentId: '770fe5b7-77d6-41e8-81aa-d16730c440c5',
            binaryUrl:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/770fe5b7-77d6-41e8-81aa-d16730c440c5/binary',
            description: 'Test1',
          },
        ],
      },
    });
    const caseData = {
      ...finalDocument,
    };
    mockedAxios.post.mockResolvedValue({ data: caseData });
    const controller = new CheckYourAnswersController(mockFormContent.fields);
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });
});
