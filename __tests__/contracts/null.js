/* @flow */

import { isNull } from '../../src/contracts/null'
import { ValidationError } from '../../src/ValidationError'

describe('isNull contract', () => {
  it('Returns value if value equals null', () => {
    expect(isNull('valueName', null)).toBe(null)
  })

  it('Returns ValidationError instance in other cases', () => {
    expect(isNull('valueName', undefined)).toBeInstanceOf(ValidationError)
    expect(isNull('valueName', 1)).toBeInstanceOf(ValidationError)
    expect(isNull('valueName', 'value')).toBeInstanceOf(ValidationError)
    expect(isNull('valueName', () => {})).toBeInstanceOf(ValidationError)
    expect(isNull('valueName', [])).toBeInstanceOf(ValidationError)
    expect(isNull('valueName', {})).toBeInstanceOf(ValidationError)
  })

  it('expectedTypes property of ValidationError equals ["null"]', () => {
    expect((isNull('valueName', undefined): any).expectedTypes).toEqual(['null'])
  })
})
