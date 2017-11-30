/* @flow */

import { isVoid, isUndefined } from '../../src/contracts/void'
import { ValidationError } from '../../src/ValidationError'

describe('isVoid contract', () => {
  it('Have alias isUndefined', () => {
    expect(isVoid).toBe(isUndefined)
  })

  it('Returns value if value equals undefined', () => {
    expect(isVoid('valueName', undefined)).toBe(undefined)
  })

  it('Returns ValidationError instance in other cases', () => {
    expect(isVoid('valueName', null)).toBeInstanceOf(ValidationError)
    expect(isVoid('valueName', 1)).toBeInstanceOf(ValidationError)
    expect(isVoid('valueName', 'value')).toBeInstanceOf(ValidationError)
    expect(isVoid('valueName', () => {})).toBeInstanceOf(ValidationError)
    expect(isVoid('valueName', [])).toBeInstanceOf(ValidationError)
    expect(isVoid('valueName', {})).toBeInstanceOf(ValidationError)
  })

  it('expectedTypes property of ValidationError equals ["void"]', () => {
    expect((isVoid('valueName', null): any).expectedTypes).toEqual(['void'])
  })
})
