/**
 * All schema.
 */
export type Schema =
    | Schema.Any
    | Schema.Array<Schema>
    | Schema.BigInt
    | Schema.Boolean
    | Schema.Class<any>
    | Schema.Custom<any>
    | Schema.Enum<any>
    | Schema.Function
    | Schema.Number
    | Schema.Object<Record<string, Schema>, any, boolean>
    | Schema.Record<Schema>
    | Schema.String
    | Schema.Symbol
    | Schema.Tuple<readonly Schema[]>
    | Schema.Union<Schema>

export namespace Schema {
    /**
     * The schema that allows any values.
     */
    export interface Any {
        /** The schema type. */
        readonly type: "any"
    }

    /**
     * The schema for arrays.
     */
    export interface Array<T extends Schema> {
        /** The schema type. */
        readonly type: "array"
        /** The schema of elements. */
        readonly elements: T
        /** The maximum length. */
        readonly maxLength?: number
        /** The minimum length. */
        readonly minLength?: number
        /** The flag to disallow duplicated values. */
        readonly unique?: boolean
    }

    /**
     * The schema for bigint values.
     */
    export interface BigInt {
        /** The schema type. */
        readonly type: "bigint"
        /** The maximum value. */
        readonly maxValue?: bigint
        /** The minimum value. */
        readonly minValue?: bigint
    }

    /**
     * The schema for arrays.
     */
    export interface Boolean {
        /** The schema type. */
        readonly type: "boolean"
    }

    /**
     * The schema for class instances.
     */
    export interface Class<T> {
        /** The schema type. */
        readonly type: "class"
        /** The constructor of allowed instances. */
        readonly constructor: {
            new (...args: any[]): T
            prototype: T
            name: string
        }
    }

    /**
     * The schema for user-defined checks.
     */
    export interface Custom<T> {
        /** The schema type. */
        readonly type: "custom"
        /** The name to show in error messages. */
        readonly name: string
        /** The check logic. */
        readonly check: (x: unknown) => x is T
    }

    /**
     * The schema for any of listed values.
     */
    export interface Enum<T> {
        /** The schema type. */
        readonly type: "enum"
        /** The allowed values. */
        readonly values: readonly T[]
    }

    /**
     * The schema for functions.
     */
    export interface Function {
        /** The schema type. */
        readonly type: "function"
    }

    /**
     * The schema for numbers.
     */
    export interface Number {
        /** The schema type. */
        readonly type: "number"
        /** The flag to allow `Infinity` and `-Infinity`. Infinities are disallowed by default. */
        readonly allowInfinity?: boolean
        /** The flag to allow `NaN`. `NaN` is disallowed by default. */
        readonly allowNaN?: boolean
        /** The flag to disallow non-integer values. */
        readonly intOnly?: boolean
        /** The maximum value. */
        readonly maxValue?: number
        /** The minimum value. */
        readonly minValue?: number
    }

    /**
     * The schema for plain objects.
     */
    export interface Object<
        TProperties extends globalThis.Record<string | number, Schema>,
        TRequired extends keyof TProperties,
        TAllowUnknown extends boolean
    > {
        /** The schema type. */
        readonly type: "object"
        /** The flag to allow unknown properties. */
        readonly allowUnknown?: TAllowUnknown
        /** The schema of known properties. */
        readonly properties: TProperties
        /** The name of required properties. */
        readonly required?: readonly TRequired[]
    }

    /**
     * The schema for record objects.
     */
    export interface Record<T extends Schema> {
        /** The schema type. */
        readonly type: "record"
        /** The schema of known properties. */
        readonly properties: T
    }

    /**
     * The schema for strings.
     */
    export interface String {
        /** The schema type. */
        readonly type: "string"
        /** The maximum length. */
        readonly maxLength?: number
        /** The minimum length. */
        readonly minLength?: number
        /** The allowed pattern. */
        readonly pattern?: globalThis.RegExp
    }

    /**
     * The schema for symbols.
     */
    export interface Symbol {
        /** The schema type. */
        readonly type: "symbol"
    }

    /**
     * The schema for tuples.
     */
    export interface Tuple<T extends readonly Schema[]> {
        /** The schema type. */
        readonly type: "tuple"
        /** The schema of elements */
        readonly elements: T
    }

    /**
     * The schema for satisfying any of listed schemas.
     */
    export interface Union<T extends Schema> {
        /** The schema type. */
        readonly type: "union"
        /** The schemas of allowed values. */
        readonly schemas: readonly T[]
    }
}
