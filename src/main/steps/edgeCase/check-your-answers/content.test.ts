import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  serviceName: 'Check your answers ',
  title: 'Check your Answers',
  change: 'Edit',
  continue: 'Accept and continue',
  statementOfTruth: 'I beleive that the facts stated in this case are true.',
  submitApplicationText: 'Now submit your Application',
  listOfDocuments: 'List of documents uploaded',
  errorSummaryMessage: 'There is a problem',
  declarationText:
    'I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest beleif in its truth.',
  keys: {
    fileName: 'File name',
    description: 'Description',
  },
  errors: {
    submissionError: {
      content: 'Your application is not submitted. Please try again',
    },
  },
};

const cyContent = {
  serviceName: 'Check your answers - welsh',
  title: 'Check your Answers - welsh',
  change: 'Edit - welsh',
  statementOfTruth: 'I beleive that the facts stated in this case are true. - welsh',
  submitApplicationText: 'Now submit your Application - welsh',
  listOfDocuments: 'List of documents uploaded - welsh',
  continue: 'Accept and continue - welsh',
  errorSummaryMessage: 'There is a problem - welsh',
  declarationText:
    'I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest beleif in its truth. - welsh',
  keys: {
    fileName: 'File name - welsh',
    description: 'Description - welsh',
  },
  errors: {
    submissionError: {
      content: 'Your application is not submitted. Please try again - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('check-your-answer > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        session: {
          caseDocuments: [{ documentId: 'abc' }, { documentId: 'ubc' }],
        },
      },
    },
  } as unknown as CommonContent;

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('en', cyContent, () =>
      generateContent({
        ...commonContent,
        language: 'cy',
      })
    );
  });
  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit!.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
