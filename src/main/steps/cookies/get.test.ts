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

  test('should wait for 1 second before loading Check your answers screen', async () => {
    req.session.userCase.caseId = '1111';
    req.session.paymentError = false;
    await controller.get(req, res);
    const callback = jest.fn();
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(req.session.userCase.caseId).toEqual('1111');
  });
});
