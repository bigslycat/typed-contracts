/* @flow */

import { ValidationError } from '../ValidationError';
import * as contract from '../Contract';

export const undef: contract.Contract<void> = contract.of((name, value) =>
  value === undefined ? value : new ValidationError(name, value, 'void'),
);

export const isUndefined = undef;
export const passUndefined = undef;

export const isUndef = undef;
export const passUndef = undef;

export const isVoid = undef;
export const passVoid = undef;
