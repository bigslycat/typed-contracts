/* @flow */

import { ValidationError } from '../../ValidationError';
import * as contract from '../../Contract';

import { union } from '../union';

import { ObjectValidationError } from './ObjectValidationError';

declare function objectOf<T, L: string | number | boolean>(
  ...rules: $ReadOnlyArray<
    ((name: string, value: mixed) => ValidationError | T) | L,
  >
): contract.Contract<{ +[string]: T | L }>;

export function objectOf<T, L: string | number | boolean>(
  ...rules: $ReadOnlyArray<
    ((name: string, value: mixed) => ValidationError | T) | L,
  >
): contract.Contract<{ +[string]: T | L }> {
  const validate = union(...rules);

  return contract.of((valueName, value): any => {
    if (!value || typeof value != 'object' || Array.isArray(value)) {
      return new ValidationError(valueName, value, 'Object');
    }

    const errors = Object.entries(value).reduce((acc, [key, val]) => {
      const result = validate(`${valueName}.${key}`, val);
      if (result instanceof ValidationError) acc.push(result);
      return acc;
    }, []);

    return errors.length
      ? new ObjectValidationError(valueName, value, errors)
      : value;
  });
}

export const isObjectOf = objectOf;
export const passObjectOf = objectOf;

export const objOf = objectOf;
export const isObjOf = objectOf;
export const passObjOf = objectOf;
