/* @flow */

import { ValidationError } from '../ValidationError';
import * as contract from '../Contract';

import { union } from './union';

export class ArrayValidationError extends ValidationError {
  constructor(
    valueName: string,
    value: mixed,
    errors: $ReadOnlyArray<ValidationError>,
  ) {
    super(valueName, value, 'Array', errors);
    this.name = 'ArrayValidationError';
  }
}

export const array = <T>(
  ...rules: $ReadOnlyArray<(name: string, value: mixed) => ValidationError | T>
): contract.Contract<$ReadOnlyArray<T>> => {
  const validate = rules.length === 1 ? rules[0] : union(...rules);

  return contract.of((valueName, value): any => {
    if (!Array.isArray(value)) {
      return new ValidationError(valueName, value, 'Array');
    }

    const errors = value.reduce((acc, item, index) => {
      const result = validate(`${valueName}[${index}]`, item);
      if (result instanceof ValidationError) acc.push(result);
      return acc;
    }, []);

    return errors.length
      ? new ArrayValidationError(valueName, value, errors)
      : value;
  });
};

export const isArray = array;
export const passArray = array;

export const arr = array;
export const isArr = array;
export const passArr = array;
