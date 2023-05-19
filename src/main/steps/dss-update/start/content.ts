/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'DSS Update Case',
  title: 'Update a case',
  paragraph1: 'Use this service to update a case that has already been submitted.',
  paragraph2: 'You can upload additional evidences and documents.',
  paragraph3: 'You will need the case reference number to start.',
});

export const cy = () => ({
  serviceName: 'DSS Update Case',
  title: 'Update a case - welsh',
  paragraph1: 'Use this service to update a case that has already been submitted. - welsh',
  paragraph2: 'You can upload additional evidences and documents. - welsh',
  paragraph3: 'You will need the case reference number to start. - welsh',
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
