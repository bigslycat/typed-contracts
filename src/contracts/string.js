/* @flow */

import { ValidationError } from '../ValidationError'
import { createContract } from '../createContract'

export const isString = createContract(
  (name: string, value: mixed): string | ValidationError =>
    typeof value === 'string' ?
      value : ValidationError.of(name, value, 'string'),
)
