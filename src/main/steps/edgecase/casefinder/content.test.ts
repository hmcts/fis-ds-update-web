/* eslint-disable @typescript-eslint/no-unused-vars */
import { cy, en } from './content';

const enContent = {
  title: 'Existing case details',
  subtitle: 'Case reference number',
  caseNameHint: 'This number will be 16 digits long',
  errorSummaryMessage: 'There is a problem',
  errors: {
    applicantCaseId: {
      required: 'There is a problem. Please enter a case reference number',
    },
    caseNotFound: {
      required:
        "Some of the information yo have given doesn't match our records. Please enter the right value and retry",
    },
  },
};

const cyContent = {
  title: 'Existing case details - welsh',
  subtitle: 'Case reference number - welsh',
  caseNameHint: 'This number will be 16 digits long - welsh',
  errorSummaryMessage: 'There is a problem',
  errors: {
    applicantCaseId: {
      required: 'There is a problem. Please enter a case reference number - welsh',
    },
    caseNotFound: {
      required:
        "Some of the information yo have given doesn't match our records. Please enter the right value and retry - welsh",
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
