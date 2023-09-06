/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.33.956 on 2021-11-12 15:28:24.

export interface CaseLink {
  CaseReference: string;
}

export interface Document {
  document_url: string;
  document_filename: string;
  document_binary_url: string;
}

export interface DocumentInfo {
  url: string;
  filename: string;
  binaryUrl: string;
}

export interface C100DocumentInfo extends DocumentInfo {
  id: string;
}

export const YesOrNo = {
  YES: 'Yes',
  NO: 'No',
};
