/**
 * All schema.
 */
export type Schema =
    | Schema.AnySchema
    | Schema.ArraySchema<Schema>
    | Schema.BigIntSchema
    | Schema.BooleanSchema
    | Schema.ClassSchema<any>
    | Schema.CustomSchema<any>
    | Schema.EnumSchema<any>
    | Schema.FunctionSchema
    | Schema.NumberSchema
    | Schema.ObjectSchema<Record<string, Schema>, any>
    | Schema.RecordSchema<Schema>
    | Schema.StringSchema
    | Schema.SymbolSchema
    | Schema.TupleSchema<readonly Schema[]>
    | Schema.UnionSchema<Schema>

export namespace Schema {
    /**
     * The schema that allows any values.
     */
    export interface AnySchema {
        /** The schema type. */
        readonly type: "any"
    }

    /**
     * The schema for arrays.
     */
    export interface ArraySchema<T extends Schema> {
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
    export interface BigIntSchema {
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
    export interface BooleanSchema {
        /** The schema type. */
        readonly type: "boolean"
    }

    /**
     * The schema for class instances.
     */
    export interface ClassSchema<T> {
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
    export interface CustomSchema<T> {
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
    export interface EnumSchema<T> {
        /** The schema type. */
        readonly type: "enum"
        /** The allowed values. */
        readonly values: readonly T[]
    }

    /**
     * The schema for functions.
     */
    export interface FunctionSchema {
        /** The schema type. */
        readonly type: "function"
    }

    /**
     * The schema for numbers.
     */
    export interface NumberSchema {
        /** The schema type. */
        readonly type: "number"
        /** The maximum value. */
        readonly maxValue?: number
        /** The minimum value. */
        readonly minValue?: number
        /** The flag to disallow non-integer values. */
        readonly intOnly?: boolean
        /** The flag to disallow non-finite numbers. */
        readonly finiteOnly?: boolean
        /** The flag to allow NaN. NaN is disallowed by default. */
        readonly allowNaN?: boolean
    }

    /**
     * The schema for plain objects.
     */
    export interface ObjectSchema<
        TProperties extends Record<string, Schema>,
        TRequired extends keyof TProperties
    > {
        /** The schema type. */
        readonly type: "object"
        /** The schema of known properties. */
        readonly properties: TProperties
        /** The name of required properties. */
        readonly required?: readonly TRequired[]
    }

    /**
     * The schema for record objects.
     */
    export interface RecordSchema<T extends Schema> {
        /** The schema type. */
        readonly type: "record"
        /** The schema of known properties. */
        readonly properties: T
    }

    /**
     * The schema for strings.
     */
    export interface StringSchema {
        /** The schema type. */
        readonly type: "string"
        /** The maximum length. */
        readonly maxLength?: number
        /** The minimum length. */
        readonly minLength?: number
        /** The allowed pattern. */
        readonly pattern?: RegExp
    }

    /**
     * The schema for symbols.
     */
    export interface SymbolSchema {
        /** The schema type. */
        readonly type: "symbol"
    }

    /**
     * The schema for tuples.
     */
    export interface TupleSchema<T extends readonly Schema[]> {
        /** The schema type. */
        readonly type: "tuple"
        /** The schema of elements */
        readonly elements: T
    }

    /**
     * The schema for satisfying any of listed schemas.
     */
    export interface UnionSchema<T extends Schema> {
        /** The schema type. */
        readonly type: "union"
        /** The schemas of allowed values. */
        readonly schemas: readonly T[]
    }
}
