/* @flow */

import { ValidationError } from '../../ValidationError';
import { createContract, type Contract } from '../../createContract';

import { handler } from './handler';

type ExtractReturnType = <T>(
  (valueName: string, value: any) => ValidationError | T,
) => $Supertype<T>;

export const object = <
  S: { [prop: string]: (valueName: string, value: mixed) => any },
>(
  spec: S,
): Contract<$ObjMap<S, ExtractReturnType>> => createContract(handler(spec));

export const isObject = object;
export const passObject = object;

export const obj = object;
export const isObj = object;
export const passObj = object;
