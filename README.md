# typed-contracts [![Build Status][status-img]][status-url]

Validation with good type inference

## What is it

`Contract` is a function that receives an arbitrary value and validates it.
`Сontract` returns this value if it passed the validation, or `ValidationError` instance if not.
Contracts are a 100% guarantee that the data that passed validation matches your expeted type definitions.

## Install

npm: `npm install --save typed-contracts`

yarn: `yarn add typed-contracts`

## How it work

All contracts have this interface:

```js
contract('my value', validValiue)           // => validValiue
contract('my value', invalidValue)          // => ValidationError instance
contract.maybe('my value', null)            // => null
contract.maybe('my value', undefined)       // => undefined
contract.maybe('my value', invalidValue)    // => ValidationError instance
contract.optional('my value', undefined)    // => undefined
contract.optional('my value', invalidValue) // => ValidationError instance

const namedContract = contract.bindName('my value')

namedContract(validValiue)                  // => validValiue
namedContract(invalidValue)                 // => ValidationError instance
namedContract.maybe(null)                   // => null
namedContract.maybe(undefined)              // => undefined
namedContract.maybe(invalidValue)           // => ValidationError instance
namedContract.optional(undefined)           // => undefined
namedContract.optional(invalidValue)        // => ValidationError instance
```

## Contracts can be combined

```js
/* @flow */

const {
  isArray, isLiteral, isObject,
  isString, isUnion, ValidationError
} = require('typed-contracts')

type Person = {
  name: string,
  gender: 'm' | 'f',
  friends: Person[],
  email?: string,
}

// isPerson returns Person-compatibile value or ValidationError
const isPerson = isObject({
  name: isString,
  gender: isUnion(isLiteral('m'), isLiteral('f')),
  friends: isArray((valueName, value) => isPerson(valueName, value)),
  email: isString.optional,
})

// We need to control compatibility of the return value type with Person
const userValidate =
  (value: mixed): Person | ValidationError =>
    isPerson('user', value)

const user = userValidate({ name: 'Vasya' })
```

## Contracts API

### `isArray`

Creates a contract that expects an array of values that are validated by the initial contract.

```js
(contract: (valueName: string, value: mixed) => (ValidationError | T)) => Contract
```

### `isLiteral`

Creates a contract that expects a specific string or number value.

```js
(expected: string | number) => Contract
```

### `isNull`

Creates a contract that expects null.

### `isNumber`

Creates a contract that expects number.

### `isObject`

Creates a contract that expects an object whose properties are validated by the corresponding
contracts in spec.

```js
(spec: { [key: string] (valueName: string, value: mixed) => (ValidationError | T) }) => Contract
```

### `isString`

Creates a contract that expects string.

### `isUnion`

Creates a contract that expects value, validating one of the initial contracts.

```js
(...contracts: Array<(valueName: string, value: mixed) => (ValidationError | T)>) => Contract
```

### `isVoid` or `isUndefined`

Creates a contract that expects undefined.

[status-url]: https://travis-ci.org/bigslycat/typed-contracts
[status-img]: https://travis-ci.org/bigslycat/typed-contracts.svg?branch=master
