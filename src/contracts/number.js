/* @flow */

import { ValidationError } from '../ValidationError';
import { createContract } from '../createContract';

export const number = createContract(
  (name: string, value: mixed): number | ValidationError =>
    typeof value === 'number'
      ? value
      : ValidationError.of(name, value, 'number'),
);

export const isNumber = number;
export const passNumber = number;

export const num = number;
export const isNum = number;
export const passNum = number;
