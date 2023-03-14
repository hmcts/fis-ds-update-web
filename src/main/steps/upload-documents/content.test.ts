import { cy, en, form, generateContent } from './content';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const englishContent = () => ({
  title: 'Upload documents',
  paragraph1:
    'You can upload additional documents, files or other evidence to support your case. You can also add information below that is relevant to the case.',
  uploadedDocumentsSubTitle: 'Uploaded documents can include:',
  uploadDocumentsBullets: [
    'copies of any relevant correspondence or documentation',
    'written statements',
    'related reports',
  ],
  caseRelevancySubTitle: 'For each document uploaded you must state why it is relevant to the case.',
  fileUploadRequirementsLabel: 'File upload requirements',
  uploadHelpBullets: [
    'File formats: MS Word, MS Excel, PDF, JPG, PNG, TXT, RTF',
    'File size per document: up to 20 megabytes (MB)',
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
      noDocumentUploaded: 'Please choose a file.',
      fileSize: `The file you uploaded is too large.
              Maximum file size allowed is 20MB`,
      multimediaFileSize: 'The file you uploaded is too large. Maximum file size allowed is 500MB for multimedia files',
      fileFormat: `The file you uploaded is in the wrong format.
              Upload your file again in the correct format`,
      selectFileToUpload: 'Select a file to upload',
      uploadError: 'The selected file could not be uploaded – try again',
      maxFileError: 'You can only select up to 10 files at the same time',
      fileDescriptionRequired: 'Enter a description for the file selected for upload',
    },
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const welshContent = () => ({
  title: 'Upload documents - welsh',
  paragraph1:
    'You can upload additional documents, files or other evidence to support your case. You can also add information below that is relevant to the case. - welsh',
  uploadedDocumentsSubTitle: 'Uploaded documents can include: - welsh',
  uploadDocumentsBullets: [
    'copies of any relevant correspondence or documentation - welsh',
    'written statements - welsh',
    'related reports - welsh',
  ],
  caseRelevancySubTitle: 'For each document uploaded you must state why it is relevant to the case. - welsh',
  fileUploadRequirementsLabel: 'File upload requirements - welsh',
  uploadHelpBullets: [
    'File formats: MS Word, MS Excel, PDF, JPG, PNG, TXT, RTF - welsh',
    'File size per document: up to 20 megabytes (MB) - welsh',
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
      noDocumentUploaded: 'Please choose a file. - welsh',
      fileSize: `The file you uploaded is too large.
              Maximum file size allowed is 20MB - welsh`,
      multimediaFileSize:
        'The file you uploaded is too large. Maximum file size allowed is 500MB for multimedia files - welsh',
      fileFormat: `The file you uploaded is in the wrong format.
              Upload your file again in the correct format - welsh`,
      selectFileToUpload: 'Select a file to upload - welsh',
      uploadError: 'The selected file could not be uploaded – try again - welsh',
      maxFileError: 'You can only select up to 10 files at the same time - welsh',
      fileDescriptionRequired: 'Enter a description for the file selected for upload - welsh',
    },
  },
});

describe('Date field and Input Field', () => {
  test('matching English contents', () => {
    expect(Object.values(en()).toString()).toEqual(Object.values(englishContent()).toString());
    expect(Object.keys(en()).toString()).toEqual(Object.keys(englishContent()).toString());
  });
  test('matching Welsh contents', () => {
    expect(Object.values(cy()).toString()).toEqual(Object.values(welshContent()).toString());
    expect(Object.keys(cy()).toString()).toEqual(Object.keys(welshContent()).toString());
  });

  test('form of the document upload', () => {
    expect(form.fields['documentUpload']['type']).toBe('hidden');
  });
});

describe('generateContent() function Test', () => {
  test('generateContent', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any = {
      language: 'en',
      additionalData: {
        req: {
          session: {},
        },
      },
    };
    // const genCON: ANYTYPE = generateContent;
    expect(generateContent(content)).not.toEqual({});
    expect(generateContent(content).form).toBe(form);
  });
});
