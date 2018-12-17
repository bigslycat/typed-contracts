/* @flow */

import { ValidationError } from '../../ValidationError';
import * as contract from '../../Contract';

import { object } from './object';

type ExtractReturnType = <T>(
  (valueName: string, value: mixed) => ValidationError | void | T,
) => T;

export function shape<
  S: { [prop: string]: (valueName: string, value: mixed) => any },
>(spec: S): contract.Contract<$ReadOnly<$ObjMap<S, ExtractReturnType>>> {
  return object(
    Object.entries(spec).reduce((acc, [key, validate]: any) => {
      acc[key] = (valueName, value) =>
        value === undefined ? value : validate(valueName, value);
      return acc;
    }, {}),
  );
}
