import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { FormContent } from '../../../app/form/Form';

import citizenDataVerification from './postController';

jest.mock('axios');
let req, res;

describe('citizenDataVerification test cases', () => {
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should submit the case and navigate to confirmation page', async () => {
    const controller = new citizenDataVerification(mockFormContent.fields);
    req = mockRequest({
      body: {
        saveAndContinue: true,
        'DateFields_0-day': '01',
        'DateFields_0-month': '01',
        'DateFields_0-year': '2020',
        InputFields_0: 'childfirstname',
        InputFields_1: 'childlastname',
      },
      session: {
        verificationData: {
          caseId: 1678371510528100,
          dssHeaderDetails: 'Child Details',
          dssQuestionAnswerPairs: [
            {
              question: 'First Name',
              answer: 'ChildFirstName',
            },
            {
              question: 'Last Name',
              answer: 'ChildLastName',
            },
          ],
          dssQuestionAnswerDatePairs: [
            {
              question: 'Date of Birth',
              answer: '2020-01-01',
            },
          ],
        },
      },
    });
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });
  test('Testing content with error', async () => {
    req = mockRequest({
      body: {
        saveAndContinue: true,
        'DateFields_0-day': '1',
        'DateFields_0-month': '1',
        'DateFields_0-year': '2020',
        InputFields_0: 'childfirstname',
        InputFields_1: 'childlastname',
      },
      session: {
        verificationData: {
          caseId: 1678371510528100,
          dssHeaderDetails: 'Child Details',
          dssQuestionAnswerPairs: [
            {
              question: 'First Name',
              answer: 'ChildFirstName',
            },
            {
              question: 'Last Name',
              answer: 'ChildLastName',
            },
          ],
          dssQuestionAnswerDatePairs: [
            {
              question: 'Date of Birth',
              answer: '2020-01-01',
            },
          ],
        },
      },
    });
    const controller = new citizenDataVerification(mockFormContent.fields);
    await controller.post(req, res);
    expect(req.session.errors).not.toBe(null);
    expect(res.redirect).toHaveBeenCalled();
  });
});