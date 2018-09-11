/* @flow */

import { ValidationError } from '../ValidationError';
import { createContract, type Contract } from '../createContract';

import { union } from './union';

export const array = <T>(
  ...rules: $ReadOnlyArray<(name: string, value: mixed) => ValidationError | T>
): Contract<$ReadOnlyArray<T>> => {
  const contract = union(...rules);

  return createContract(
    (valueName, value): any => {
      if (!Array.isArray(value))
        return ValidationError.of(valueName, value, 'Array');

      for (let index = 0; index < value.length; index += 1) {
        const result = contract(`${valueName}[${index}]`, value[index]);
        if (result instanceof ValidationError) return result;
      }

      return value;
    },
  );
};

export const isArray = array;
export const passArray = array;

export const arr = array;
export const isArr = array;
export const passArr = array;
