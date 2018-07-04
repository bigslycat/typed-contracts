/* @flow */

import { ValidationError } from '../ValidationError';
import { createContract, type Contract } from '../createContract';

export const isArray = <T>(
  contract: (valueName: string, value: mixed) => ValidationError | T,
): Contract<T[]> =>
  createContract(
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
