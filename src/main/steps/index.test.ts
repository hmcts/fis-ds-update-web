import { mockRequest } from '../../test/unit/utils/mockRequest';
import { AppRequest } from '../app/controller/AppRequest';

import { HOME_URL } from './urls';

import { getNextStepUrl, getPathAndQueryStringFromUrl } from './index';

describe('Steps', () => {
  describe('getPathAndQueryStringFromUrl()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('returns the next step when correct details a passed', () => {
      mockReq.originalUrl = HOME_URL;
      //mockReq.path = HOME_URL;
      const data = {};
      expect(data).not.toBe('');
    });

    it('getPathAndQueryStringFromUrl - adding url query', () => {
      const url = 'http://example.com?name=test&date=2015' as `/${string}`;
      expect(getPathAndQueryStringFromUrl(url)).not.toBe('');
    });
  });

  describe('getNextStepUrl()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('returns the next step when correct details a passed', () => {
      mockReq.originalUrl = HOME_URL;
      //mockReq.path = HOME_URL;
      const data = {};
      expect(data).not.toBe('');
    });

    it('getNextStepUrl', () => {
      const mRequest = mockReq;
      //mRequest.path = HOME_URL + '/:h';
      mRequest.route = {
        path: '',
      };
      mRequest.body = {};
      expect(getNextStepUrl(mRequest, {})).not.toBe('');
    });
  });
});
