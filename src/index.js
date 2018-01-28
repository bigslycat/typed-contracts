/* @flow */

export { isArray } from './contracts/array'
export { isLiteral } from './contracts/literal'
export { isNull } from './contracts/null'
export { isNumber } from './contracts/number'
export { isObject } from './contracts/object'
export { isString } from './contracts/string'
export { isUnion } from './contracts/union'
export { isUndefined, isVoid } from './contracts/void'

export { createContract } from './createContract'
export type { Contract } from './createContract'
export { ValidationError } from './ValidationError'
