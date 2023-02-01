/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Upload documents',
  paragraph1:
    'You can upload additional documents, files or other evidence to support your case. You can also add information below that is relevant to the case.',
  uploadedDocumentsSubTitle: 'Uploaded documents can include:',
  uploadDocumentsBullets: [
    'copies of any relevant correspondence or documentation',
    'audio or video recordings',
    'written statements',
    'related reports',
  ],
  caseRelevancySubTitle: 'For each document uploaded you must state why it is relevant to the case.',
  fileUploadRequirementsLabel: 'File upload requirements',
  uploadHelpBullets: [
    'File formats: MS Word, MS Excel, PDF, JPG, PNG, TXT, RTF',
    'File size per document: up to 20 megabytes (MB)',
    'File size per multimedia file: 500 megabytes (MB)',
    'Files cannot be password protected',
  ],
  guideText:
    'You cannot upload executable (.exe) or zip files because of virus risks. If you delete an uploaded file, you also delete the file description.',
  titleForFile: 'Select documents to upload',
  uploadButton: 'Upload file',
  documentListLabel:
    'List the description of each document uploaded on separate lines. For example, "1. Witness statement requested by the d2"',
  delete: 'Delete',
  documentInLanguage: 'Document',
  fileuploaded: 'Files uploaded',
  errorSummaryMessage: 'There is a problem',
  uploadAFile: 'Upload a file',
  errors: {
    documentUpload: {
      required: 'Please choose a file.',
      fileSize: `The file you uploaded is too large.
            Maximum file size allowed is 20MB`,
      fileFormat: `The file you uploaded is in the wrong format.
            Upload your file again in the correct format`,
      selectFileToUpload: 'Select a file to upload',
      uploadError: 'The selected file could not be uploaded – try again',
      maxFileError: 'You can only select up to 10 files at the same time',
      fileDescriptionRequired: 'Enter a description for the file selected for upload',
    },
  },
});

export const cy = () => ({
  title: 'Upload documents - welsh',
  paragraph1:
    'You can upload additional documents, files or other evidence to support your case. You can also add information below that is relevant to the case. - welsh',
  uploadedDocumentsSubTitle: 'Uploaded documents can include: - welsh',
  uploadDocumentsBullets: [
    'copies of any relevant correspondence or documentation - welsh',
    'audio or video recordings - welsh',
    'written statements - welsh',
    'related reports - welsh',
  ],
  caseRelevancySubTitle: 'For each document uploaded you must state why it is relevant to the case. - welsh',
  fileUploadRequirementsLabel: 'File upload requirements - welsh',
  uploadHelpBullets: [
    'File formats: MS Word, MS Excel, PDF, JPG, PNG, TXT, RTF - welsh',
    'File size per document: up to 20 megabytes (MB) - welsh',
    'File size per multimedia file: 500 megabytes (MB) - welsh',
    'Files cannot be password protected - welsh',
  ],
  guideText:
    'You cannot upload executable (.exe) or zip files because of virus risks. If you delete an uploaded file, you also delete the file description. - welsh',
  titleForFile: 'Select documents to upload - welsh',
  uploadButton: 'Upload file - welsh',
  documentListLabel:
    'List the description of each document uploaded on separate lines. For example, "1. Witness statement requested by the d2 - welsh"',
  delete: 'Delete - welsh',
  documentInLanguage: 'Document - welsh',
  fileuploaded: 'Files uploaded - welsh',
  errorSummaryMessage: 'There is a problem - welsh',
  uploadAFile: 'Upload a file - welsh',
  errors: {
    documentUpload: {
      required: 'Please choose a file. - welsh',
      fileSize: `The file you uploaded is too large.
            Maximum file size allowed is 20MB - welsh`,
      fileFormat: `The file you uploaded is in the wrong format.
            Upload your file again in the correct format - welsh`,
      selectFileToUpload: 'Select a file to upload - welsh',
      uploadError: 'The selected file could not be uploaded – try again - welsh',
      maxFileError: 'You can only select up to 10 files at the same time - welsh',
      fileDescriptionRequired: 'Enter a description for the file selected for upload - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    documentUpload: {
      type: 'hidden',
      label: l => l.uploadFiles,
      labelHidden: true,
      value: 'true',
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
