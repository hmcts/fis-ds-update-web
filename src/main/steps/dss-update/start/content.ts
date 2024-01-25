/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'DSS Update Case',
  title: 'Update an existing First-tier Tribunal case',
  paragraph1: 'Use this service to update a case that has already been submitted to the First-tier Tribunal.',
  paragraph2:
    'You may want to send the Tribunal some extra paperwork that was not available at the time you initially submitted your tribunal form. Or you may want to give the Tribunal some extra details about aspects of your case.',
  paragraph3: 'To update an existing case, you will need the case reference number.',
});

export const cy = () => ({
  serviceName: 'DSS Update Case',
  title: 'Update an existing First-tier Tribunal case - welsh',
  paragraph1: 'Use this service to update a case that has already been submitted to the First-tier Tribunal. - welsh',
  paragraph2:
    'You may want to send the Tribunal some extra paperwork that was not available at the time you initially submitted your tribunal form. Or you may want to give the Tribunal some extra details about aspects of your case. - welsh',
  paragraph3: 'To update an existing case, you will need the case reference number. - welsh',
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
