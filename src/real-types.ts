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
    export type AnySchema<T extends Schema> = T extends Schema.Any ? any : never

    /**
     * The type function to derive the type of schemas.
     */
    export type ArraySchema<T extends Schema> = T extends Schema.Array<infer U>
        ? TypeOf<U>[]
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type BigIntSchema<T extends Schema> = T extends Schema.BigInt
        ? bigint
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type BooleanSchema<T extends Schema> = T extends Schema.Boolean
        ? boolean
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type ClassSchema<T extends Schema> = T extends Schema.Class<infer U>
        ? U
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type CustomSchema<T extends Schema> = T extends Schema.Custom<
        infer U
    >
        ? U
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type EnumSchema<T extends Schema> = T extends Schema.Enum<infer U>
        ? U
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type FunctionSchema<T extends Schema> = T extends Schema.Function
        ? (...args: any[]) => any
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type NumberSchema<T extends Schema> = T extends Schema.Number
        ? number
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type ObjectSchema<T extends Schema> = T extends Schema.Object<
        infer P,
        infer R,
        infer A
    >
        ? ObjectSchema.Flatten<
              ObjectSchema.KnownProperties<P, R> &
                  ObjectSchema.UnknownProperties<A>
          >
        : never

    export namespace ObjectSchema {
        export type KnownProperties<
            P extends Record<string | number, Schema>,
            R extends keyof P
        > = { [K in Extract<keyof P, R>]: TypeOf<P[K]> } &
            { [K in Exclude<keyof P, R>]?: TypeOf<P[K]> | undefined }
        export type UnknownProperties<A extends boolean> = A extends true
            ? Record<string | number, unknown>
            : {}
        export type Flatten<T> = T extends any
            ? { [P in keyof T]: T[P] }
            : never
    }

    /**
     * The type function to derive the type of schemas.
     */
    export type RecordSchema<T extends Schema> = T extends Schema.Record<
        infer U
    >
        ? Record<number | string | symbol, TypeOf<U>>
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type StringSchema<T extends Schema> = T extends Schema.String
        ? string
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type SymbolSchema<T extends Schema> = T extends Schema.Symbol
        ? symbol
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type TupleSchema<T extends Schema> = T extends Schema.Tuple<infer U>
        ? U extends readonly any[]
            ? { [P in keyof U]: TypeOf<U[P]> }
            : never
        : never

    /**
     * The type function to derive the type of schemas.
     */
    export type UnionSchema<T extends Schema> = T extends Schema.Union<infer U>
        ? TypeOf<U>
        : never
}
