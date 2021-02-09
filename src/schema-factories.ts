import { Cache } from "./cache"
import {
    MaxArrayLength,
    MaxInt16,
    MaxInt32,
    MaxInt8,
    MaxStringLength,
    MaxUint16,
    MaxUint32,
    MaxUint8,
    MinInt16,
    MinInt32,
    MinInt8,
} from "./constants"
import { Schema } from "./schema-types"

const any: Schema.AnySchema = { type: "any" }
const anyBigInt: Schema.BigIntSchema = {
    type: "bigint",
    minValue: undefined,
    maxValue: undefined,
}
const bigInt64: Schema.BigIntSchema = {
    type: "bigint",
    minValue: BigInt("-9223372036854775808"),
    maxValue: BigInt("9223372036854775807"),
}
const bigUint64: Schema.BigIntSchema = {
    type: "bigint",
    minValue: BigInt("0"),
    maxValue: BigInt("18446744073709551615"),
}
const anyBoolean: Schema.BooleanSchema = { type: "boolean" }
const constantNull: Schema.EnumSchema<null> = { type: "enum", values: [null] }
const anyFunction: Schema.FunctionSchema = { type: "function" }
const anyNumber: Schema.NumberSchema = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: false,
    maxValue: undefined,
    minValue: undefined,
}
const anyFiniteNumber: Schema.NumberSchema = {
    type: "number",
    allowNaN: false,
    finiteOnly: true,
    intOnly: false,
    maxValue: undefined,
    minValue: undefined,
}
const anyInteger: Schema.NumberSchema = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: true,
    maxValue: undefined,
    minValue: undefined,
}
const int8: Schema.NumberSchema = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: true,
    maxValue: MaxInt8,
    minValue: MinInt8,
}
const int16: Schema.NumberSchema = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: true,
    maxValue: MaxInt16,
    minValue: MinInt16,
}
const int32: Schema.NumberSchema = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: true,
    maxValue: MaxInt32,
    minValue: MinInt32,
}
const uint8: Schema.NumberSchema = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: true,
    maxValue: MaxUint8,
    minValue: 0,
}
const uint16: Schema.NumberSchema = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: true,
    maxValue: MaxUint16,
    minValue: 0,
}
const uint32: Schema.NumberSchema = {
    type: "number",
    allowNaN: false,
    finiteOnly: false,
    intOnly: true,
    maxValue: MaxUint32,
    minValue: 0,
}
const anyObject: Schema.RecordSchema<Schema.AnySchema> = {
    type: "record",
    properties: any,
}
const anyString: Schema.StringSchema = {
    type: "string",
    maxLength: MaxStringLength,
    minLength: 0,
    pattern: undefined,
}
const anySymbol: Schema.SymbolSchema = { type: "symbol" }
const anyArrayCache = new Cache(
    (elements: Schema): Schema.ArraySchema<Schema> => ({
        type: "array",
        elements,
        maxLength: MaxArrayLength,
        minLength: 0,
        unique: false,
    }),
)
const classCache = new Cache(
    (
        // eslint-disable-next-line no-shadow
        constructor: Schema.ClassSchema<any>["constructor"],
    ): Schema.ClassSchema<any> => ({
        type: "class",
        constructor,
    }),
)

/* eslint-disable class-methods-use-this */
class SchemaFactories {
    /**
     * The schema for any values.
     */
    any(): Schema.AnySchema {
        return any
    }

    /**
     * The schema for array instances.
     * @param elements The schema of element types.
     * @param options The options.
     */
    array(): Schema.ArraySchema<Schema.AnySchema>

    /**
     * The schema for array instances.
     * @param elements The schema of element types.
     * @param options The options.
     */
    array<T extends Schema>(
        elements: T,
        options?: Omit<Schema.ArraySchema<T>, "type" | "elements">,
    ): Schema.ArraySchema<T>

    // Implementation
    array(
        elements: Schema = any,
        {
            maxLength = MaxArrayLength,
            minLength = 0,
            unique = false,
        }: Omit<Schema.ArraySchema<any>, "type" | "elements"> = {},
    ): Schema.ArraySchema<Schema> {
        if (maxLength >= MaxArrayLength && minLength <= 0 && !unique) {
            return anyArrayCache.get(elements)
        }
        return { type: "array", elements, maxLength, minLength, unique }
    }

    /**
     * The schema for bigint values.
     * @param options The options.
     */
    bigInt({
        maxValue,
        minValue,
    }: Omit<Schema.BigIntSchema, "type"> = {}): Schema.BigIntSchema {
        if (maxValue === undefined && minValue === undefined) {
            return anyBigInt
        }
        return { type: "bigint", maxValue, minValue }
    }

    /**
     * The schema for 64 bits signed integers.
     */
    bigInt64 = bigInt64

    /**
     * The schema for 64 bits unsigned integers.
     */
    bigUint64 = bigUint64

    /**
     * The schema for true or false.
     */
    boolean(): Schema.BooleanSchema {
        return anyBoolean
    }

    /**
     * The schema for specific class instances.
     * @param constructor The constructor to use `instanceof` operations.
     */
    instanceOf<T>(
        // eslint-disable-next-line no-shadow
        constructor: Schema.ClassSchema<T>["constructor"],
    ): Schema.ClassSchema<T> {
        return classCache.get(constructor)
    }

    /**
     * The schema for user-defined checks.
     * @param name The name of the valid values. This name will be shown in error messages.
     * @param check The check.
     */
    custom<T>(name: string, check: (x: any) => x is T): Schema.CustomSchema<T> {
        return { type: "custom", check, name }
    }

    /**
     * The schema for any of listed values.
     * @param firstValue One of allowed values.
     * @param restValues Rest of allowed values.
     */
    enum<T, U extends readonly any[]>(
        firstValue: T,
        ...restValues: U
    ): Schema.EnumSchema<T | U[number]>

    // Implementation
    enum<T extends readonly any[]>(...values: T): Schema.EnumSchema<T[number]> {
        if (values.length === 1 && values[0] === null) {
            return constantNull as Schema.EnumSchema<any>
        }
        return { type: "enum", values }
    }

    /**
     * The schema for null.
     * Equivalent to `schemas.const(null)` and `schemas.enum(null)`.
     */
    null = constantNull

    /**
     * The schema for any functions.
     */
    function(): Schema.FunctionSchema {
        return anyFunction
    }

    /**
     * The schema for numbers.
     * @param options The options.
     */
    number({
        allowNaN = false,
        finiteOnly = false,
        intOnly = false,
        maxValue,
        minValue,
    }: Omit<Schema.NumberSchema, "type"> = {}): Schema.NumberSchema {
        if (!allowNaN && maxValue === undefined && minValue === undefined) {
            if (intOnly) {
                if (!finiteOnly) {
                    return anyInteger
                }
            } else if (finiteOnly) {
                return anyFiniteNumber
            } else {
                return anyNumber
            }
        }
        return {
            type: "number",
            allowNaN,
            finiteOnly,
            intOnly,
            maxValue,
            minValue,
        }
    }

    /**
     * The schema for 8 bits signed integers.
     */
    int8 = int8

    /**
     * The schema for 16 bits signed integers.
     */
    int16 = int16

    /**
     * The schema for 32 bits signed integers.
     */
    int32 = int32

    /**
     * The schema for 8 bits unsigned integers.
     */
    uint8 = uint8

    /**
     * The schema for 16 bits unsigned integers.
     */
    uint16 = uint16

    /**
     * The schema for 32 bits unsigned integers.
     */
    uint32 = uint32

    /**
     * The schema for any objects.
     */
    object(): Schema.RecordSchema<Schema.AnySchema>

    /**
     * The schema for plain objects. All properties are required.
     * @param properties The schema of known properties.
     */
    object<TProperties extends Record<any, Schema>>(
        properties: TProperties,
    ): Schema.ObjectSchema<TProperties, keyof TProperties>

    // Implementation
    object(
        properties?: Record<any, Schema>,
    ):
        | Schema.RecordSchema<Schema.AnySchema>
        | Schema.ObjectSchema<Record<any, Schema>, any> {
        if (properties === undefined) {
            return anyObject
        }
        return { type: "object", properties, required: Object.keys(properties) }
    }

    /**
     * The schema for plain objects. All properties are optional.
     * @param properties The schema of known properties.
     */
    partialObject<TProperties extends Record<any, Schema>>(
        properties: TProperties,
    ): Schema.ObjectSchema<TProperties, never>

    /**
     * The schema for plain objects.
     * @param properties The schema of known properties.
     * @param required The names of required properties.
     */
    partialObject<
        TProperties extends Record<any, Schema>,
        TRequired extends (keyof TProperties)[]
    >(
        properties: TProperties,
        required: TRequired,
    ): Schema.ObjectSchema<TProperties, TRequired[number]>

    // Implementation
    partialObject<
        TProperties extends Record<any, Schema>,
        TRequired extends (keyof TProperties)[]
    >(
        properties: TProperties,
        required?: TRequired,
    ): Schema.ObjectSchema<TProperties, TRequired[number]> {
        if (required && required.length > 0) {
            return { type: "object", properties, required }
        }
        return { type: "object", properties }
    }

    /**
     * The schema for any objects.
     */
    record(): Schema.RecordSchema<Schema.AnySchema>

    /**
     * The schema for plain objects.
     * @param properties The schema of properties.
     */
    record<T extends Schema>(properties: T): Schema.RecordSchema<T>

    // Implementation
    record(properties: Schema = any): Schema.RecordSchema<Schema> {
        if (properties.type === "any") {
            return anyObject
        }
        return { type: "record", properties }
    }

    /**
     * The schema for strings.
     * @param options The options.
     */
    string({
        maxLength = MaxStringLength,
        minLength = 0,
        pattern,
    }: Omit<Schema.StringSchema, "type"> = {}): Schema.StringSchema {
        if (maxLength >= MaxStringLength && minLength <= 0 && pattern == null) {
            return anyString
        }
        return { type: "string", maxLength, minLength, pattern }
    }

    /**
     * The schema for any symbols.
     */
    symbol(): Schema.SymbolSchema {
        return anySymbol
    }

    /**
     * The schema for tuples.
     * @param elements The schema of elements.
     */
    tuple<T extends readonly Schema[]>(...elements: T): Schema.TupleSchema<T> {
        return { type: "tuple", elements }
    }

    /**
     * The schema for any of listed schemas.
     * @param firstSchema One of allowed schemas.
     * @param restSchemas Rest of allowed schemas.
     */
    anyOf<T extends Schema, U extends readonly Schema[]>(
        firstSchema: T,
        ...restSchemas: U
    ): Schema.UnionSchema<T | U[number]>

    // Implementation
    anyOf<T extends readonly Schema[]>(
        ...schemas: T
    ): Schema.UnionSchema<T[number]> {
        return { type: "union", schemas }
    }
}
/* eslint-enable class-methods-use-this */

/**
 * The schema factories.
 */
export const schemas = Object.freeze(new SchemaFactories())
