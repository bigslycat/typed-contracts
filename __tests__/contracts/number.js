/* @flow */

import { isNumber } from '../../src/contracts/number'
import { ValidationError } from '../../src/ValidationError'

describe('isNumber contract', () => {
  it('Returns value if value is number', () => {
    expect(isNumber('valueName', 1)).toBe(1)
  })

  it('Returns ValidationError instance in other cases', () => {
    expect(isNumber('valueName', undefined)).toBeInstanceOf(ValidationError)
    expect(isNumber('valueName', null)).toBeInstanceOf(ValidationError)
    expect(isNumber('valueName', 'value')).toBeInstanceOf(ValidationError)
    expect(isNumber('valueName', () => {})).toBeInstanceOf(ValidationError)
    expect(isNumber('valueName', [])).toBeInstanceOf(ValidationError)
    expect(isNumber('valueName', {})).toBeInstanceOf(ValidationError)
  })

  it('expectedTypes property of ValidationError equals ["number"]', () => {
    expect((isNumber('valueName', null): any).expectedTypes).toEqual(['number'])
  })
})
