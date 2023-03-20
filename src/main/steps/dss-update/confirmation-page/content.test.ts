import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  successMessage: 'Case updated',
  subContent:
    'Thank you for updating your case. The information will now be sent to the court for review. They will be in touch if they need any additional information from you.',
};

const cy = {
  successMessage: 'Case updated - welsh',
  subContent:
    'Thank you for updating your case. The information will now be sent to the court for review. They will be in touch if they need any additional information from you. - welsh',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('application confirmation', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
