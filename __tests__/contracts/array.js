/* @flow */

import { isArray } from '../../src/contracts/array'
import { ValidationError } from '../../src/ValidationError'

const createError =
  (...types: string[]) =>
    (name: string, value: mixed) =>
      ValidationError.of(name, value, ...types)

describe('isArray', () => {
  describe('Creates new Contract for one Contracts or validation function', () => {
    it('Returns ValidationError when value is not Array', () => {
      const validate = jest.fn()
      const result: any = isArray(validate)('valueName', null)

      expect(result).toBeInstanceOf(ValidationError)
      expect(result.expectedTypes).toEqual(['Array'])
      expect(validate).toHaveBeenCalledTimes(0)
    })

    it('Returns value when all validators not returns ValidationError', () => {
      const validate = jest.fn()
      const result: any = isArray(validate)('valueName', [1, 2, 3])

      expect(result).toEqual([1, 2, 3])
      expect(validate.mock.calls).toEqual([
        ['valueName[0]', 1],
        ['valueName[1]', 2],
        ['valueName[2]', 3],
      ])
    })

    it('Returns ValidationError in other cases', () => {
      const validate = jest.fn(createError('type'))
      const result: any = isArray(validate)('valueName', [1, 2, 3])

      expect(result).toBeInstanceOf(ValidationError)
      expect(result.expectedTypes).toEqual(['type'])
      expect(validate.mock.calls).toEqual([
        ['valueName[0]', 1],
      ])
    })
  })
})
