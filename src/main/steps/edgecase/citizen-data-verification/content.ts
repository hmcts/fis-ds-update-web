/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isDateInputInvalid, isFieldFilledIn } from '../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: '[Child / Respondent] Details',
  fullname: 'Full name',
  dateOfBirth: 'Date of birth',
  errorSummaryMessage: 'There is a problem',
  errors: {
    applicantCaseId: {
      required: 'Case Name is required',
    },
    caseNotFound: {
      required: 'Case not found',
    },
    dataNotMatched: {
      required: 'Data provided does not match',
    },
  },
});

export const cy = () => ({
  title: '[Child / Respondent] Details - welsh',
  fullname: 'Full name - welsh',
  dateOfBirth: 'Date of birth - welsh',
  errorSummaryMessage: 'There is a problem',
  dataNotMatched: 'Data provided doesnt match',
  errors: {
    applicantCaseId: {
      required: 'Case Name is required - welsh',
    },
    caseNotFound: {
      required: 'Case not found',
    },
    dataNotMatched: {
      required: 'Data provided does not match',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicantName: {
      id: 'applicantName',
      name: 'applicantName',
      type: 'text',
      label: d => d.fullname,
      classes: 'govuk-input--width-20',
      labelSize: 'm',
      validator: isFieldFilledIn,
    },
    dateOfBirth: {
      type: 'date',
      classes: 'govuk-date-input',
      labelSize: 'm',
      name: 'dob',
      label: l => l.dateOfBirth,
      values: [
        {
          label: l => l.dateFormat['day'],
          //label: l => l.day,
          name: 'day',
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['month'],
          //label: l => l.month,
          name: 'month',
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['year'],
          //label: l => l.year,
          name: 'year',
          classes: 'govuk-input--width-4',
          attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
        },
      ],
      validator: (value, formData) => (formData['DOB'] === '' ? isDateInputInvalid(value as CaseDate) : ''),
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
