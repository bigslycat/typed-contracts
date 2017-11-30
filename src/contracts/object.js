/* @flow */

import { ValidationError } from '../ValidationError'
import { createContract, type Contract } from '../createContract'

type ExtractReturnType =
  <T>((valueName: string, value: any) => (ValidationError | T)) =>
    $Supertype<T>

export const isObject =
  /* :: <S: { [prop: string]: (valueName: string, value: mixed) => any }> */(
    spec: S,
  ): Contract<$ObjMap<S, ExtractReturnType>> =>
    createContract(
      (valueName, value: mixed) => {
        if (
          !value ||
          typeof value !== 'object' ||
          Array.isArray(value)
        ) return ValidationError.of(valueName, value, 'Object')

        const keys: $Keys<S>[] = Object.keys(spec)

        for (let index = 0; index < keys.length; index += 1) {
          const keyName = keys[index]
          const contract = spec[keyName]
          const currentValue = value[keyName]

          const result = contract(`${valueName}.${keyName}`, currentValue)
          if (result instanceof ValidationError) return result
        }

        return value
      },
    )
