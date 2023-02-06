/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Existing case details',
  subtitle: 'Case reference number',
  caseNameHint: 'This number will be 16 digits long',

  errors: {
    applicantCaseName: {
      required: 'Case Name is required',
      invalid: 'Please enter a valid case name to proceed',
    },
  },
});

export const cy = () => ({
  title: 'Existing case details - welsh',
  subtitle: 'Case reference number - welsh',
  caseNameHint: 'This number will be 16 digits long - welsh',

  errors: {
    applicantCaseName: {
      required: 'Case Name is required - welsh',
      invalid: 'Please enter a valid case name to proceed - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    subheadings: {
      id: 'subHeading',
      type: 'textAndHtml',
      textAndHtml: l => l.subheadings,
    },
    applicantCaseName: {
      id: 'applicantCaseName',
      type: 'text',
      classes: 'govuk-input--width-20',
      hint: hint => hint.caseNameHint,
      labelSize: null,
      validator: atLeastOneFieldIsChecked,
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
