/* @flow */

import { ValidationError } from '../../ValidationError';
import { createContract, type Contract } from '../../createContract';

type ExtractReturnType = <T>(
  (valueName: string, value: any) => ValidationError | T,
) => $Supertype<T>;

export const object = <
  S: { [prop: string]: (valueName: string, value: mixed) => any },
>(
  spec: S,
): Contract<$ObjMap<S, ExtractReturnType>> =>
  createContract((valueName, value) => {
    if (!value || typeof value != 'object' || Array.isArray(value)) {
      return new ValidationError(valueName, value, 'Object');
    }

    const errors = Object.entries(spec).reduce(
      (acc, [key, validate]: [string, any]) => {
        const result = validate(`${valueName}.${key}`, value[key]);

        if (result instanceof ValidationError) acc.push(result);

        return acc;
      },
      [],
    );

    return errors.length
      ? // $FlowFixMe
        new ValidationError(
          valueName,
          value,
          ...errors
            .map(error => error.expectedTypes)
            .reduce((prev, next) => prev.concat(next), []),
        )
      : value;
  });

export const isObject = object;
export const passObject = object;

export const obj = object;
export const isObj = object;
export const passObj = object;
