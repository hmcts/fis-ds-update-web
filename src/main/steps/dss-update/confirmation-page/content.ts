import { TranslationFn } from '../../../app/controller/GetController';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  successMessage: 'Case updated',
  subContent:
    'Thank you for updating your case. The information will now be sent to the court for review. They will be in touch if they need any additional information from you.',
});

const cy = () => ({
  successMessage: 'Case updated - welsh',
  subContent:
    'Thank you for updating your case. The information will now be sent to the court for review. They will be in touch if they need any additional information from you. - welsh',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
  };
};
