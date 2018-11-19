/* @flow */

import { ValidationError } from '../ValidationError';
import * as contract from '../Contract';

export const boolean: contract.Contract<boolean> = contract.of((name, value) =>
  typeof value == 'boolean'
    ? value
    : new ValidationError(name, value, 'boolean'),
);

export const isBoolean = boolean;
export const passBoolean = boolean;

export const bool = boolean;
export const isBool = boolean;
export const passBool = boolean;
