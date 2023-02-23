import { enContent } from './content';
import { UploadFormSummary } from './utils';

describe('Form Summary > check-your-answers', () => {
  describe('UploadFormSummary', () => {
    test.each([
      {
        userCase: [{ fileName: 'a.txt', description: 'testFile' }],
        expected: {
          rows: [
            {
              actions: {
                items: [
                  {
                    href: '/upload-documents',
                    text: 'Edit',
                    visuallyHiddenText: 'Information',
                  },
                ],
              },
              key: {
                text: 'Information',
              },
              value: {
                text: 'test',
              },
            },
            {
              actions: {
                items: [
                  {
                    href: '/upload-documents',
                    text: 'Edit',
                    visuallyHiddenText: 'undefined',
                  },
                ],
              },
              key: {
                html: 'File name<br><br>Description',
              },
              value: {
                html: 'a.txt<br><br>testFile',
              },
            },
          ],
          title: 'List of documents uploaded ',
        },
      },
    ])('return correct summary list items', ({ userCase, expected }) => {
      expect(UploadFormSummary(enContent, userCase, 'test')).toEqual(expected);
    });
  });
});
