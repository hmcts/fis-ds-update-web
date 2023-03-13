import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../../../app/case/case';

import CitizenDataVerificationController from './getController';

describe('Test URL endpoints', () => {
  const controller = new CitizenDataVerificationController('page', () => ({}), FieldPrefix.APPLICANT);
  const res = mockResponse();
  const req = mockRequest({
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
  test('should be able to render the page and not show error page', async () => {
    await controller.get(req, res);
    expect(res.render).not.toHaveBeenCalledWith('error');
  });

  test('should be able to render the page with isDataVerified to be false', async () => {
    const newRequest = mockRequest({
      session: {
        isDataVerified: true,
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
    const newResponse = mockResponse({ locals: { isError: true } });
    await controller.get(newRequest, newResponse);
    expect(res.render).not.toHaveBeenCalledWith('error');
  });
});

