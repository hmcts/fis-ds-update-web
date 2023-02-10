/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application } from 'express';

export class TestApiRoutes {
  /**
   *
   * @param app
   */
  public enableFor(app: Application): void {
    //api endpoint
    app.get('/api/v1/session', (req, res) => res.json(req.session));

    app.get('/case/dss-orchestration/:caseId', (req, res) => {
      const dataset = [
        {
          caseId: '1675676483319900',
          dssQuestionAnswerPairs: [
            {
              question: 'Applicant FullName',
              answer: 'Abdul Daim',
            },
          ],
          dssQuestionAnswerDatePairs: [
            {
              question: 'Applicant Joining Date',
              answer: '1990-12-27',
            },
          ],
        },
        {
          caseId: '1675676483319800',
          dssQuestionAnswerPairs: [
            {
              question: 'Applicant FullName',
              answer: 'John Doe',
            },
            {
              question: 'Applicant Place of Birth',
              answer: 'Demo',
            },
            {
              question: 'Applicant Issues',
              answer: 'None',
            },
          ],
          dssQuestionAnswerDatePairs: [
            {
              question: 'Applicant Joining Date',
              answer: '2022-12-12',
            },
            {
              question: 'Applicant Birth date',
              answer: '2022-12-12',
            },
            {
              question: 'Applicant Travelling date',
              answer: '2022-12-12',
            },
          ],
        },
      ];
      const caseId = req.params['caseId'];
      if (dataset.some(d => d.caseId === caseId)) {
        res.status(200).json(dataset.filter(d => d.caseId === caseId)[0]);
      } else {
        res.status(404).json({ msg: 'not found' });
      }
    });
  }
}
