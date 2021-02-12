# Validia

[![npm version](https://img.shields.io/npm/v/validia.svg)](https://www.npmjs.com/package/validia)
[![Downloads/month](https://img.shields.io/npm/dm/validia.svg)](http://www.npmtrends.com/validia)
[![Build Status](https://github.com/mysticatea/validia/workflows/CI/badge.svg)](https://github.com/mysticatea/validia/actions)
[![codecov](https://codecov.io/gh/mysticatea/validia/branch/master/graph/badge.svg)](https://codecov.io/gh/mysticatea/validia)
[![Dependency Status](https://david-dm.org/mysticatea/validia.svg)](https://david-dm.org/mysticatea/validia)

A TypeScript-friendly validator.

## 🏁 Goal

This package provides:

- **Compiler**; It compiles schemas then creates a validation function. The validation is fast.
- **Type Assertion**; It can compute the value type of schemas. The validated values will get well typing.
- **Customizable**; You can use a function (with type guard) to define your validation.
- **Localization**; Every validation error is represented with a code and arguments. You can define error messages in your primary language. (Of course, this package provides the default error messages.)

## 💿 Installation

Use [npm] or a compatible tool to install.

```
npm install validia
```

[npm]: https://www.npmjs.com/

## 📖 Usage

### ➡️ One-shot Validation

```ts
import { validate } from "validia";

// 1. Define your schema.
const myOptionSchema = {
  type: "object",
  properties: {
    include: { type: "array", elements: { type: "string" } },
    exclude: { type: "array", elements: { type: "string" } },
  },
} as const; // `as const` is important.

// 2. Validate a value.
declare let value: any;
validate(myOptionSchema, "my value", value);
// The `value` is `{ include?: string[]; exclude?: string[] }` here.
```

Schema is simple objects. But I'd like to recommend using factory functions to utilize input completion and ensure good typings.

### ➡️ Using Factory Functions

```ts
import { schemas as s, validate } from "validia";

// 1. Define your schema.
const myOptionSchema = s.object({
  include: s.array(s.string()),
  exclude: s.array(s.string()),
});

// 2. Validate a value.
declare let value: any;
validate(myOptionSchema, "my value", value);
// The `value` is `{ include?: string[]; exclude?: string[] }` here.
```

The `schemas` is the namespace of factory functions.

### ➡️ Compile Validation Functions

```ts
import { createValidation, schemas as s, Validate } from "validia";

// 1. Define your schema.
const myOptionSchema = s.object({
  include: s.array(s.string()),
  exclude: s.array(s.string()),
});

// 2. Compile validation.
const validate: Validate<typeof myOptionSchema> = createValidation(
  myOptionSchema
);

// 3. Validate a value.
declare let value: any;
validate("my value", value);
// The `value` is `{ include?: string[]; exclude?: string[] }` here.
```

Unfortunately, you have to declare the type of the `validate` function explicitly because of [microsoft/TypeScript#33580](https://github.com/microsoft/TypeScript/issues/33580). In short, the type of [Assertion Functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions) must be decided before the type inference phase.

### ➡️ For Legacy Platform

This package requires ES2018 or later.

If you want to use this package on a legacy platform, use the `validia/es5` entry point along with `core-js`, `@babel/runtime`, and `regenerator-runtime`.
For example:

```js
const { schemas, createValidate } = require("validia/es5");
// ...
```

Or you can merely configure your bundler to transpile this package as well.

The generated code of `createValidation(schema)` function is ES5 then it works well on IE11. (probably!)

## 📚 References

```ts
import {
  // objects
  createValidation,
  validate,
  schemas,
  ValidationError,
  DefaultMessage,

  // types
  Message,
  Schema,
  TypeOf,
  Validate,
} from "validia";
```

### ➡️ function `createValidation(schema, options?)`

Compile the validation function of given schema object.

#### Parameters

- `schema` ... The schema object.
- `options.messages` ... The error messages. Optional. Default is `DefaultMessage`.

#### Return Value

- The validation function of the schema; `(name: string, value: any) => void`.
  - The `name` argument will be used in error messages.
  - If the `value` argument passed validation, the `value` argument gets good typing.
  - If the `value` argument failed validation, the validation function throws a `ValidationError` instance.

### ➡️ function `validate(schema, name, value, options?)`

This is equivalent to `createValidation(schema, options)(name, value)`.

### ➡️ object `schemas`

The schema factories.

- `schemas.any()` ... The schema representing `any`.
- `schemas.array(schema?, options?)` ... The schema representing specific arrays.
  - `schema` is the schema of array elements. Default is `schemas.any()`.
  - `options.maxLength` is the maximum length.
  - `options.minLength` is the minimum length.
  - `options.unique` is the flag to disallow duplicated values.
- `schemas.bigInt(options?)` ... The schema representing specific `bigint` values.
  - `options.maxValue` is the maximum value.
  - `options.minValue` is the minimum value.
- `schemas.boolean()` ... The schema representing `true` or `false`.
- `schemas.instanceOf(constructor)` ... The schema representing instances of a specific class.
  - `constructor` is the class.
- `schemas.custom(name, check)` ... The schema representing a user-defined check.
  - `name` is the name of this check. It will be used in error messages.
  - `check` is the function of this chck; `<T>(value: unknown) => value is T`. Return `true` if the `value` passed validation.
- `schemas.enum(...values)` ... The schema representing any of specific values.
  - `values` is the list of allowed values.
- `schemas.function()` ... The schema representing any functions.
- `schemas.number(options?)` ... The schema representing specific numbers.
  - `options.allowInfinity` is the flag to allow `Infinity` and `-Infinity`.
  - `options.allowNaN` is the flag to allow `NaN`.
  - `options.intOnly` is the flag to disallow non-integers.
  - `options.maxValue` is the maximum value.
  - `options.minValue` is the minimum value.
- `schemas.object(properties?, options?)` ... The schema representing specific objects. If you give no arguments, the returned schema matches any objects.
  - `properties` is the definition of known properties; `Record<string, Schema>`.
  - `options.allowUnknown` is the flag to allow unknown properties.
  - `options.required` is `true` or the array of known property names to be required. If `true`, all known properties are required.
- `schemas.record(schema?)` ... The schema representing specific objects.
  - `schema` is the schema of properties. Default is `schemas.any()`.
- `schemas.string(options?)` ... The schema representing specific strings.
  - `options.maxLength` is the maximum number of characters.
  - `options.minLength` is the minimum number of characters.
  - `options.pattern` is the regular expression of allowed strings.
- `schemas.symbol()` ... The schema representing any symbols.
- `schemas.tuple(...elements)` ... The schema representing specific tuples.
  - `elements` is the schemas of elements.
- `schemas.anyOf(...schemas)` ... The schema representing specific union types.
  - `schemas` is the schema of allowed types.
- `schemas.bigInt64` ... Equivalent to `schemas.bigInt({ maxValue: 9223372036854775807n, minValue: -9223372036854775808n })`.
- `schemas.bigUint64` ... Equivalent to `schemas.bigInt({ maxValue: 18446744073709551615n, minValue: 0 })`.
- `schemas.null` ... Equivalent to `schemas.enum(null)`.
- `schemas.int8` ... Equivalent to `schemas.number({ intOnly: true, maxValue: 127, minValue: -128 })`.
- `schemas.int16` ... Equivalent to `schemas.number({ intOnly: true, maxValue: 32767, minValue: -32768 })`.
- `schemas.int32` ... Equivalent to `schemas.number({ intOnly: true, maxValue: 2147483647, minValue: -2147483648 })`.
- `schemas.uint8` ... Equivalent to `schemas.number({ intOnly: true, maxValue: 255, minValue: 0 })`.
- `schemas.uint16` ... Equivalent to `schemas.number({ intOnly: true, maxValue: 65535, minValue: 0 })`.
- `schemas.uint32` ... Equivalent to `schemas.number({ intOnly: true, maxValue: 4294967295, minValue: 0 })`.

### ➡️ class `ValidationError`

The `Error` class for validation errors.

### ➡️ object `DefaultMessage`

The default error messages.

### ➡️ type `Message`

The interface to define your own error messages.

See [src/message/default-message.ts](./src/message/default-message.ts) for example.

### ➡️ type `Schema`

The types of schemas.

See [src/schema-types.ts](./src/schema-types.ts) for details.

### ➡️ type `TypeOf<T>`

The types for calculating the value type of schemas.

See [src/real-types.ts](./src/real-types.ts) for details.

### ➡️ type `Validate<T>`

The type of validation functions.

```ts
type Validate<T extends Schema> = (
  name: string,
  value: any
) => asserts value is TypeOf<T>;
```

## 📰 Changelog

See [GitHub Releases](https://github.com/mysticatea/validia/releases).

## 🍻 Contributing

Welcome contributing!

Please use GitHub's Issues/PRs.

### Development Tools

- `npm test` runs tests and measures coverage.
- `npm run build` compiles source code to index.mjs, index.js, index.mjs.map, index.js.map, and index.d.ts.
- `npm run clean` removes the temporary files which are created by npm test and npm run build.
- `npm run format` runs Prettier.
- `npm run lint` runs ESLint.
- `npm version <patch|minor|major>` makes a new release.
