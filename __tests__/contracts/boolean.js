/* @flow */

import { isBoolean } from '../../src/contracts/boolean'
import { ValidationError } from '../../src/ValidationError'

describe('isBoolean contract', () => {
  it('Returns value if value is boolean', () => {
    expect(isBoolean('true bool', true)).toBe(true)
    expect(isBoolean('false bool', false)).toBe(false)
  })

  it('Returns ValidationError instance in other cases', () => {
    expect(isBoolean('valueName', undefined)).toBeInstanceOf(ValidationError)
    expect(isBoolean('valueName', null)).toBeInstanceOf(ValidationError)
    expect(isBoolean('valueName', 'value')).toBeInstanceOf(ValidationError)
    expect(isBoolean('valueName', () => {})).toBeInstanceOf(ValidationError)
    expect(isBoolean('valueName', [])).toBeInstanceOf(ValidationError)
    expect(isBoolean('valueName', {})).toBeInstanceOf(ValidationError)
    expect(isBoolean('valueName', Symbol('symbol'))).toBeInstanceOf(ValidationError)
    expect(isBoolean('valueName', 1)).toBeInstanceOf(ValidationError)
    expect(isBoolean('valueName', new Map())).toBeInstanceOf(ValidationError)
    expect(isBoolean('valueName', new Set())).toBeInstanceOf(ValidationError)
  })

  it('expectedTypes property of ValidationError equals ["boolean"]', () => {
    expect((isBoolean('valueName', null): any).expectedTypes).toEqual(['boolean'])
  })
})
