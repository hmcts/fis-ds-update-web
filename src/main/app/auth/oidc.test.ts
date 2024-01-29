import axios, { AxiosRequestHeaders, AxiosResponse, AxiosStatic } from 'axios';

import { OidcResponse, getSystemUser, UserDetails } from './oidc';

const config = require('config');

jest.mock('axios');
jest.mock('config');

const mockedConfig = config as jest.Mocked<typeof config>;
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

describe('getSystemUser', () => {
  const getSystemUserTestToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZ2l2ZW5fbmFtZSI6IkpvaG4iLCJmYW1pbHlfbmFtZSI6IkRvcmlhbiIsInVpZCI6IjEyMyIsInJvbGVzIjpbImNhc2V3b3JrZXItZGl2b3JjZS1zeXN0ZW11cGRhdGUiLCJjYXNld29ya2VyLWNhYSIsImNhc2V3b3JrZXIiLCJjYXNld29ya2VyLWRpdm9yY2UiXX0.NDab3XAV8NWQTuuxBQ9mpwTIdw4KMWWiJ37Dp3EHG7s';

  const accessTokenResponse: AxiosResponse<OidcResponse> = {
    status: 200,
    data: {
      id_token: getSystemUserTestToken,
      access_token: getSystemUserTestToken,
    },
    statusText: 'wsssw',
    headers: { test: 'now' },
    config: { headers: [] as unknown as AxiosRequestHeaders },
  };

  const expectedGetSystemUserResponse: UserDetails = {
    accessToken: getSystemUserTestToken,
    email: 'test@test.com',
    givenName: 'John',
    familyName: 'Dorian',
    id: '123',
    roles: ['caseworker-divorce-systemupdate', 'caseworker-caa', 'caseworker', 'caseworker-divorce'],
  };

  test('Cache enabled', async () => {
    mockedConfig.get.mockReturnValueOnce('user');
    mockedConfig.get.mockReturnValueOnce('password');
    mockedConfig.get.mockReturnValueOnce('true');
    mockedAxios.post.mockResolvedValue(accessTokenResponse);

    const result = await getSystemUser();
    expect(result).toStrictEqual(expectedGetSystemUserResponse);
  });

  test('Cache disabled', async () => {
    mockedConfig.get.mockReturnValueOnce('user');
    mockedConfig.get.mockReturnValueOnce('password');
    mockedConfig.get.mockReturnValue('false');
    mockedConfig.get.mockReturnValue('clientID');
    mockedConfig.get.mockReturnValue('clientSecret');
    mockedConfig.get.mockReturnValueOnce('https://idam-web-public.aat.platform.hmcts.net/loginwddwdw');
    mockedAxios.post.mockResolvedValue(accessTokenResponse);

    const result = await getSystemUser();
    expect(result).toStrictEqual(expectedGetSystemUserResponse);
  });
});
