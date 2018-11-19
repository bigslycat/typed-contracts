/* @flow */

import { ValidationError } from '../ValidationError';
import * as contract from '../Contract';

export const string: contract.Contract<string> = contract.of((name, value) =>
  typeof value == 'string' ? value : new ValidationError(name, value, 'string'),
);

export const isString = string;
export const passString = string;

export const str = string;
export const isStr = string;
export const passStr = string;
