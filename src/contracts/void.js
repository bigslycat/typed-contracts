/* @flow */

import { ValidationError } from '../ValidationError'
import { createContract } from '../createContract'

export const isVoid = createContract(
  (name: string, value: mixed): void | ValidationError =>
    value === undefined ?
      value : ValidationError.of(name, value, 'void'),
)

export const isUndefined = isVoid
