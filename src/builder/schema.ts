import { Schema } from "../schema-types"
import { ValidationError } from "../validation-error"
import { addValidationCodeOfArraySchema } from "./array-schema"
import { addValidationCodeOfBigIntSchema } from "./bigint-schema"
import { addValidationCodeOfBooleanSchema } from "./boolean-schema"
import { addValidationCodeOfClassSchema } from "./class-schema"
import { BuildContext } from "./context"
import { addValidationCodeOfCustomSchema } from "./custom-schema"
import { addValidationCodeOfEnumSchema } from "./enum-schema"
import { addValidationCodeOfFunctionSchema } from "./function-schema"
import { addValidationCodeOfNumberSchema } from "./number-schema"
import { addValidationCodeOfObjectSchema } from "./object-schema"
import { addValidationCodeOfRecordSchema } from "./record-schema"
import { addValidationCodeOfStringSchema } from "./string-schema"
import { addValidationCodeOfSymbolSchema } from "./symbol-schema"
import { addValidationCodeOfTupleSchema } from "./tuple-schema"
import { addValidationCodeOfUnionSchema } from "./union-schema"

const cache = new WeakMap<
    Schema,
    (name: string, value: any) => ValidationError.ErrorInfo[]
>()

export function createValidationOfSchema(
    schema: Schema,
): (name: string, value: any) => ValidationError.ErrorInfo[] {
    let validation = cache.get(schema)
    if (!validation) {
        validation = addValidationCodeOfSchema(
            new BuildContext(),
            schema,
            BuildContext.NameVar,
            BuildContext.ValueVar,
        ).createFunction()
        cache.set(schema, validation)
    }
    return validation
}

export function addValidationCodeOfSchema(
    ctx: BuildContext,
    schema: Schema,
    nameVar: string,
    valueVar: string,
): BuildContext {
    switch (schema.type) {
        case "any":
            break
        case "array":
            addValidationCodeOfArraySchema(ctx, schema, nameVar, valueVar)
            break
        case "bigint":
            addValidationCodeOfBigIntSchema(ctx, schema, nameVar, valueVar)
            break
        case "boolean":
            addValidationCodeOfBooleanSchema(ctx, schema, nameVar, valueVar)
            break
        case "class":
            addValidationCodeOfClassSchema(ctx, schema, nameVar, valueVar)
            break
        case "custom":
            addValidationCodeOfCustomSchema(ctx, schema, nameVar, valueVar)
            break
        case "enum":
            addValidationCodeOfEnumSchema(ctx, schema, nameVar, valueVar)
            break
        case "function":
            addValidationCodeOfFunctionSchema(ctx, schema, nameVar, valueVar)
            break
        case "number":
            addValidationCodeOfNumberSchema(ctx, schema, nameVar, valueVar)
            break
        case "object":
            addValidationCodeOfObjectSchema(ctx, schema, nameVar, valueVar)
            break
        case "record":
            addValidationCodeOfRecordSchema(ctx, schema, nameVar, valueVar)
            break
        case "string":
            addValidationCodeOfStringSchema(ctx, schema, nameVar, valueVar)
            break
        case "symbol":
            addValidationCodeOfSymbolSchema(ctx, schema, nameVar, valueVar)
            break
        case "tuple":
            addValidationCodeOfTupleSchema(ctx, schema, nameVar, valueVar)
            break
        case "union":
            addValidationCodeOfUnionSchema(ctx, schema, nameVar, valueVar)
            break

        //istanbul ignore next
        default:
            throw new Error(`Unknown Schema: ${schema}`)
    }

    return ctx
}
