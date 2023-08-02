/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
//import { isFieldFilledIn } from '../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'DSS Update Case',
  title: 'Existing case details',
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
});

export const cy = () => ({
  serviceName: 'DSS Update Case',
  title: 'Existing case details - welsh',
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
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
