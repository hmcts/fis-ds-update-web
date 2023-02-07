/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'There is a problem',
  line1: 'Some of the information you have given does not match what is stored in our records.',
  line2: 'You should select the back link and check the spellings, dates, and numbers are correct.',
  line3:
    'If this error comes up after you have checked all your details then there might be a problem with the information provided by the applicants. In that case you should contact the caseworker.',
  line4: 'Contact: Name of service, eg CTSC',
  line5: 'Telephone: Telephone number',
  line6: 'Email: Email address',
  line7: 'Monday to Friday, 9am to 5pm',
  errors: {
    applicantCaseId: {
      required: 'There is a problem. Please enter a case reference number',
    },
    caseNotFound: {
      required: 'Case not found',
    },
  },
});

export const cy = () => ({
  title: 'There is a problem',
  line1: 'Some of the information you have given does not match what is stored in our records.',
  line2: 'You should select the back link and check the spellings, dates, and numbers are correct.',
  line3:
    'If this error comes up after you have checked all your details then there might be a problem with the information provided by the applicants. In that case you should contact the caseworker.',
  line4: 'Contact: Name of service, eg CTSC',
  line5: 'Telephone: Telephone number',
  line6: 'Email: Email address',
  line7: 'Monday to Friday, 9am to 5pm',
  errors: {
    applicantCaseId: {
      required: 'There is a problem. Please enter a case reference number - welsh',
    },
    caseNotFound: {
      required: 'Case not found',
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
