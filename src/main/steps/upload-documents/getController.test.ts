import { mockRequest } from '../../../test/unit/mocks/mockRequest';
import { mockResponse } from '../../../test/unit/mocks/mockResponse';
import { FieldPrefix } from '../../app/case/case';
import { UPLOAD_DOCUMENT } from '../../steps/urls';

import DocumentUpload from './getController';

describe('Test URL endpoints', () => {
  const controller = new DocumentUpload('page', () => ({}), FieldPrefix.APPLICANT);
  const res = mockResponse();
  const req = mockRequest();
  test('should be able to render the page and not show error page', async () => {
    await controller.get(req, res);
    expect(res.render).not.toHaveBeenCalledWith('error');
  });

  test('should be able to remove the documents from session, async', async () => {
    const parsedRequest = {
      ...req,
      session: {
        caseDocuments: [{ documentId: 'abc' }, { documentId: 'ubc' }],
      },
    };
    await controller.removeExistingConsentDocument('abc', parsedRequest, res);
    expect(res.redirect).not.toHaveBeenCalledWith(UPLOAD_DOCUMENT);
  });
});
