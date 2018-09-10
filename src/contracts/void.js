/* @flow */

import { ValidationError } from '../ValidationError';
import { createContract } from '../createContract';

export const undef = createContract(
  (name: string, value: mixed): void | ValidationError =>
    value === undefined ? value : ValidationError.of(name, value, 'void'),
);

export const isUndefined = undef;
export const passUndefined = undef;

export const isUndef = undef;
export const passUndef = undef;

export const isVoid = undef;
export const passVoid = undef;
