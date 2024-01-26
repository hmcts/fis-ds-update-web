/* eslint-disable @typescript-eslint/no-unused-vars */
import { cy, en } from './content';

const enContent = {
  serviceName: 'DSS Update Case',
  title: 'Existing case details',
  whereToFindInfoHint: 'You can find this information in the email you received after submitting your tribunal forms.',
  subtitle: 'Case reference number',
  caseNameHint: 'This number will be 16 digits long.',
  errorSummaryMessage: 'There is a problem',
  errors: {
    applicantCaseId: {
      required: 'There is a problem. Please enter a case reference number',
      notNumeric: 'There is a problem. Please enter numeric case reference number of upto 16 digits',
    },
    caseNotFound: {
      required:
        "Some of the information you have given doesn't match our records. Please enter the right value and retry.",
    },
  },
};

const cyContent = {
  serviceName: 'DSS Update Case',
  title: 'Existing case details - welsh',
  whereToFindInfoHint: 'You can find this information in the email you received after submitting your tribunal forms. - welsh',
  subtitle: 'Case reference number - welsh',
  caseNameHint: 'This number will be 16 digits long - welsh.',
  errorSummaryMessage: 'There is a problem',
  errors: {
    applicantCaseId: {
      required: 'There is a problem. Please enter a case reference number - welsh',
      notNumeric: 'There is a problem. Please enter numeric case reference number of upto 16 digits - welsh',
    },
    caseNotFound: {
      required:
        "Some of the information you have given doesn't match our records. Please enter the right value and retry - welsh",
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('match respective translations', () => {
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    expect(en()).toEqual(enContent);
  });

  test('should return correct welsh content', () => {
    expect(cy()).toEqual(cyContent);
  });
});
