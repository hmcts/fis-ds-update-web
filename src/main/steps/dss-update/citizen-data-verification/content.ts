/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { AnyType, isDateInputInvalid, isFieldFilledIn } from '../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'DSS Update Case',
  title: '[title]',
  errorSummaryMessage: 'There is a problem',
  errors: {
    dataNotMatched: {
      required:
        "Some of the information you have given doesn't match our records. Please enter the right value and retry.",
    },
    isEmptyFields: {
      required: 'Some of the form fields are empty. Please enter the values and retry.',
    },
    inputFields: {
      notAlphaNumeric: 'Some of the form fields have a invalid character. Please enter letters and numbers only.',
    },
  },
});

export const cy = () => ({
  serviceName: 'DSS Update Case',
  title: '[title]',
  errorSummaryMessage: 'There is a problem',
  errors: {
    dataNotMatched: {
      required: 'Some of the form fields are empty. Please enter the values and retry - welsh',
    },
    isEmptyFields: {
      required: 'Some of the form fields are empty. Please enter the values and retry.',
    },
    inputFields: {
      notAlphaNumeric:
        'Some of the form fields have a invalid character. Please enter letters and numbers only. - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const DateFields = (fieldName, question, isVerified, answer?) => {
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
            name: 'day',
            value: day,
            classes: 'govuk-input--width-2',
            attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
          },
          {
            label: l => l.dateFormat['month'],
            name: 'month',
            value: month,
            classes: 'govuk-input--width-2',
            attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
          },
          {
            label: l => l.dateFormat['year'],
            name: 'year',
            value: year,
            classes: 'govuk-input--width-4',
            attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
          },
        ],
        validator: (value, formData) => (formData['DOB'] === '' ? isDateInputInvalid(value as CaseDate) : ''),
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
        validator: (value, formData) => (formData['DOB'] === '' ? isDateInputInvalid(value as CaseDate) : ''),
      },
    };
  }
};

export const InputFields = (fieldName, question, isVerified, answer?) => {
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
        validator: isFieldFilledIn,
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
        validator: isFieldFilledIn,
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
  const formFields: AnyType = {};

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
      if (dssQuestionAnswer['question'] !== null) {
        formFields[`InputFields_${index}`] = InputFields(
          `question${index}`,
          dssQuestionAnswer['question'],
          true,
          dssQuestionAnswer['answer']
        ).Field;
      }
    });
  } else {
    const temp_verificationData = content['additionalData']!['req']['session'].hasOwnProperty('tempValidationData');
    if (!temp_verificationData) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      dssQuestionAnswerDatePairs.forEach((dssQuestionAnswer, index) => {
        formFields[`DateFields_${index}`] = DateFields(`question${index}`, dssQuestionAnswer['question'], false).Field;
      });
      dssQuestionAnswerPairs.forEach((dssQuestionAnswer, index) => {
        if (dssQuestionAnswer['question'] !== null) {
          formFields[`InputFields_${index}`] = InputFields(
            `question${index}`,
            dssQuestionAnswer['question'],
            false
          ).Field;
        }
      });
    } else {
      if (Object.entries(content['additionalData']!['req']['session']?.['tempValidationData']).length === 0) {
        dssQuestionAnswerDatePairs.forEach((dssQuestionAnswer, index) => {
          formFields[`DateFields_${index}`] = DateFields(
            `question${index}`,
            dssQuestionAnswer['question'],
            false
          ).Field;
        });
        dssQuestionAnswerPairs.forEach((dssQuestionAnswer, index) => {
          if (dssQuestionAnswer['question'] !== null) {
            formFields[`InputFields_${index}`] = InputFields(
              `question${index}`,
              dssQuestionAnswer['question'],
              false
            ).Field;
          }
        });
      } else {
        const tempdata = content['additionalData']!['req']['session']['tempValidationData'];
        const temp_dssQuestionAnswerPairs = tempdata['dssQuestionAnswerPairs'];
        const temp_dssQuestionAnswerDatePairs = tempdata['dssQuestionAnswerDatePairs'];
        temp_dssQuestionAnswerDatePairs.forEach((dssQuestionAnswer, index) => {
          formFields[`DateFields_${index}`] = DateFields(
            `question${index}`,
            dssQuestionAnswer['question'],
            true,
            dssQuestionAnswer['answer']
          ).Field;
        });
        temp_dssQuestionAnswerPairs.forEach((dssQuestionAnswer, index) => {
          formFields[`InputFields_${index}`] = InputFields(
            `question${index}`,
            dssQuestionAnswer['question'],
            true,
            dssQuestionAnswer['answer']
          ).Field;
        });
      }
    }
  }

  form['fields'] = { ...formFields } as AnyType;
  const translations = languages[content.language]();
  const headerContent = content['additionalData']!['req']['session']['verificationData']['dssHeaderDetails'];
  translations.title = headerContent === null ? translations.title : headerContent;
  return {
    ...translations,
    form,
  };
};
