import { applyParms, parseUrl } from './url-parser';

describe('Testing URL parser', () => {
  test('matching output of DateField', () => {
    expect(parseUrl('http://localhost:3100')).toEqual({ url: 'http://localhost:3100' });
  });
  test('matching output of DateField - sad scenario(data toggled as false', () => {
    expect(applyParms('http://localhost:3100/:id/name', { id: '20' })).toBe('http://localhost:3100/20/name');
  });
});
