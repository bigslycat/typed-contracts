/* @flow */

import { ValidationError } from '../src/ValidationError';

describe('ValidationError', () => {
  it('Have name, valueName, value, expectedTypes and message properties', () => {
    const error = new ValidationError('valueName', 'value', 'type');

    expect(error.name).toBe('ValidationError');
    expect(error.valueName).toBe('valueName');
    expect(error.value).toBe('value');
    expect(error.expectedTypes).toEqual(['type']);
    expect(error.message).toBe(
      '`valueName` must be type, but "value" (string) given',
    );
  });

  it('Have name, valueName, value, expectedTypes and message properties', () => {
    const error = new ValidationError('valueName', 'value', 'type');

    expect(error.name).toBe('ValidationError');
    expect(error.valueName).toBe('valueName');
    expect(error.value).toBe('value');
    expect(error.expectedTypes).toEqual(['type']);
    expect(error.message).toBe(
      '`valueName` must be type, but "value" (string) given',
    );
  });
});
