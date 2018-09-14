/* @flow */

import { ValidationError } from '../../ValidationError';
import * as contract from '../../Contract';

import { object } from './object';

type ExtractReturnType = <T>(
  (valueName: string, value: mixed) => ValidationError | void | T,
) => $Supertype<T>;

export const shape = <
  S: { [prop: string]: (valueName: string, value: mixed) => any },
>(
  spec: S,
): contract.Contract<$ObjMap<S, ExtractReturnType>> =>
  object(
    Object.entries(spec).reduce((acc, [key, validate]: any) => {
      acc[key] = (valueName, value) =>
        value === undefined ? value : validate(valueName, value);
      return acc;
    }, {}),
  );
