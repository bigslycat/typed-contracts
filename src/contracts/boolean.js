/* @flow */

import { ValidationError } from '../ValidationError';
import { createContract } from '../createContract';

export const isBoolean = createContract(
  (name: string, value: mixed): boolean | ValidationError =>
    typeof value === 'boolean'
      ? value
      : ValidationError.of(name, value, 'boolean'),
);
