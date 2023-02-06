/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Existing case details',
  subtitle: 'Case reference number',
  caseNameHint: 'This number will be 16 digits long',
  errorSummaryMessage: 'There is a problem',
  errors: {
    applicantCaseId: {
      required: 'Case Name is required',
    },
    caseNotFound: {
      required: 'Case not found',
    },
  },
});

export const cy = () => ({
  title: 'Existing case details - welsh',
  subtitle: 'Case reference number - welsh',
  caseNameHint: 'This number will be 16 digits long - welsh',
  errorSummaryMessage: 'There is a problem',
  errors: {
    applicantCaseId: {
      required: 'Case Name is required - welsh',
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
  fields: {
    applicantCaseId: {
      id: 'applicantCaseId',
      name: 'applicantCaseId',
      type: 'text',
      classes: 'govuk-input--width-20',
      hint: hint => hint.caseNameHint,
      labelSize: null,
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
