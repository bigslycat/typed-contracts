/* @flow */

import { ValidationError } from '../ValidationError'
import { createContract, type Contract } from '../createContract'

export const isLiteral =
  <T: string | number | boolean>(expected: T): Contract<T> =>
    createContract(
      (valueName, value: mixed): any => {
        if (value === expected) return value
        return ValidationError.of(valueName, value, JSON.stringify(expected))
      },
    )
