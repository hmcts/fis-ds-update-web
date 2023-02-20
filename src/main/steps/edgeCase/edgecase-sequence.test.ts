import { APPLICATION_CONFIRMATION, CITIZEN_HOME_URL, DATA_VERIFICATION, START_HOME } from '../urls';

import { edgeCase_Sequence } from './edgecase-sequence';

describe('Sequence must match respective path', () => {
  test('must match the path', () => {
    expect(edgeCase_Sequence).toHaveLength(4);

    expect(edgeCase_Sequence[0].url).toBe(START_HOME);
    expect(edgeCase_Sequence[0].getNextStep({})).toBe(CITIZEN_HOME_URL);

    expect(edgeCase_Sequence[1].url).toBe(CITIZEN_HOME_URL);
    expect(edgeCase_Sequence[1].getNextStep({})).toBe(DATA_VERIFICATION);

    expect(edgeCase_Sequence[2].url).toBe(DATA_VERIFICATION);
    expect(edgeCase_Sequence[2].getNextStep({})).toBe(APPLICATION_CONFIRMATION);
  });
});
