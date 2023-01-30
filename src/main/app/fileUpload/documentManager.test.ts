import axios, { AxiosInstance } from 'axios';
import FormData from 'form-data';

import { DOCUMENT_MANAGEMENT_CONFIGURATIONS, deleteDocument, uploadDocument } from './documentManager';
describe('Test URL endpoints', () => {
  test('should match the document upload url', () => {
    expect(DOCUMENT_MANAGEMENT_CONFIGURATIONS.UPLOAD_URL).toBe('/doc/dss-orhestration/dss/upload');
  });
  test('should match the document remove url', () => {
    expect(DOCUMENT_MANAGEMENT_CONFIGURATIONS.REMOVE_URL).toBe('/doc/dss-orhestration/dss/{documentId}/delete');
  });
});
jest.mock('axios');
type uploadedDocument = {
  data: string;
};
const mockedAxios = axios as jest.Mocked<typeof axios>;
const response = { id: '200', state: 'SUCCESS' };
const mockGet = jest.fn().mockResolvedValueOnce({ data: {} });
mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);

describe('Test case for document upload', () => {
  const formData = new FormData();
  test('should upload document', async () => {
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<uploadedDocument>);
    expect(await (await uploadDocument(formData, 'dummyToken')).data).toEqual({ id: '200', state: 'SUCCESS' });
  });
});

describe('Test case for document removals', () => {
  test('should remove document', async () => {
    mockedAxios.post.mockReturnValueOnce({ data: {} } as unknown as Promise<uploadedDocument>);
    expect(await deleteDocument('dummyToken', 'documentId')).not.toBe(200);
  });
});
