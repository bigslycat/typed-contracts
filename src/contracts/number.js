/* @flow */

import { ValidationError } from '../ValidationError'
import { createContract } from '../createContract'

export const isNumber = createContract(
  (name: string, value: mixed): number | ValidationError =>
    typeof value === 'number' ?
      value : ValidationError.of(name, value, 'number'),
)
