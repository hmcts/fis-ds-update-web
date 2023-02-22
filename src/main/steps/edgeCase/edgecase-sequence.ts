/* eslint-disable import/order */
import { Sections, Step } from '../constants';
import { APPLICATION_CONFIRMATION, CASE_SEARCH_URL, CHECK_YOUR_ANSWERS, DATA_VERIFICATION, START_HOME } from '../urls';

export const edgeCase_Sequence: Step[] = [
  {
    url: START_HOME,
    showInSection: Sections.EdgeCase,
    getNextStep: () => CASE_SEARCH_URL,
  },
  {
    url: CASE_SEARCH_URL,
    showInSection: Sections.EdgeCase,
    getNextStep: () => DATA_VERIFICATION,
  },
  {
    url: DATA_VERIFICATION,
    showInSection: Sections.EdgeCase,
    getNextStep: () => APPLICATION_CONFIRMATION,
  },
  {
    url: APPLICATION_CONFIRMATION,
    showInSection: Sections.EdgeCase,
    getNextStep: () => CHECK_YOUR_ANSWERS,
  },
  {
    url: CHECK_YOUR_ANSWERS,
    showInSection: Sections.EdgeCase,
    getNextStep: () => APPLICATION_CONFIRMATION,
  },
  {
    url: APPLICATION_CONFIRMATION,
    showInSection: Sections.EdgeCase,
    getNextStep: () => START_HOME,
  },
];
