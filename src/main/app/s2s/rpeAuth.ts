/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';

export class RpeApi {
  private static _BASEURL: string = config.get('api.serviceAuth');

  private static rpeAdaptor = (): AxiosInstance => {
    return axios.create({
      baseURL: RpeApi._BASEURL,
    });
  };

  public static async getRpeToken() {
    try {
      const Response: AxiosResponse = await RpeApi.rpeAdaptor().post('/testing-support/lease', {
        microservice: config.get('s2s.microservice'),
      });
      return { response: true, data: Response.data };
    } catch (error) {
      return { response: false, data: error };
    }
  }
}
