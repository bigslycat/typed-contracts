/* @flow */

import { ValidationError } from '../ValidationError';
import { createContract } from '../createContract';

export const nul = createContract(
  (name: string, value: mixed): null | ValidationError =>
    value === null ? value : ValidationError.of(name, value, 'null'),
);

export const isNull = nul;
export const passNull = nul;
