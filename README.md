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
  array, object, string,
  union, ValidationError,
} = require('typed-contracts')

type Person = {
  name: string,
  gender: 'm' | 'f',
  friends: $ReadOnlyArray<Person>,
  email?: string | $ReadOnlyArray<string>,
}

// person returns Person-compatible value or ValidationError
const person = object({
  name: string,
  gender: union('m', 'f'),
  friends: array((valueName, value) => person(valueName, value)),
  email: union(string, array(string)).optional,
})

// We need to control compatibility of the return value type with Person
const userValidate =
  (value: mixed): Person | ValidationError =>
    person('user', value)

const user = userValidate({ name: 'Vasya' })
```

## Contracts API

### `array`

Aliases: `isArray`, `passArray`, `arr`, `isArr`, `passArr`.

Creates a contract that expects an array of values that are validated by the initial contract.

```js
(contract: (valueName: string, value: mixed) => (ValidationError | T)) => Contract
```

### `literal`

Aliases: `isLiteral`, `passLiteral`, `lit`, `isLit`, `passLit`.

Creates a contract that expects a specific string, number or boolean value.

```js
(expected: string | number | boolean) => Contract
```

### `nul`

Aliases: `isNull`, `passNull`.

Creates a contract that expects null.

### `number`

Aliases: `isNumber`, `passNumber`, `num`, `isNum`, `passNum`.

Creates a contract that expects number.

### `boolean`

Aliases: `isBoolean`, `passBoolean`, `bool`, `isBool`, `passBool`.

Creates a contract that expects boolean.

### `object`

Aliases: `isObject`, `passObject`, `obj`, `isObj`, `passObj`.

Creates a contract that expects an object whose properties are validated by the corresponding
contracts in spec.

```js
(spec: { [key: string] (valueName: string, value: mixed) => (ValidationError | T) }) => Contract
```

### `objectOf`

Aliases: `isObjectOf`, `passObjectOf`, `objOf`, `isObjOf`, `passObjOf`.

Creates a contract that expects an object whose properties are validated by the corresponding
contracts in spec.

```js
(...contracts: Array<
  | string
  | number
  | boolean
  | ((valueName: string, value: mixed) => ValidationError | T),
>) => Contract
```

### `string`

Aliases: `isString`, `passString`, `str`, `isStr`, `passStr`.

Creates a contract that expects string.

### `union`

Aliases: `isUnion`, `passUnion`, `uni`, `isUni`, `passUni`.

Creates a contract that expects value, validating one of the initial contracts.

```js
(...contracts: Array<
  | string
  | number
  | boolean
  | ((valueName: string, value: mixed) => ValidationError | T),
>) => Contract
```

### `undef`

Aliases: `isUndefined`, `passUndefined`, `isUndef`, `passUndef`, `isVoid`, `passVoid`.

Creates a contract that expects undefined.

[status-url]: https://travis-ci.org/bigslycat/typed-contracts
[status-img]: https://travis-ci.org/bigslycat/typed-contracts.svg?branch=master
