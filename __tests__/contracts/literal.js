/* @flow */

import { isLiteral } from '../../src/contracts/literal';
import { ValidationError } from '../../src/ValidationError';

describe('isLiteral', () => {
  describe('Creates new Contract for string or number specific value', () => {
    it('Returns value if value equals expected value', () => {
      expect(isLiteral('expected value')('valueName', 'expected value')).toBe(
        'expected value',
      );
    });

    it('Returns ValidationError instance in other cases', () => {
      expect(
        isLiteral('expected value')('valueName', 'invalid value'),
      ).toBeInstanceOf(ValidationError);
    });

    it('expectedTypes property of ValidationError equals [\'"<expected value>"\']', () => {
      expect(
        (isLiteral('expected value')('valueName', 'invalid value'): any)
          .expectedTypes,
      ).toEqual(['"expected value"']);
    });
  });
});
