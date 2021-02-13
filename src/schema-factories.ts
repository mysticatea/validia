import {
    MaxArrayLength,
    MaxInt16,
    MaxInt32,
    MaxInt64,
    MaxInt8,
    MaxStringLength,
    MaxUint16,
    MaxUint32,
    MaxUint64,
    MaxUint8,
    MinInt16,
    MinInt32,
    MinInt64,
    MinInt8,
} from "./constants"
import { Schema } from "./schema-types"

/* eslint-disable class-methods-use-this */
class SchemaFactories {
    /**
     * The schema for any values.
     */
    any(): Schema.Any {
        return { type: "any" }
    }

    /**
     * The schema for array instances.
     * @param elements The schema of element types.
     * @param options The options.
     */
    array(): Schema.Array<Schema.Any>

    /**
     * The schema for array instances.
     * @param elements The schema of element types.
     * @param options The options.
     */
    array<T extends Schema>(
        elements: T,
        options?: Omit<Schema.Array<T>, "type" | "elements">,
    ): Schema.Array<T>

    // Implementation
    array(
        elements: Schema = { type: "any" },
        {
            maxLength = MaxArrayLength,
            minLength = 0,
            unique = false,
        }: Omit<Schema.Array<any>, "type" | "elements"> = {},
    ): Schema.Array<Schema> {
        return { type: "array", elements, maxLength, minLength, unique }
    }

    /**
     * The schema for bigint values.
     * @param options The options.
     */
    bigInt({
        maxValue,
        minValue,
    }: Omit<Schema.BigInt, "type"> = {}): Schema.BigInt {
        return { type: "bigint", maxValue, minValue }
    }

    /**
     * The schema for 64 bits signed integers.
     */
    bigInt64: Schema.BigInt = {
        type: "bigint",
        minValue: MinInt64,
        maxValue: MaxInt64,
    }

    /**
     * The schema for 64 bits unsigned integers.
     */
    bigUint64: Schema.BigInt = {
        type: "bigint",
        minValue: BigInt("0"),
        maxValue: MaxUint64,
    }

    /**
     * The schema for true or false.
     */
    boolean(): Schema.Boolean {
        return { type: "boolean" }
    }

    /**
     * The schema for specific class instances.
     * @param constructor The constructor to use `instanceof` operations.
     */
    instanceOf<T>(
        // eslint-disable-next-line no-shadow
        constructor: Schema.Class<T>["constructor"],
    ): Schema.Class<T> {
        return { type: "class", constructor }
    }

    /**
     * The schema for user-defined checks.
     * @param name The name of the valid values. This name will be shown in error messages.
     * @param check The check.
     */
    custom<T>(name: string, check: (x: any) => x is T): Schema.Custom<T> {
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
    ): Schema.Enum<T | U[number]>

    // Implementation
    enum<T extends readonly any[]>(...values: T): Schema.Enum<T[number]> {
        return { type: "enum", values }
    }

    /**
     * The schema for null.
     * Equivalent to `schemas.enum(null)`.
     */
    null: Schema.Enum<null> = { type: "enum", values: [null] }

    /**
     * The schema for any functions.
     */
    function(): Schema.Function {
        return { type: "function" }
    }

    /**
     * The schema for numbers.
     * @param options The options.
     */
    number({
        allowInfinity = false,
        allowNaN = false,
        intOnly = false,
        maxValue,
        minValue,
    }: Omit<Schema.Number, "type"> = {}): Schema.Number {
        return {
            type: "number",
            allowInfinity,
            allowNaN,
            intOnly,
            maxValue,
            minValue,
        }
    }

    /**
     * The schema for 8 bits signed integers.
     */
    int8: Schema.Number = {
        type: "number",
        allowInfinity: false,
        allowNaN: false,
        intOnly: true,
        maxValue: MaxInt8,
        minValue: MinInt8,
    }

    /**
     * The schema for 16 bits signed integers.
     */
    int16: Schema.Number = {
        type: "number",
        allowInfinity: false,
        allowNaN: false,
        intOnly: true,
        maxValue: MaxInt16,
        minValue: MinInt16,
    }

    /**
     * The schema for 32 bits signed integers.
     */
    int32: Schema.Number = {
        type: "number",
        allowInfinity: false,
        allowNaN: false,
        intOnly: true,
        maxValue: MaxInt32,
        minValue: MinInt32,
    }

    /**
     * The schema for 8 bits unsigned integers.
     */
    uint8: Schema.Number = {
        type: "number",
        allowInfinity: false,
        allowNaN: false,
        intOnly: true,
        maxValue: MaxUint8,
        minValue: 0,
    }

    /**
     * The schema for 16 bits unsigned integers.
     */
    uint16: Schema.Number = {
        type: "number",
        allowInfinity: false,
        allowNaN: false,
        intOnly: true,
        maxValue: MaxUint16,
        minValue: 0,
    }

    /**
     * The schema for 32 bits unsigned integers.
     */
    uint32: Schema.Number = {
        type: "number",
        allowInfinity: false,
        allowNaN: false,
        intOnly: true,
        maxValue: MaxUint32,
        minValue: 0,
    }

    /**
     * The schema for any objects.
     */
    object(): Schema.Object<{}, never, true>

    /**
     * The schema for plain objects. All known properties are optional.
     * @param properties The schema of known properties.
     */
    object<TProperties extends Record<string | number, Schema>>(
        properties: TProperties,
    ): Schema.Object<TProperties, never, false>

    /**
     * The schema for plain objects. All known properties are optional.
     * @param properties The schema of known properties.
     * @param options The options.
     */
    object<TProperties extends Record<string | number, Schema>>(
        properties: TProperties,
        options: Record<string | number | symbol, never>,
    ): Schema.Object<TProperties, never, false>

    /**
     * The schema for plain objects. All known properties are optional.
     * @param properties The schema of known properties.
     * @param options The options.
     */
    object<
        TProperties extends Record<string | number, Schema>,
        TAllowUnknown extends boolean
    >(
        properties: TProperties,
        options: { allowUnknown: TAllowUnknown },
    ): Schema.Object<TProperties, never, TAllowUnknown>

    /**
     * The schema for plain objects. All known properties are required.
     * @param properties The schema of known properties.
     * @param options The options.
     */
    object<TProperties extends Record<string | number, Schema>>(
        properties: TProperties,
        options: { required: true },
    ): Schema.Object<TProperties, keyof TProperties, false>

    /**
     * The schema for plain objects. Specified known properties are required.
     * @param properties The schema of known properties.
     * @param options The options.
     */
    object<
        TProperties extends Record<string | number, Schema>,
        TRequired extends keyof TProperties
    >(
        properties: TProperties,
        options: { required: readonly TRequired[] },
    ): Schema.Object<TProperties, TRequired, false>

    /**
     * The schema for plain objects. All known properties are required.
     * @param properties The schema of known properties.
     * @param options The options.
     */
    object<
        TProperties extends Record<string | number, Schema>,
        TAllowUnknown extends boolean
    >(
        properties: TProperties,
        options: { allowUnknown: TAllowUnknown; required: true },
    ): Schema.Object<TProperties, keyof TProperties, TAllowUnknown>

    /**
     * The schema for plain objects. Specific properties are required.
     * @param properties The schema of known properties.
     * @param options The options.
     */
    object<
        TProperties extends Record<string | number, Schema>,
        TRequired extends keyof TProperties,
        TAllowUnknown extends boolean
    >(
        properties: TProperties,
        options: {
            allowUnknown: TAllowUnknown
            required: readonly TRequired[]
        },
    ): Schema.Object<TProperties, TRequired, TAllowUnknown>

    // Implementation
    object(
        properties?: Record<string | number, Schema>,
        {
            allowUnknown = false,
            required = [],
        }: { allowUnknown?: boolean; required?: true | readonly string[] } = {},
    ): Schema.Object<Record<string | number, Schema>, any, boolean> {
        if (properties === undefined) {
            return {
                type: "object",
                allowUnknown: true,
                properties: {},
                required: [],
            }
        }
        return {
            type: "object",
            allowUnknown,
            properties,
            required: required === true ? Object.keys(properties) : required,
        }
    }

    /**
     * The schema for any objects.
     */
    record(): Schema.Record<Schema.Any>

    /**
     * The schema for plain objects.
     * @param properties The schema of properties.
     */
    record<T extends Schema>(properties: T): Schema.Record<T>

    // Implementation
    record(properties: Schema = { type: "any" }): Schema.Record<Schema> {
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
    }: Omit<Schema.String, "type"> = {}): Schema.String {
        return { type: "string", maxLength, minLength, pattern }
    }

    /**
     * The schema for any symbols.
     */
    symbol(): Schema.Symbol {
        return { type: "symbol" }
    }

    /**
     * The schema for tuples.
     * @param elements The schema of elements.
     */
    tuple<T extends readonly Schema[]>(...elements: T): Schema.Tuple<T> {
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
    ): Schema.Union<T | U[number]>

    // Implementation
    anyOf<T extends readonly Schema[]>(...schemas: T): Schema.Union<T[number]> {
        return { type: "union", schemas }
    }
}
/* eslint-enable class-methods-use-this */

/**
 * The schema factories.
 */
export const schemas = Object.freeze(new SchemaFactories())
