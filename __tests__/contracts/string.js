/* @flow */

import { isString } from '../../src/contracts/string'
import { ValidationError } from '../../src/ValidationError'

describe('isString contract', () => {
  it('Returns value if value is string', () => {
    expect(isString('valueName', 'value')).toBe('value')
  })

  it('Returns ValidationError instance in other cases', () => {
    expect(isString('valueName', undefined)).toBeInstanceOf(ValidationError)
    expect(isString('valueName', null)).toBeInstanceOf(ValidationError)
    expect(isString('valueName', 1)).toBeInstanceOf(ValidationError)
    expect(isString('valueName', () => {})).toBeInstanceOf(ValidationError)
    expect(isString('valueName', [])).toBeInstanceOf(ValidationError)
    expect(isString('valueName', {})).toBeInstanceOf(ValidationError)
  })

  it('expectedTypes property of ValidationError equals ["string"]', () => {
    expect((isString('valueName', null): any).expectedTypes).toEqual(['string'])
  })
})
