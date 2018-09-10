/* @flow */

import { ValidationError } from '../ValidationError';
import { createContract, type Contract } from '../createContract';

export const literal = <T: string | number | boolean>(
  expected: T,
): Contract<T> =>
  createContract(
    (valueName, value: mixed): any => {
      if (value === expected) return value;
      return ValidationError.of(valueName, value, JSON.stringify(expected));
    },
  );

export const isLiteral = literal;
export const passLiteral = literal;

export const lit = literal;
export const isLit = literal;
export const passLit = literal;
