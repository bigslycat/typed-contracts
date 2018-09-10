/* @flow */

import { ValidationError } from '../ValidationError';
import { createContract, type Contract } from '../createContract';

import { literal } from './literal';

type UnionContract = <T, L: string | number | boolean>(
  ...rules: $ReadOnlyArray<
    ((name: string, value: mixed) => ValidationError | T) | L,
  >
) => Contract<T | L>;

export const union: UnionContract = /* :: <T, L: string | number | boolean> */ (
  ...rules: $ReadOnlyArray<
    ((name: string, value: mixed) => ValidationError | T) | L,
  >
): any => {
  const contracts = rules.map(
    rule => (typeof rule == 'function' ? rule : literal(rule)),
  );

  const unionContract = (name, value: any): ValidationError | T => {
    const errors = contracts
      .map(contract => contract(name, value))
      .reduce((scope, error) => {
        if (error instanceof ValidationError) scope.push(error);
        return scope;
      }, []);

    if (errors.length !== contracts.length) return value;

    const types = errors.reduce((scope, { expectedTypes }) => {
      for (let i = 0; i < expectedTypes.length; i += 1) {
        scope.push(expectedTypes[i]);
      }
      return scope;
    }, []);

    return (ValidationError.of: any)(name, value, ...types);
  };

  return createContract(unionContract);
};

export const isUnion = union;
export const passUnion = union;

export const uni = union;
export const isUni = union;
export const passUni = union;
