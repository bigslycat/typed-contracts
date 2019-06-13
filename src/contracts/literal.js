/* @flow */

import { ValidationError } from '../ValidationError';
import * as contract from '../Contract';

export const literal = <T: string | number | boolean>(
  expectedValue: T,
): contract.Contract<T> =>
  contract.of((valueName, value): any =>
    value === expectedValue ||
    (Number.isNaN(value) && Number.isNaN(expectedValue))
      ? value
      : new ValidationError(valueName, value, JSON.stringify(expectedValue)),
  );

export const isLiteral = literal;
export const passLiteral = literal;

export const lit = literal;
export const isLit = literal;
export const passLit = literal;
