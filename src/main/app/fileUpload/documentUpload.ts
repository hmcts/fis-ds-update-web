import https from 'https';

import axios from 'axios';
import config from 'config';

export enum DOCUMENT_MANAGEMENT_CONFIGURATIONS {
  UPLOAD_URL = '/doc/dss-orhestration/dss/upload',
  REMOVE_URL = '/doc/dss-orhestration/{documentId}/delete',
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const documentManagementInstance = () => {
  return axios.create({
    baseURL: config.get('api.cos'),
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const uploadDocument = async (formData, caseTypeOfApplication, s2sToken) => {
  const doucmentUploadendpoint =
    DOCUMENT_MANAGEMENT_CONFIGURATIONS.UPLOAD_URL + `?caseTypeOfApplication=${caseTypeOfApplication}`;
  const formHeaders = formData.getHeaders();
  const axiosHeaders = {
    ServiceAuthorization: `Bearer ${s2sToken}`,
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  };
  const serverResponse = await documentManagementInstance().post(doucmentUploadendpoint, formData, {
    headers: {
      ...formHeaders,
      ...axiosHeaders,
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  });
  return serverResponse;
};
