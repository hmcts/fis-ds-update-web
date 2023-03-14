import axios from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { CookiesGetController } from './get';

jest.mock('axios');
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);
const req = mockRequest();
const res = mockResponse();

describe('cookies Get Controller', () => {
  const controller = new CookiesGetController();
  beforeEach(() => {
    jest.clearAllMocks;
  });

  afterEach(() => {
    jest.clearAllMocks;
  });

  test('Should update the before loading Check your answers screen', async () => {
    req.session.userCase.caseId = '1111';
    await controller.get(req, res);

    expect(req.session.userCase.caseId).toEqual('1111');
  });

  test('cookie prefernce scereen', async () => {
    req.session.userCase.caseId = '1111';
    req.session.paymentError = false;
    await controller.get(req, res);
    const callback = jest.fn();
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(req.session.userCase.caseId).toEqual('1111');
  });

  //cookiePreferenceChanger

  test('cookiePreferenceChanger - changing cookies preferences - using cookies', async () => {
    const query = {
      analytics: 'on',
      apm: 'on',
    };
    req.query = query;
    await controller.cookiePreferenceChanger(req, res);
    expect(res.cookie).not.toBeNull();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('cookiePreferenceChanger - changing cookies preferences - not using cookies', async () => {
    const query = {
      analytics: 'off',
      apm: 'off',
    };
    req.query = query;
    await controller.cookiePreferenceChanger(req, res);
    expect(res.cookie).not.toBeNull();
    expect(res.redirect).toHaveBeenCalled();
  });
});
