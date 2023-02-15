/* eslint-disable import/order */
import { Sections, Step } from '../constants';
import { CITIZEN_HOME_URL, DATA_VERIFICATION } from '../urls';

export const edgeCase_Sequence: Step[] = [
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
];
