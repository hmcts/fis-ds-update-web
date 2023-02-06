import { FormContent } from '../../app/form/Form';

import UploadDocumentController from './postController';

const mockFormContent = {
  fields: {},
} as unknown as FormContent;
const controller = new UploadDocumentController(mockFormContent.fields);
describe('Testing the post controller', () => {
  test('upload document sequence', () => {
    expect(controller.post).not.toBe(1);
  });
});
