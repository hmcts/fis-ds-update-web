import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Update a case',
  paragraph1: 'Use this service to update a case that has already been submitted.',
  paragraph2: 'You can upload additional evidences and documents.',
  paragraph3: 'You will need the case reference number to start.',
};

const cy = {
  title: 'Update a case - welsh',
  paragraph1: 'Use this service to update a case that has already been submitted. - welsh',
  paragraph2: 'You can upload additional evidences and documents. - welsh',
  paragraph3: 'You will need the case reference number to start. - welsh',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('application start page', () => {
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
