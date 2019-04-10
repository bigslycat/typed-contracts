# typed-contracts

[![Build Status][status-img]][status-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/bigslycat/typed-contracts.svg)](https://greenkeeper.io/)

Validation with good Flow and TypeScript type inference

## What it is

`Contract` is a function that receives an arbitrary value and validates it.
`Сontract` returns the value if it passed the validation, or an instance of `ValidationError` otherwise.
Contracts are a 100% guarantee that the data that passed validation matches your expected type definitions.

## Install

npm: `npm install --save typed-contracts`

yarn: `yarn add typed-contracts`

## How it works

All contracts have this interface:

```js
type Contract<+T> = {
  (valueName: string): {
    (value: mixed): ValidationError | T,
    optional(value: mixed): ValidationError | void | T,
    maybe(value: mixed): ValidationError | ?T,
  },

  (valueName: string, value: mixed): ValidationError | T,

  optional(valueName: string): (value: mixed) => ValidationError | void | T,
  optional(valueName: string, value: mixed): ValidationError | void | T,

  maybe(valueName: string): (value: mixed) => ValidationError | ?T,
  maybe(valueName: string, value: mixed): ValidationError | ?T,
}
```

Interface usage:

```js
contract('my value', value)               // => ValidationError | ValidValue
contract.maybe('my value', null)          // => null
contract.maybe('my value', undefined)     // => undefined
contract.maybe('my value', value)         // => ValidationError | ValidValue
contract.optional('my value', undefined)  // => undefined
contract.optional('my value', value)      // => ValidationError | ValidValue
```

Contracts are curried:

```js
contract('my value')(value)
contract('my value').maybe(value)
contract('my value').optional(value)
contract.maybe('my value')(value)
contract.optional('my value')(value)
```

## Contracts can be combined

```js
/* @flow */

const {
  array, object, string,
  union, ValidationError,
} = require('typed-contracts')

type Person = {
  +name: string,
  +gender: 'm' | 'f',
  +friends: $ReadOnlyArray<Person>,
  +email?: string | $ReadOnlyArray<string>,
}

// person returns Person-compatible value or ValidationError
const person = object({
  name: string,
  gender: union('m', 'f'),
  friends: array((valueName, value) => person(valueName, value)),
  email: union(string, array(string)).optional,
})

// We need to control compatibility of the return value type with Person
const userValidate:
  (value: mixed) => Person | ValidationError =
    person('user')

const user = userValidate({ name: 'Vasya' })
```

## Contracts API

### `array`

Aliases: `isArray`, `passArray`, `arr`, `isArr`, `passArr`.

Creates a contract which expects an array of values that are validated by the initial contract.

```js
(...contracts: Array<
  (valueName: string, value: mixed) => ValidationError | T,
>) => Contract
```

### `literal`

Aliases: `isLiteral`, `passLiteral`, `lit`, `isLit`, `passLit`.

Creates a contract which expects a specific string, number or boolean value.

```js
(expected: string | number | boolean) => Contract
```

### `nul`

Aliases: `isNull`, `passNull`.

Creates a contract which expects null.

### `number`

Aliases: `isNumber`, `passNumber`, `num`, `isNum`, `passNum`.

Creates a contract which expects a number.

### `boolean`

Aliases: `isBoolean`, `passBoolean`, `bool`, `isBool`, `passBool`.

Creates a contract which expects a boolean.

### `object`

Aliases: `isObject`, `passObject`, `obj`, `isObj`, `passObj`.

Creates a contract which expects an object whose properties are validated by the corresponding
contracts in the spec.

```js
(spec: { [key: string] (valueName: string, value: mixed) => (ValidationError | T) }) => Contract
```

### `shape`

```js
(spec: { [key: string] (valueName: string, value: mixed) => (ValidationError | void | T) }) => Contract
```

### `objectOf`

Aliases: `isObjectOf`, `passObjectOf`, `objOf`, `isObjOf`, `passObjOf`.

Creates a contract which expects an object whose properties are validated by the corresponding
contracts in the spec.

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

Creates a contract which expects a string.

### `union`

Aliases: `isUnion`, `passUnion`, `uni`, `isUni`, `passUni`.

Creates a contract which expects a value, validating one of the initial contracts.

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

Creates a contract which expects `undefined`.

## Using with ADT

```js
import * as t from 'typed-contracts';
import { type Either, Right, Left } from 'igogo';

const transform = <T>(
  result: t.ValidationError | T,
): Either<t.ValidationError, T> =>
  result instanceof t.ValidationError ? Left(result) : Right(result);

const string = t.string.mapResult(transform);
```

[status-url]: https://travis-ci.org/bigslycat/typed-contracts
[status-img]: https://travis-ci.org/bigslycat/typed-contracts.svg?branch=master
