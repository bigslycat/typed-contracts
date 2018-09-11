/* @flow */

import { ValidationError } from '../../ValidationError';

import { union } from '../union';

const always = value => (/* :: ..._: $ReadOnlyArray<any> */) => value;

export const handler = (spec: any) => {
  const isArray = Array.isArray(spec);

  const getContract = isArray
    ? always(union(...spec))
    : (keyName: string) => spec[keyName];

  const specKeys = isArray ? undefined : Object.keys(spec);

  return (valueName: string, value: mixed): any => {
    if (!value || typeof value !== 'object' || Array.isArray(value))
      return ValidationError.of(valueName, value, 'Object');

    const keys = specKeys || Object.keys(value);

    for (let index = 0; index < keys.length; index += 1) {
      const keyName = keys[index];
      const contract = getContract(keyName);
      const currentValue = value[keyName];

      const result = contract(`${valueName}.${keyName}`, currentValue);
      if (result instanceof ValidationError) return result;
    }

    return value;
  };
};
