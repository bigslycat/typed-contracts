/* @flow */

import { isUnion } from '../../src/contracts/union';
import { ValidationError } from '../../src/ValidationError';

const createError = (...types: $ReadOnlyArray<string>) => (
  name: string,
  value: mixed,
) => new ValidationError(name, value, types);

describe('isUnion', () => {
  describe('Creates new Contract for one or more other contracts or validation functions', () => {
    it('Return ValidationError if all Contract returns ValidationError', () => {
      const validate1 = jest.fn(createError('type1'));
      const validate2 = jest.fn(createError('type2'));
      const validate3 = jest.fn(createError('type3'));

      const result = isUnion(
        validate1,
        validate2,
        validate3,
      )('valueName', 'value');

      expect(result).toBeInstanceOf(ValidationError);
      expect(result.expectedTypes).toEqual(['Union']);
      expect(result.nested).toEqual([
        new ValidationError('valueName', 'value', 'type1'),
        new ValidationError('valueName', 'value', 'type2'),
        new ValidationError('valueName', 'value', 'type3'),
      ]);

      expect(validate1).lastCalledWith('valueName', 'value');
      expect(validate2).lastCalledWith('valueName', 'value');
      expect(validate3).lastCalledWith('valueName', 'value');
    });

    it('Return value in other cases', () => {
      const validate1 = jest.fn().mockReturnValue('result 1');
      const validate2 = jest.fn(createError('type1'));
      const validate3 = jest.fn(createError('type2'));

      expect(
        isUnion(validate1, validate2, validate3)('valueName', 'value'),
      ).toBe('value');
      expect(validate1).lastCalledWith('valueName', 'value');
      expect(validate2).lastCalledWith('valueName', 'value');
      expect(validate3).lastCalledWith('valueName', 'value');
    });
  });
});
