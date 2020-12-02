/* @flow */

import { ValidationError } from '../ValidationError';
import * as contract from '../Contract';

export class IntersectionError extends ValidationError {
  constructor(
    valueName: string,
    value: mixed,
    errors: $ReadOnlyArray<ValidationError>,
  ) {
    super(valueName, value, 'Intersection', errors);
    this.name = 'IntersectionError';
  }
}

declare export function intersection<A>(
  a: (name: string, value: mixed) => ValidationError | A,
): contract.Contract<A>;

declare export function intersection<A, B>(
  a: (name: string, value: mixed) => ValidationError | A,
  b: (name: string, value: mixed) => ValidationError | B,
): contract.Contract<A & B>;

declare export function intersection<A, B, C>(
  a: (name: string, value: mixed) => ValidationError | A,
  b: (name: string, value: mixed) => ValidationError | B,
  c: (name: string, value: mixed) => ValidationError | C,
): contract.Contract<A & B & C>;

declare export function intersection<A, B, C, D>(
  a: (name: string, value: mixed) => ValidationError | A,
  b: (name: string, value: mixed) => ValidationError | B,
  c: (name: string, value: mixed) => ValidationError | C,
  d: (name: string, value: mixed) => ValidationError | D,
): contract.Contract<A & B & C & D>;

declare export function intersection<A, B, C, D, E>(
  a: (name: string, value: mixed) => ValidationError | A,
  b: (name: string, value: mixed) => ValidationError | B,
  c: (name: string, value: mixed) => ValidationError | C,
  d: (name: string, value: mixed) => ValidationError | D,
  e: (name: string, value: mixed) => ValidationError | E,
): contract.Contract<A & B & C & D & E>;

declare export function intersection<A, B, C, D, E, F>(
  a: (name: string, value: mixed) => ValidationError | A,
  b: (name: string, value: mixed) => ValidationError | B,
  c: (name: string, value: mixed) => ValidationError | C,
  d: (name: string, value: mixed) => ValidationError | D,
  e: (name: string, value: mixed) => ValidationError | E,
  f: (name: string, value: mixed) => ValidationError | F,
): contract.Contract<A & B & C & D & E & F>;

declare export function intersection<A, B, C, D, E, F, G>(
  a: (name: string, value: mixed) => ValidationError | A,
  b: (name: string, value: mixed) => ValidationError | B,
  c: (name: string, value: mixed) => ValidationError | C,
  d: (name: string, value: mixed) => ValidationError | D,
  e: (name: string, value: mixed) => ValidationError | E,
  f: (name: string, value: mixed) => ValidationError | F,
  g: (name: string, value: mixed) => ValidationError | G,
): contract.Contract<A & B & C & D & E & F & G>;

declare export function intersection<A, B, C, D, E, F, G, H>(
  a: (name: string, value: mixed) => ValidationError | A,
  b: (name: string, value: mixed) => ValidationError | B,
  c: (name: string, value: mixed) => ValidationError | C,
  d: (name: string, value: mixed) => ValidationError | D,
  e: (name: string, value: mixed) => ValidationError | E,
  f: (name: string, value: mixed) => ValidationError | F,
  g: (name: string, value: mixed) => ValidationError | G,
  h: (name: string, value: mixed) => ValidationError | H,
): contract.Contract<A & B & C & D & E & F & G & H>;

export function intersection<T>(
  ...rules: $ReadOnlyArray<(name: string, value: mixed) => ValidationError | T>
): contract.Contract<T> {
  const validators = rules;

  const intersectionContract = (name, value: any): ValidationError | T => {
    const errors = validators
      .map(validate => validate(name, value))
      .reduce((scope, error) => {
        if (error instanceof ValidationError) scope.push(error);
        return scope;
      }, []);

    return errors.length ? new IntersectionError(name, value, errors) : value;
  };

  return contract.of(intersectionContract);
}
