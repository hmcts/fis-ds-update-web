/* eslint-disable import/order */
import { Sections, Step } from '../constants';
import { CITIZEN_HOME_URL } from '../urls';

export const EdgeCaseSequence: Step[] = [
  {
    url: CITIZEN_HOME_URL,
    showInSection: Sections.EdgeCase,
    getNextStep: () => CITIZEN_HOME_URL,
  }
];
