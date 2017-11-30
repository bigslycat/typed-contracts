/* @flow */

import { ValidationError } from '../src/ValidationError'

describe('ValidationError', () => {
  it('Have name, valueName, value, expectedTypes and message properties', () => {
    const error = new ValidationError('valueName', 'value', 'type')

    expect(error.name).toBe('ValidationError')
    expect(error.valueName).toBe('valueName')
    expect(error.value).toBe('value')
    expect(error.expectedTypes).toEqual(['type'])
    expect(error.message).toBe('valueName must be type, but "value" (string) given')
  })

  it('Have factory of()', () => {
    const Mock: any = jest.fn()

    Mock.of = ValidationError.of

    const error = Mock.of('valueName', 'value', 'type')
    expect(Mock).lastCalledWith('valueName', 'value', 'type')
    expect(Mock.mock.instances[0]).toBe(error)
  })

  it('Have name, valueName, value, expectedTypes and message properties', () => {
    const error = new ValidationError('valueName', 'value', 'type')

    expect(error.name).toBe('ValidationError')
    expect(error.valueName).toBe('valueName')
    expect(error.value).toBe('value')
    expect(error.expectedTypes).toEqual(['type'])
    expect(error.message).toBe('valueName must be type, but "value" (string) given')
  })

  it('Can receive 1 and more types', () => {
    const error1 = new ValidationError('valueName', 'value', 'type1')
    const error2 = new ValidationError('valueName', 'value', 'type1', 'type2')
    const error3 = new ValidationError('valueName', 'value', 'type1', 'type2', 'type3')

    expect(error1.message).toBe('valueName must be type1, but "value" (string) given')
    expect(error2.message).toBe('valueName must be type1 or type2, but "value" (string) given')
    expect(error3.message).toBe('valueName must be type1, type2 or type3, but "value" (string) given')
  })
})
