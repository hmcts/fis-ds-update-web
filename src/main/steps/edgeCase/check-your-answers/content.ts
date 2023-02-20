/* eslint-disable @typescript-eslint/no-explicit-any */
//import { isFieldFilledIn } from '../../../app/form/validation';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

import { UploadFormSummary } from './utils';

export const enContent = {
  serviceName: 'Check your answers ',
  title: 'Check your Answers',
  change: 'Edit',
  continue: 'Accept and continue',
  statementOfTruth: 'I beleive that the facts stated in this case are true.',
  submitApplicationText: 'Now submit your Application',
  listOfDocuments: 'List of documents uploaded',
  errorSummaryMessage: 'There is a problem',
  declarationText:
    'I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest beleif in its truth.',
  keys: {
    fileName: 'File name',
    description: 'Description',
  },
  errors: {
    submissionError: {
      content: 'Your application is not submitted. Please try again',
    },
  },
};

const en = (content: any) => {
  const caseDocuments = content['additionalData']!['req']['session']['caseDocuments'] || [];
  const caseInformation = content['additionalData']!['req']['session']['caseInformation'] || '';
  return {
    ...enContent,
    language: content.language,
    sections: [UploadFormSummary(enContent, caseDocuments, caseInformation)],
  };
};

const cyContent: typeof enContent = {
  serviceName: 'Check your answers - welsh',
  title: 'Check your Answers - welsh',
  change: 'Edit - welsh',
  statementOfTruth: 'I beleive that the facts stated in this case are true. - welsh',
  submitApplicationText: 'Now submit your Application - welsh',
  listOfDocuments: 'List of documents uploaded - welsh',
  continue: 'Accept and continue - welsh',
  errorSummaryMessage: 'There is a problem - welsh',
  declarationText:
    'I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest beleif in its truth. - welsh',
  keys: {
    fileName: 'File name - welsh',
    description: 'Description - welsh',
  },
  errors: {
    submissionError: {
      content: 'Your application is not submitted. Please try again - welsh',
    },
  },
};

const cy: typeof en = (content: CommonContent) => {
  const caseDocuments = content['additionalData']!['req']['session']['caseDocuments'] || [];
  const caseInformation = content['additionalData']!['req']['session']['caseInformation'] || '';
  return {
    ...cyContent,
    language: content.language,
    sections: [UploadFormSummary(enContent, caseDocuments, caseInformation)],
  };
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
