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
  // exact?: boolean,
): contract.Contract<$ObjMap<S, ExtractReturnType>> =>
  contract.of((valueName, value) => {
    if (!value || typeof value != 'object' || Array.isArray(value)) {
      return new ValidationError(valueName, value, 'Object');
    }

    const errors = Object.entries(spec).reduce(
      (acc, [key, validate]: [string, any]) => {
        const val = value[key];

        if (validate) {
          const result = validate(`${valueName}.${key}`, val);
          if (result instanceof ValidationError) acc.push(result);
        }
        return acc;
      },
      [],
    );

    // const errors: $ReadOnlyArray<ValidationError> = Object.entries(
    //   value,
    // ).reduce((acc, [key, val]) => {
    //   const validate = spec[key];

    //   if (validate) {
    //     const result = validate(`${valueName}.${key}`, val);

    //     console.log({ key, val, t: typeof result });
    //     if (result instanceof ValidationError) acc.push(result);
    //   }

    //   return acc;
    // }, []);

    return errors.length
      ? new ObjectValidationError(valueName, value, errors)
      : value;
  });

export const isObject = object;
export const passObject = object;

export const obj = object;
export const isObj = object;
export const passObj = object;
