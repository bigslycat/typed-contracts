/* @flow */

import { ValidationError } from './ValidationError';

type ValidateNamed<T> = (value: mixed, ...rest: void[]) => ValidationError | T;

type Validate<T> = (
  valueName: string,
  value: mixed,
  ...rest: void[]
) => T | ValidationError;

export type Contract<T> = {
  (valueName: string, value: mixed, ...rest: void[]): T | ValidationError,
  +maybe: Validate<?T>,
  +optional: Validate<void | T>,

  +bindName: (
    valueName: string,
  ) => {
    (value: mixed, ...rest: void[]): ValidationError | T,
    +maybe: ValidateNamed<?T>,
    +optional: ValidateNamed<void | T>,
  },
};

export const createContract = /* :: <T> */ (
  validate: Validate<T>,
): Contract<T> => {
  const maybe: Validate<?T> = (valueName, value) =>
    value == null ? value : validate(valueName, value);

  const optional: Validate<void | T> = (valueName, value) =>
    value === undefined ? value : validate(valueName, value);

  const contract = (valueName: string, value: mixed) =>
    validate(valueName, value);

  contract.maybe = maybe;
  contract.optional = optional;

  contract.bindName = (valueName: string) => {
    const named = (value: mixed) => validate(valueName, value);
    named.maybe = (value: mixed) => maybe(valueName, value);
    named.optional = (value: mixed) => optional(valueName, value);
    return named;
  };

  return contract;
};
