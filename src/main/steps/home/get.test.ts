import { mockRequest } from '../../../test/unit/mocks/mockRequest';
import { mockResponse } from '../../../test/unit/mocks/mockResponse';
import { START_HOME } from '../urls';

import { HomeGetController } from './get';

describe('Test URL endpoints', () => {
  const controller = new HomeGetController();

  const res = mockResponse();
  const req = mockRequest();

  test('should be able to remove the documents from session, async', async () => {
    await controller.get(req, res);
    expect(res.redirect).toHaveBeenCalledWith(START_HOME);
  });
});
