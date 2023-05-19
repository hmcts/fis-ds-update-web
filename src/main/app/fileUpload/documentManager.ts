//import https from 'https';

import axios from 'axios';
import config from 'config';

export enum DOCUMENT_MANAGEMENT_CONFIGURATIONS {
  UPLOAD_URL = '/doc/dss-orhestration/upload-for-dss-update',
  REMOVE_URL = '/doc/dss-orhestration/{documentId}/delete',
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const uploadDocument = async (formData, s2sToken) => {
  const baseURL = config.get('api.cos') + DOCUMENT_MANAGEMENT_CONFIGURATIONS.UPLOAD_URL;
  const response = await axios.post(baseURL, formData, {
    headers: {
      ServiceAuthorization: `Bearer ${s2sToken}`,
      ...formData.getHeaders(),
    },
    // httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  return response;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const deleteDocument = async (s2sToken, documentID) => {
  const doucmentRemovalendpoint =
    config.get('api.cos') + DOCUMENT_MANAGEMENT_CONFIGURATIONS.REMOVE_URL.split('{documentId}').join(documentID);
  const response = await axios.delete(doucmentRemovalendpoint, {
    headers: {
      ServiceAuthorization: `Bearer ${s2sToken}`,
    },
    data: {},
    // httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  });
  return response;
};
