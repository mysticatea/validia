import { Schema } from "./schema-types"

/**
 * The type function to derive the type of schemas.
 */
export type TypeOf<T extends Schema> =
    | TypeOf.AnySchema<T>
    | TypeOf.ArraySchema<T>
    | TypeOf.BigIntSchema<T>
    | TypeOf.BooleanSchema<T>
    | TypeOf.ClassSchema<T>
    | TypeOf.CustomSchema<T>
    | TypeOf.EnumSchema<T>
    | TypeOf.FunctionSchema<T>
    | TypeOf.NumberSchema<T>
    | TypeOf.ObjectSchema<T>
    | TypeOf.RecordSchema<T>
    | TypeOf.StringSchema<T>
    | TypeOf.SymbolSchema<T>
    | TypeOf.TupleSchema<T>
    | TypeOf.UnionSchema<T>

export namespace TypeOf {
    /**
     * The type function to derive the type of schemas.
     */
    export type AnySchema<T extends Schema> = T extends Schema.AnySchema
        ? any
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type ArraySchema<T extends Schema> = T extends Schema.ArraySchema<
        infer U
    >
        ? TypeOf<U>[]
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type BigIntSchema<T extends Schema> = T extends Schema.BigIntSchema
        ? bigint
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type BooleanSchema<T extends Schema> = T extends Schema.BooleanSchema
        ? boolean
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type ClassSchema<T extends Schema> = T extends Schema.ClassSchema<
        infer U
    >
        ? U
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type CustomSchema<T extends Schema> = T extends Schema.CustomSchema<
        infer U
    >
        ? U
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type EnumSchema<T extends Schema> = T extends Schema.EnumSchema<
        infer U
    >
        ? U
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type FunctionSchema<
        T extends Schema
    > = T extends Schema.FunctionSchema ? (...args: any[]) => any : never

    /**
     * The type function to derive the type of schemas.
     */
    export type NumberSchema<T extends Schema> = T extends Schema.NumberSchema
        ? number
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type ObjectSchema<T extends Schema> = T extends Schema.ObjectSchema<
        infer P,
        infer R
    >
        ? ObjectSchema.Flatten<
              { [K in Extract<keyof P, R>]: TypeOf<P[K]> } &
                  { [K in Exclude<keyof P, R>]?: TypeOf<P[K]> | undefined }
          >
        : never

    export namespace ObjectSchema {
        export type Flatten<T> = T extends any
            ? { [P in keyof T]: T[P] }
            : never
    }

    /**
     * The type function to derive the type of schemas.
     */
    export type RecordSchema<T extends Schema> = T extends Schema.RecordSchema<
        infer U
    >
        ? Record<number | string | symbol, TypeOf<U>>
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type StringSchema<T extends Schema> = T extends Schema.StringSchema
        ? string
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type SymbolSchema<T extends Schema> = T extends Schema.SymbolSchema
        ? symbol
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type TupleSchema<T extends Schema> = T extends Schema.TupleSchema<
        infer U
    >
        ? U extends readonly any[]
            ? { [P in keyof U]: TypeOf<U[P]> }
            : never
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type UnionSchema<T extends Schema> = T extends Schema.UnionSchema<
        infer U
    >
        ? TypeOf<U>
        : never
}
