import { APPLICATION_CONFIRMATION, CASE_SEARCH_URL, CHECK_YOUR_ANSWERS, DATA_VERIFICATION, START_HOME } from '../urls';

import { dss_update_steps } from './dss-sequence';

describe('Sequence must match respective path', () => {
  test('must match the path', () => {
    expect(dss_update_steps).toHaveLength(6);

    expect(dss_update_steps[0].url).toBe(START_HOME);
    expect(dss_update_steps[0].getNextStep({})).toBe(CASE_SEARCH_URL);

    expect(dss_update_steps[1].url).toBe(CASE_SEARCH_URL);
    expect(dss_update_steps[1].getNextStep({})).toBe(DATA_VERIFICATION);

    expect(dss_update_steps[2].url).toBe(DATA_VERIFICATION);
    expect(dss_update_steps[2].getNextStep({})).toBe(APPLICATION_CONFIRMATION);

    expect(dss_update_steps[3].url).toBe(APPLICATION_CONFIRMATION);
    expect(dss_update_steps[3].getNextStep({})).toBe(CHECK_YOUR_ANSWERS);

    expect(dss_update_steps[4].url).toBe(CHECK_YOUR_ANSWERS);
    expect(dss_update_steps[4].getNextStep({})).toBe(APPLICATION_CONFIRMATION);
  });
});
