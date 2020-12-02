/* @flow */

import { intersection } from '../../src/contracts/intersection';
import { ValidationError } from '../../src/ValidationError';

const createError = (...types: $ReadOnlyArray<string>) => (
  name: string,
  value: mixed,
) => new ValidationError(name, value, types);

describe('intersection', () => {
  describe('Creates new Contract for one or more other contracts or validation functions', () => {
    it('Return ValidationError if at least one Contract returns ValidationError', () => {
      const validate1 = jest.fn().mockReturnValue({ a: 1, b: 2 });
      const validate2 = jest.fn().mockReturnValue({ a: 1, b: 2 });
      const validate3 = jest.fn(createError('type3'));

      const result = intersection(
        validate1,
        validate2,
        validate3,
      )('valueName', { a: 1, b: 2 });

      expect(result).toBeInstanceOf(ValidationError);
      expect(result.expectedTypes).toEqual(['Intersection']);
      expect(result.nested).toEqual([
        new ValidationError('valueName', { a: 1, b: 2 }, 'type3'),
      ]);

      expect(validate1).lastCalledWith('valueName', { a: 1, b: 2 });
      expect(validate2).lastCalledWith('valueName', { a: 1, b: 2 });
      expect(validate3).lastCalledWith('valueName', { a: 1, b: 2 });
    });

    it('Return value in other cases', () => {
      const validate1 = jest.fn().mockReturnValue({ a: 1, b: 2 });
      const validate2 = jest.fn().mockReturnValue({ a: 1, b: 2 });
      const validate3 = jest.fn().mockReturnValue({ a: 1, b: 2 });

      expect(
        intersection(
          validate1,
          validate2,
          validate3,
        )('valueName', { a: 1, b: 2 }),
      ).toEqual({ a: 1, b: 2 });

      expect(validate1).lastCalledWith('valueName', { a: 1, b: 2 });
      expect(validate2).lastCalledWith('valueName', { a: 1, b: 2 });
      expect(validate3).lastCalledWith('valueName', { a: 1, b: 2 });
    });
  });
});
