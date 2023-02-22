/* eslint-disable import/order */
import { Sections, Step } from '../constants';
import { UPLOAD_DOCUMENT } from '../urls';

export const uploadDocumentsSequence: Step[] = [
  {
    url: UPLOAD_DOCUMENT,
    showInSection: Sections.uploadDocuments,
    getNextStep: () => UPLOAD_DOCUMENT,
  },
];
