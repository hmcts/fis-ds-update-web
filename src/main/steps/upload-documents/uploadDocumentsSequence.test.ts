import { uploadDocumentsSequence } from './uploadDocumentsSequence';

describe('Testing the sequence for uploading documents', () => {
  test('upload document sequence', () => {
    expect(uploadDocumentsSequence[0].url).toBe('/upload-documents');
    expect(uploadDocumentsSequence[0].showInSection).toBe('upload-documents');
    expect(uploadDocumentsSequence[0].getNextStep).not.toBe(() => '');
  });
});
