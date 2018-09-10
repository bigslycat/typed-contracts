/* @flow */

import { ValidationError } from '../ValidationError';
import { createContract } from '../createContract';

export const boolean = createContract(
  (name: string, value: mixed): boolean | ValidationError =>
    typeof value === 'boolean'
      ? value
      : ValidationError.of(name, value, 'boolean'),
);

export const isBoolean = boolean;
export const passBoolean = boolean;

export const bool = boolean;
export const isBool = boolean;
export const passBool = boolean;
