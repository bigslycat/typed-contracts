/* @flow */

import { ValidationError } from '../ValidationError';
import * as contract from '../Contract';

export const nul: contract.Contract<null> = contract.of((name, value) =>
  value === null ? value : new ValidationError(name, value, 'null'),
);

export const isNull = nul;
export const passNull = nul;
