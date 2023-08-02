import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Case, CaseDate } from '../case/case';

dayjs.extend(customParseFormat);

export type Validator = (value: string | string[] | CaseDate | Partial<Case> | File | undefined) => void | string;
export type DateValidator = (value: CaseDate | undefined) => void | string;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export type AnyType = any;
export const enum ValidationError {
  REQUIRED = 'required',
  NOT_SELECTED = 'notSelected',
  INVALID = 'invalid',
  NOT_NUMERIC = 'notNumeric',
  LESS = 'lessthan20',
  NOT_UPLOADED = 'NOT_UPLOADED',
}

export const isFieldFilledIn: Validator = value => {
  if (!value || (value as string).trim?.().length === 0) {
    return ValidationError.REQUIRED;
  }
};

export const atLeastOneFieldIsChecked: Validator = fields => {
  let _fields;
  if (Array.isArray(fields)) {
    _fields = fields;
    _fields = _fields.filter(nestedItem => nestedItem !== '');
  } else {
    _fields = fields;
  }
  if (!_fields || (_fields as []).length === 0) {
    return ValidationError.REQUIRED;
  }
};

export const areDateFieldsFilledIn: DateValidator = fields => {
  if (typeof fields !== 'object' || Object.keys(fields).length !== 3) {
    return ValidationError.REQUIRED;
  }
  const values = Object.values(fields);
  const allFieldsMissing = values.every(value => !value);
  if (allFieldsMissing) {
    return ValidationError.REQUIRED;
  }

  const someFieldsMissing = values.some(value => !value);
  if (someFieldsMissing) {
    if (!fields.day) {
      return 'incompleteDay';
    } else if (!fields.month) {
      return 'incompleteMonth';
    }
    return 'incompleteYear';
  }
};

export const isDateInputInvalid: DateValidator = date => {
  const invalid = 'invalidDate';
  if (!date) {
    return invalid;
  }

  for (const value in date) {
    if (isNaN(+date[value])) {
      return invalid;
    }
  }

  const year = parseInt(date.year, 10) || 0;
  const month = parseInt(date.month, 10) || 0;
  const day = parseInt(date.day, 10) || 0;
  if (year === 0 && month === 0 && day === 0) {
    return;
  }
  if (!dayjs(`${year}-${month}-${day}`, 'YYYY-M-D', true).isValid()) {
    return invalid;
  }
};

export const isAlphaNumeric: Validator = value => {
  if (typeof value === 'string') {
    return !value.match(/^[a-zA-Z0-9_\s]*$/) ? 'invalid' : undefined;
  }
};

export const isNumeric: Validator = value => {
  if (value && !(value as string).match(/^\d+$/)) {
    return ValidationError.NOT_NUMERIC;
  }
};
