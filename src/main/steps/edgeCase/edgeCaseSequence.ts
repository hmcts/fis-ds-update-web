/* eslint-disable import/order */
import { Sections, Step } from '../constants';
import { CASE_FINDER_ERROR, CITIZEN_HOME_URL, DATA_VERIFICATION } from '../urls';

export const EdgeCaseSequence: Step[] = [
  {
    url: CITIZEN_HOME_URL,
    showInSection: Sections.EdgeCase,
    getNextStep: () => DATA_VERIFICATION,
  },
  {
    url: DATA_VERIFICATION,
    showInSection: Sections.EdgeCase,
    getNextStep: () => DATA_VERIFICATION,
  },
  {
    url: CASE_FINDER_ERROR,
    showInSection: Sections.EdgeCase,
    getNextStep: () => DATA_VERIFICATION,
  },
];
