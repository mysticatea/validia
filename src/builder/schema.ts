import { Schema } from "../schema-types"
import { ValidationError } from "../validation-error"
import { addValidationOfAnySchema } from "./any-schema"
import { addValidationOfArraySchema } from "./array-schema"
import { addValidationOfBigIntSchema } from "./bigint-schema"
import { addValidationOfBooleanSchema } from "./boolean-schema"
import { addValidationOfClassSchema } from "./class-schema"
import { BuildContext } from "./context"
import { addValidationOfCustomSchema } from "./custom-schema"
import { addValidationOfEnumSchema } from "./enum-schema"
import { addValidationOfFunctionSchema } from "./function-schema"
import { addValidationOfNumberSchema } from "./number-schema"
import { addValidationOfObjectSchema } from "./object-schema"
import { addValidationOfRecordSchema } from "./record-schema"
import { addValidationOfStringSchema } from "./string-schema"
import { addValidationOfSymbolSchema } from "./symbol-schema"
import { addValidationOfTupleSchema } from "./tuple-schema"
import { addValidationOfUnionSchema } from "./union-schema"

const cache = new WeakMap<
    Schema,
    (name: string, value: any) => ValidationError.ErrorInfo[]
>()

export function createValidationOfSchema(
    schema: Schema,
): (name: string, value: any) => ValidationError.ErrorInfo[] {
    let validation = cache.get(schema)
    if (!validation) {
        const ctx = new BuildContext()
        addValidation(ctx, "$schema", schema)
        validation = ctx.build(schema)
        cache.set(schema, validation)
    }
    return validation
}

export function addValidation(
    ctx: BuildContext,
    key: string,
    schema: Schema,
): string {
    switch (schema.type) {
        case "any":
            return addValidationOfAnySchema(ctx, key, schema)
        case "array":
            return addValidationOfArraySchema(ctx, key, schema)
        case "bigint":
            return addValidationOfBigIntSchema(ctx, key, schema)
        case "boolean":
            return addValidationOfBooleanSchema(ctx, key, schema)
        case "class":
            return addValidationOfClassSchema(ctx, key, schema)
        case "custom":
            return addValidationOfCustomSchema(ctx, key, schema)
        case "enum":
            return addValidationOfEnumSchema(ctx, key, schema)
        case "function":
            return addValidationOfFunctionSchema(ctx, key, schema)
        case "number":
            return addValidationOfNumberSchema(ctx, key, schema)
        case "object":
            return addValidationOfObjectSchema(ctx, key, schema)
        case "record":
            return addValidationOfRecordSchema(ctx, key, schema)
        case "string":
            return addValidationOfStringSchema(ctx, key, schema)
        case "symbol":
            return addValidationOfSymbolSchema(ctx, key, schema)
        case "tuple":
            return addValidationOfTupleSchema(ctx, key, schema)
        case "union":
            return addValidationOfUnionSchema(ctx, key, schema)

        //istanbul ignore next
        default:
            throw new Error(`Unknown Schema: ${schema}`)
    }
}
