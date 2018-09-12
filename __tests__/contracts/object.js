/* @flow */

import { isObject } from '../../src/contracts/object';
import { ValidationError } from '../../src/ValidationError';

const createError = (...types: $ReadOnlyArray<string>) => (
  name: string,
  value: mixed,
) => new ValidationError(name, value, types);

describe('isObject', () => {
  describe('Creates new Contract for spec object of Contracts or validation function', () => {
    it('Returns ValidationError when value is not Objects', () => {
      const spec = { prop: jest.fn() };
      const result: any = isObject(spec)('valueName', null);

      expect(result).toBeInstanceOf(ValidationError);
      expect(result.expectedTypes).toEqual(['Object']);
      expect(spec.prop).toHaveBeenCalledTimes(0);
    });

    it('Returns value when all validators not returns ValidationError', () => {
      const spec = {
        prop1: jest.fn(),
        prop2: jest.fn(),
        prop3: jest.fn(),
      };

      const value = {
        prop1: 'value 1',
        prop2: 'value 2',
        prop3: 'value 3',
      };

      const result: any = isObject(spec)('valueName', value);

      expect(result).toEqual(value);
      expect(spec.prop1).lastCalledWith('valueName.prop1', 'value 1');
      expect(spec.prop2).lastCalledWith('valueName.prop2', 'value 2');
      expect(spec.prop3).lastCalledWith('valueName.prop3', 'value 3');
    });

    it('Returns ValidationError in other cases', () => {
      const spec = {
        prop1: jest.fn(),
        prop2: jest.fn(),
        prop3: jest.fn(createError('type')),
      };

      const value = {
        prop1: 'value 1',
        prop2: 'value 2',
        prop3: 'value 3',
      };

      const result: any = isObject(spec)('valueName', value);

      expect(result).toBeInstanceOf(ValidationError);
    });
  });
});
