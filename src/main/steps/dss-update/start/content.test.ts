import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  serviceName: 'DSS Update Case',
  title: 'Update an existing First-tier Tribunal case',
  paragraph1: 'Use this service to update a case that has already been submitted to the First-tier Tribunal.',
  paragraph2:
    'You may want to send the Tribunal some extra paperwork that was not available at the time you initially submitted your tribunal form. Or you may want to give the Tribunal some extra details about aspects of your case.',
  paragraph3: 'To update an existing case, you will need the case reference number.',
};

const cy = {
  serviceName: 'DSS Update Case',
  title: 'Update an existing First-tier Tribunal case - welsh',
  paragraph1: 'Use this service to update a case that has already been submitted to the First-tier Tribunal. - welsh',
  paragraph2:
    'You may want to send the Tribunal some extra paperwork that was not available at the time you initially submitted your tribunal form. Or you may want to give the Tribunal some extra details about aspects of your case. - welsh',
  paragraph3: 'To update an existing case, you will need the case reference number. - welsh',
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
