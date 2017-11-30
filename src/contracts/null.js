/* @flow */

import { ValidationError } from '../ValidationError'
import { createContract } from '../createContract'

export const isNull = createContract(
  (name: string, value: mixed): null | ValidationError =>
    value === null ?
      value : ValidationError.of(name, value, 'null'),
)
