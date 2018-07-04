/* @flow */

import { createContract } from '../src/createContract';

const createMock = result => {
  const validate = jest.fn().mockReturnValue(result);
  const contract = createContract(validate);
  return { validate, contract };
};

describe('createContract', () => {
  describe('Receives a validate function and returns Contract', () => {
    it('Can be called and returns validate function result', () => {
      const { validate, contract } = createMock('result');

      expect(contract('valueName', 'value')).toBe('result');
      expect(validate).lastCalledWith('valueName', 'value');
    });

    describe('Contract.maybe method', () => {
      it('Returns null if value equals null', () => {
        const { validate, contract } = createMock('result');

        expect(contract.maybe('valueName', null)).toBe(null);
        expect(validate).toHaveBeenCalledTimes(0);
      });

      it('Returns undefined if value equals undefined', () => {
        const { validate, contract } = createMock('result');

        expect(contract.maybe('valueName', undefined)).toBe(undefined);
        expect(validate).toHaveBeenCalledTimes(0);
      });

      it('Returns validation result in other cases', () => {
        const { validate, contract } = createMock('result');

        expect(contract.maybe('valueName', 'value')).toBe('result');
        expect(validate).lastCalledWith('valueName', 'value');
      });
    });

    describe('Contract.optional method', () => {
      it('Returns undefined if value equals undefined', () => {
        const { validate, contract } = createMock('result');

        expect(contract.optional('valueName', undefined)).toBe(undefined);
        expect(validate).toHaveBeenCalledTimes(0);
      });

      it('Returns validation result in other cases', () => {
        const { validate, contract } = createMock('result');

        expect(contract.optional('valueName', null)).toBe('result');
        expect(validate).lastCalledWith('valueName', null);

        expect(contract.optional('valueName', 'value')).toBe('result');
        expect(validate).lastCalledWith('valueName', 'value');
      });
    });

    describe('Contract.bindName method', () => {
      describe('Returns contract with binded valueName', () => {
        describe('Contract with binded valueName', () => {
          it('Can be called and returns validate function result', () => {
            const { validate, contract } = createMock('result');

            expect(contract.bindName('valueName')('value')).toBe('result');
            expect(validate).lastCalledWith('valueName', 'value');
          });
        });

        describe('Contract.bindName(name).maybe method', () => {
          it('Returns null if value equals null', () => {
            const { validate, contract } = createMock('result');

            expect(contract.bindName('valueName').maybe(null)).toBe(null);
            expect(validate).toHaveBeenCalledTimes(0);
          });

          it('Returns undefined if value equals undefined', () => {
            const { validate, contract } = createMock('result');

            expect(contract.bindName('valueName').maybe(undefined)).toBe(
              undefined,
            );
            expect(validate).toHaveBeenCalledTimes(0);
          });

          it('Returns validation result in other cases', () => {
            const { validate, contract } = createMock('result');

            expect(contract.bindName('valueName').maybe('value')).toBe(
              'result',
            );
            expect(validate).lastCalledWith('valueName', 'value');
          });
        });

        describe('Contract.bindName(name).optional method', () => {
          it('Returns undefined if value equals undefined', () => {
            const { validate, contract } = createMock('result');

            expect(contract.bindName('valueName').optional(undefined)).toBe(
              undefined,
            );
            expect(validate).toHaveBeenCalledTimes(0);
          });

          it('Returns validation result in other cases', () => {
            const { validate, contract } = createMock('result');

            expect(contract.bindName('valueName').optional(null)).toBe(
              'result',
            );
            expect(validate).lastCalledWith('valueName', null);

            expect(contract.bindName('valueName').optional('value')).toBe(
              'result',
            );
            expect(validate).lastCalledWith('valueName', 'value');
          });
        });
      });
    });
  });
});
