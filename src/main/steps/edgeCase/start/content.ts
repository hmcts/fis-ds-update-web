/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Update a case',
  paragraph1: 'Use this service to update a case that has already been submitted',
  paragraph2: 'you can upload additional evidences to the case',
  paragraph3: 'You will need the case reference number to start',
});

export const cy = () => ({
  title: 'Update a case - welsh',
  paragraph1: 'Use this service to update a case that has already been submitted - welsh',
  paragraph2: 'you can upload additional evidences to the case - welsh',
  paragraph3: 'You will need the case reference number to start - welsh',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  startNow: {
    text: l => l.startNow,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
