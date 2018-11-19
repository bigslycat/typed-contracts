/* @flow */

import { ValidationError } from '../ValidationError';
import * as contract from '../Contract';

import { literal } from './literal';

type UnionContract = <T, L: string | number | boolean>(
  ...rules: $ReadOnlyArray<
    ((name: string, value: mixed) => ValidationError | T) | L,
  >
) => contract.Contract<T | L>;

export class UnionError extends ValidationError {
  constructor(
    valueName: string,
    value: mixed,
    errors: $ReadOnlyArray<ValidationError>,
  ) {
    super(valueName, value, 'Union', errors);
    this.name = 'UnionError';
  }
}

export const union: UnionContract = /* :: <T, L: string | number | boolean> */ (
  ...rules: $ReadOnlyArray<
    ((name: string, value: mixed) => ValidationError | T) | L,
  >
): any => {
  const validators = rules.map(rule =>
    typeof rule == 'function' ? rule : literal(rule),
  );

  const unionContract = (name, value: any): ValidationError | T => {
    const errors = validators
      .map(validate => validate(name, value))
      .reduce((scope, error) => {
        if (error instanceof ValidationError) scope.push(error);
        return scope;
      }, []);

    return errors.length < validators.length
      ? value
      : new UnionError(name, value, errors);
  };

  return contract.of(unionContract);
};

export const isUnion = union;
export const passUnion = union;

export const uni = union;
export const isUni = union;
export const passUni = union;
