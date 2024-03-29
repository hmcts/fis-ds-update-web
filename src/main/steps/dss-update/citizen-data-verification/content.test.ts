/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AnyType } from '../../../app/form/validation';

import { DateFields, InputFields, cy, en, generateContent } from './content';

const englishContent = () => ({
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
const welshContent = () => ({
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

describe('Matching Language content', () => {
  test('matching english content', () => {
    expect(en()).toEqual(englishContent());
  });

  test('matching welsh content', () => {
    expect(cy()).toEqual(welshContent());
  });
});

describe('Date field and Input Field', () => {
  test('matching output of DateField', () => {
    expect(DateFields('dateOfJoining', 'What is the joining date', true, '27-12-2020')).not.toBe({});
  });
  test('matching output of DateField - sad scenario(data toggled as false', () => {
    expect(DateFields('dateOfJoining', 'What is the joining date', false)).not.toBe({});
  });

  test('matching output of InputField', () => {
    expect(InputFields('dateOfJoining', 'What is the name', true, 'john Doe')).not.toBe({});
  });
  test('matching output of InputField - sad scenario(data toggled as false', () => {
    expect(InputFields('dateOfJoining', 'What is the joining date', false)).not.toBe({});
  });
});

//generateContent
describe('generateContent() function Test', () => {
  test('generateContent', () => {
    const content: AnyType = {
      language: 'en',
      additionalData: {
        req: {
          session: {
            verificationData: {
              dssQuestionAnswerPairs: [{ question: 'what is the name', answer: 'johndoe' }],
              dssQuestionAnswerDatePairs: [{ question: 'what is the DOB', answer: '27-10-1990' }],
            },
            isDataVerified: false,
          },
        },
      },
    };
    // const genCON: AnyType = generateContent;
    expect(generateContent(content)).not.toEqual({});
  });
});

//generateContent
describe('generateContent() with tempvalidation data', () => {
  test('generateContent', () => {
    const content: AnyType = {
      language: 'en',
      additionalData: {
        req: {
          session: {
            verificationData: {
              dssQuestionAnswerPairs: [{ question: 'what is the name', answer: 'johndoe' }],
              dssQuestionAnswerDatePairs: [{ question: 'what is the DOB', answer: '27-10-1990' }],
            },
            isDataVerified: false,
            tempValidationData: {
              dssQuestionAnswerPairs: [{ question: 'what is the name', answer: 's' }],
              dssQuestionAnswerDatePairs: [{ question: 'what is the DOB', answer: '27-10-1990' }],
            },
          },
        },
      },
    };
    // const genCON: AnyType = generateContent;
    expect(generateContent(content)).not.toEqual({});
  });
});

//generateContent
describe('generateContent() with no tempdata', () => {
  test('generateContent', () => {
    const content: AnyType = {
      language: 'en',
      additionalData: {
        req: {
          session: {
            verificationData: {
              dssQuestionAnswerPairs: [{ question: 'what is the name', answer: 'johndoe' }],
              dssQuestionAnswerDatePairs: [{ question: 'what is the DOB', answer: '27-10-1990' }],
            },
            isDataVerified: false,
            tempValidationData: {},
          },
        },
      },
    };
    // const genCON: AnyType = generateContent;
    expect(generateContent(content)).not.toEqual({});
  });
});
