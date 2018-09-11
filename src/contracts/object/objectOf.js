/* @flow */

import { ValidationError } from '../../ValidationError';
import { createContract, type Contract } from '../../createContract';

import { literal } from '../literal';

import { handler } from './handler';

type ObjectOf = <T, L: string | number | boolean>(
  ...rules: $ReadOnlyArray<
    ((name: string, value: mixed) => ValidationError | T) | L,
  >
) => Contract<{ [string]: T | L }>;

export const objectOf: ObjectOf = <T, L: string | number | boolean>(
  ...rules: $ReadOnlyArray<
    ((name: string, value: mixed) => ValidationError | T) | L,
  >
): Contract<{ [string]: T | L }> =>
  createContract(
    handler(
      Object.entries(rules).reduce((acc, [key, rule]: any) => {
        acc[key] = typeof rule == 'function' ? rule : literal(rule);
        return acc;
      }, {}),
    ),
  );

export const isObjectOf = objectOf;
export const passObjectOf = objectOf;

export const objOf = objectOf;
export const isObjOf = objectOf;
export const passObjOf = objectOf;
