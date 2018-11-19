/* @flow */

import { ValidationError } from '../ValidationError';
import * as contract from '../Contract';

export const number: contract.Contract<number> = contract.of((name, value) =>
  typeof value == 'number' ? value : new ValidationError(name, value, 'number'),
);

export const isNumber = number;
export const passNumber = number;

export const num = number;
export const isNum = number;
export const passNum = number;
