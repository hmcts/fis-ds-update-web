import axios, { AxiosInstance } from 'axios';
import config from 'config';

import { AnyType } from '../form/validation';

import { RpeApi } from './rpeAuth';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const response = { id: '200', state: 'SUCCESS' };
const mockGet = jest.fn().mockResolvedValueOnce({ data: {} });
mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);

describe('RpeApi - Service to Service Authentications', () => {
  test('comparing baseURL', async () => {
    expect(RpeApi._BASEURL).toBe(config.get('api.serviceAuth'));
  });

  test('RpeApi Adatptor should be an axios Instance', async () => {
    expect(RpeApi.rpeAdaptor()).not.toBe(null);
  });

  test('RpeApi Adatptor should be an axios Instance - token', async () => {
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<AnyType>);
    expect(await (await RpeApi.getRpeToken()).data).not.toEqual({});
  });
});
