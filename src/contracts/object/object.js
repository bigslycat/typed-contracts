/* @flow */

import { ValidationError } from '../../ValidationError';
import * as contract from '../../Contract';

import { ObjectValidationError } from './ObjectValidationError';

type ExtractReturnType = <T>(
  (valueName: string, value: mixed) => ValidationError | T,
) => $Supertype<T>;

export class MustBeExactError extends ValidationError {
  constructor(objectValueName: string, keyValueName: string, value: mixed) {
    super(`${objectValueName}.${keyValueName}`, value);

    this.name = 'MustBeExactError';
    this.message = `Object \`${objectValueName}\` must be exact but have excess \`${keyValueName}\` property`;
  }
}

export const object = <
  S: { [prop: string]: (valueName: string, value: mixed) => any },
>(
  spec: S,
): contract.Contract<$ObjMap<S, ExtractReturnType>> =>
  contract.of((valueName, value) => {
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
      ? new ObjectValidationError(valueName, value, errors)
      : value;
  });

export const isObject = object;
export const passObject = object;

export const obj = object;
export const isObj = object;
export const passObj = object;
