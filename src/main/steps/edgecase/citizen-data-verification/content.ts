/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
//import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
//import { isDateInputInvalid, isFieldFilledIn } from '../../../app/form/validation';

import { ANYTYPE } from './index';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: '[Child / Respondent] Details',
  fullname: 'Full name',
  dateOfBirth: 'Date of birth',
  errorSummaryMessage: 'There is a problem',
  ApplicantJoiningDate: 'Applicant Joining Date',
  question1: '[**widlcard**]',
  errors: {
    applicantCaseId: {
      required: 'Case Name is required',
    },
    caseNotFound: {
      required: 'Case not found',
    },
    dataNotMatched: {
      required:
        "some of the information yo have given doesn't match our records. Please enter the right value and retry",
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
      required:
        "some of the information yo have given doesn't match our records. Please enter the right value and retry - welsh",
    },
  },
});

const languages = {
  en,
  cy,
};

const DateFields = (fieldName, question, isVerified, answer?) => {
  if (isVerified) {
    const parsedDate = answer.split('-');
    const day = parsedDate[2];
    const month = parsedDate[1];
    const year = parsedDate[0];
    return {
      Field: {
        type: 'date',
        classes: 'govuk-date-input',
        labelSize: 'm',
        name: fieldName,
        label: question,
        values: [
          {
            label: l => l.dateFormat['day'],
            //label: l => l.day,
            name: 'day',
            value: day,
            classes: 'govuk-input--width-2',
            attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
          },
          {
            label: l => l.dateFormat['month'],
            //label: l => l.month,
            name: 'month',
            value: month,
            classes: 'govuk-input--width-2',
            attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
          },
          {
            label: l => l.dateFormat['year'],
            //label: l => l.year,
            name: 'year',
            value: year,
            classes: 'govuk-input--width-4',
            attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
          },
        ],
        //   validator: (value, formData) => (formData['DOB'] === '' ? isDateInputInvalid(value as CaseDate) : ''),
      },
    };
  } else {
    return {
      Field: {
        type: 'date',
        classes: 'govuk-date-input',
        labelSize: 'm',
        name: fieldName,
        label: question,
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
        //   validator: (value, formData) => (formData['DOB'] === '' ? isDateInputInvalid(value as CaseDate) : ''),
      },
    };
  }
};

const InputFields = (fieldName, question, isVerified, answer?) => {
  if (isVerified) {
    return {
      Field: {
        id: fieldName,
        name: fieldName,
        type: 'text',
        value: answer,
        label: question,
        classes: 'govuk-input--width-20',
        labelSize: 'm',
        //  validator: isFieldFilledIn,
      },
    };
  } else {
    return {
      Field: {
        id: fieldName,
        name: fieldName,
        type: 'text',
        label: question,
        classes: 'govuk-input--width-20',
        labelSize: 'm',
        //  validator: isFieldFilledIn,
      },
    };
  }
};
export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  const verificationData = content['additionalData']!['req']['session']['verificationData'];
  const isDataVerified = content['additionalData']!['req']['session']['isDataVerified'];

  const dssQuestionAnswerPairs = verificationData['dssQuestionAnswerPairs'];
  const dssQuestionAnswerDatePairs = verificationData['dssQuestionAnswerDatePairs'];
  const formFields: ANYTYPE = {};

  if (isDataVerified) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dssQuestionAnswerDatePairs.forEach((dssQuestionAnswer, index) => {
      formFields[`DateFields_${index}`] = DateFields(
        `question${index}`,
        dssQuestionAnswer['question'],
        true,
        dssQuestionAnswer['answer']
      ).Field;
    });
    dssQuestionAnswerPairs.forEach((dssQuestionAnswer, index) => {
      formFields[`InputFields_${index}`] = InputFields(
        `question${index}`,
        dssQuestionAnswer['question'],
        true,
        dssQuestionAnswer['answer']
      ).Field;
    });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dssQuestionAnswerDatePairs.forEach((dssQuestionAnswer, index) => {
      formFields[`DateFields_${index}`] = DateFields(`question${index}`, dssQuestionAnswer['question'], false).Field;
    });
    dssQuestionAnswerPairs.forEach((dssQuestionAnswer, index) => {
      formFields[`InputFields_${index}`] = InputFields(`question${index}`, dssQuestionAnswer['question'], false).Field;
    });
  }

  form['fields'] = { ...formFields } as ANYTYPE;
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
