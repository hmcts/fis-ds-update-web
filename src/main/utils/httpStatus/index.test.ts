import HTTPSTATUS from './index';

test('404 must return a error type', () => {
  expect(HTTPSTATUS.CODE().NOT_FOUND).toBe(404);
});
