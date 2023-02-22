import { CaseDate } from '../case/case';

import { areDateFieldsFilledIn, atLeastOneFieldIsChecked, isDateInputInvalid, isFieldFilledIn } from './validation';

describe('isFieldFilledIn()', () => {
  test('Should check if value exist', async () => {
    const isValid = isFieldFilledIn('Yes');

    expect(isValid).toStrictEqual(undefined);
  });

  test('Should check if value does not exist', async () => {
    let value;
    const isValid = isFieldFilledIn(value);

    expect(isValid).toStrictEqual('required');
  });

  test('Should check if value is only whitespaces', async () => {
    const isValid = isFieldFilledIn('    ');

    expect(isValid).toStrictEqual('required');
  });
});
describe('areFieldsFilledIn()', () => {
  test('Should check if values in object exist', async () => {
    const isValid = areDateFieldsFilledIn({ day: '1', month: '1', year: '1' });
    expect(isValid).toStrictEqual(undefined);
  });

  test('Should check if all values in object does not exist', async () => {
    const isValid = areDateFieldsFilledIn({ day: '', month: '', year: '' });
    expect(isValid).toStrictEqual('required');
  });

  test('Should check if day does not exist', async () => {
    const isValid = areDateFieldsFilledIn({ day: '', month: '12', year: '' });
    expect(isValid).toStrictEqual('incompleteDay');
  });

  test('Should check if month does not exist', async () => {
    const isValid = areDateFieldsFilledIn({ day: '12', month: '', year: '' });
    expect(isValid).toStrictEqual('incompleteMonth');
  });

  test('Should check if year does not exist', async () => {
    const isValid = areDateFieldsFilledIn({ day: '21', month: '12', year: '' });
    expect(isValid).toStrictEqual('incompleteYear');
  });

  test('Should check if object does not exist', async () => {
    const isValid = areDateFieldsFilledIn(undefined);
    expect(isValid).toStrictEqual('required');
  });
});

describe('isDateInputInvalid()', () => {
  test.each([
    { date: { day: 1, month: 1, year: 1970 }, expected: undefined },
    { date: { day: 31, month: 12, year: 2000 }, expected: undefined },
    { date: { day: 31, month: 12, year: 123 }, expected: 'invalidDate' },
    { date: { day: 1, month: 1, year: 1 }, expected: 'invalidDate' },
    { date: { day: -31, month: 12, year: 2000 }, expected: 'invalidDate' },
    { date: { day: 31, month: -12, year: 2000 }, expected: 'invalidDate' },
    { date: { day: 32, month: 12, year: 2000 }, expected: 'invalidDate' },
    { date: { day: 31, month: 13, year: 2000 }, expected: 'invalidDate' },
    { date: { day: 'no', month: '!%', year: 'way' }, expected: 'invalidDate' },
    { date: { day: '29', month: '2', year: '2000' }, expected: undefined },
    { date: { day: '31', month: '2', year: '2000' }, expected: 'invalidDate' },
    { date: { day: ' ', month: ' ', year: ' ' }, expected: undefined },
    { expected: 'invalidDate' },
  ])('checks dates validity when %o', ({ date, expected }) => {
    const isValid = isDateInputInvalid(date as unknown as CaseDate);

    expect(isValid).toStrictEqual(expected);
  });
});

describe('atLeastOneFieldIsChecked()', () => {
  test('Should check if value exist', async () => {
    const isValid = atLeastOneFieldIsChecked(['Yes']);

    expect(isValid).toStrictEqual(undefined);
  });

  test('Should check if value does not exist', async () => {
    const isValid = atLeastOneFieldIsChecked([]);

    expect(isValid).toStrictEqual('required');
  });
});
