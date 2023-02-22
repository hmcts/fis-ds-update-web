import { APPLICATION_CONFIRMATION, CASE_SEARCH_URL, CHECK_YOUR_ANSWERS, DATA_VERIFICATION, START_HOME } from '../urls';

import { edgeCase_Sequence } from './edgecase-sequence';

describe('Sequence must match respective path', () => {
  test('must match the path', () => {
    expect(edgeCase_Sequence).toHaveLength(6);

    expect(edgeCase_Sequence[0].url).toBe(START_HOME);
    expect(edgeCase_Sequence[0].getNextStep({})).toBe(CASE_SEARCH_URL);

    expect(edgeCase_Sequence[1].url).toBe(CASE_SEARCH_URL);
    expect(edgeCase_Sequence[1].getNextStep({})).toBe(DATA_VERIFICATION);

    expect(edgeCase_Sequence[2].url).toBe(DATA_VERIFICATION);
    expect(edgeCase_Sequence[2].getNextStep({})).toBe(APPLICATION_CONFIRMATION);

    expect(edgeCase_Sequence[3].url).toBe(APPLICATION_CONFIRMATION);
    expect(edgeCase_Sequence[3].getNextStep({})).toBe(CHECK_YOUR_ANSWERS);

    expect(edgeCase_Sequence[4].url).toBe(CHECK_YOUR_ANSWERS);
    expect(edgeCase_Sequence[4].getNextStep({})).toBe(APPLICATION_CONFIRMATION);
  });
});
