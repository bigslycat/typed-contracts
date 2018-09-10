/* @flow */

import { ValidationError } from '../ValidationError';
import { createContract } from '../createContract';

export const string = createContract(
  (name: string, value: mixed): string | ValidationError =>
    typeof value === 'string'
      ? value
      : ValidationError.of(name, value, 'string'),
);

export const isString = string;
export const passString = string;

export const str = string;
export const isStr = string;
export const passStr = string;
