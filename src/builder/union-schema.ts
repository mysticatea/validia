import { Schema } from "../schema-types"
import { ValidationError } from "../validation-error"
import { BuildContext } from "./context"
import { addValidationCodeOfSchema, createValidationOfSchema } from "./schema"

export function addValidationCodeOfUnionSchema(
    ctx: BuildContext,
    { schemas: givenSchemas }: Schema.UnionSchema<Schema>,
    nameVar: string,
    valueVar: string,
): void {
    const schemas = flat(givenSchemas)
    if (schemas.length === 0) {
        throw new Error("UnionSchema must have 1 or more schemas.")
    }
    if (schemas.length === 1) {
        addValidationCodeOfSchema(ctx, schemas[0], nameVar, valueVar)
        return
    }
    const validateUnionVar = ctx.addArgument(validateUnion)
    const validationsVar = ctx.addArgument(
        schemas.map(createValidationOfSchema),
    )
    const schemasVar = ctx.addArgument(schemas)
    const errorsVar = ctx.addLocal("r")
    const iVar = ctx.addLocal("i")

    ctx.addCodeFragment(`
        ${errorsVar} = ${validateUnionVar}(${validationsVar}, ${nameVar}, ${valueVar})
        if (${errorsVar}.length >= 2) {
            errors.push({ code: "union", args: { name: ${nameVar}, schemas: ${schemasVar} }, depth: ${ctx.depth} });
        }
        if (${errorsVar}.length === 1) {
            for (${iVar} = 0; ${iVar} < ${errorsVar}[0].length; ++${iVar}) {
                errors.push(${errorsVar}[0][${iVar}])
            }
        }
    `)
}

const Any = Object.freeze([Object.freeze({ type: "any" as const })])

function flat(
    schemas: readonly Schema[],
    retv: Exclude<Schema, Schema.UnionSchema<any>>[] = [],
): readonly Exclude<Schema, Schema.UnionSchema<any>>[] {
    for (const schema of schemas) {
        if (schema.type === "any") {
            return Any
        }
        if (schema.type === "union") {
            if (flat(schema.schemas, retv) === Any) {
                return Any
            }
        } else {
            retv.push(schema)
        }
    }
    return retv
}

function validateUnion(
    validations: readonly ((
        name: string,
        value: any,
    ) => ValidationError.ErrorInfo[])[],
    name: string,
    value: any,
): ValidationError.ErrorInfo[][] {
    const retv: ValidationError.ErrorInfo[][] = []
    let maxDepth = -1
    for (const validate of validations) {
        const errors = validate(name, value)
        if (errors.length === 0) {
            return []
        }
        const depth = errors.reduce(
            (d, e) => Math.min(d, e.depth),
            Number.MAX_SAFE_INTEGER,
        )
        if (depth > maxDepth) {
            retv.length = 1
            retv[0] = errors
            maxDepth = depth
        } else if (depth === maxDepth) {
            retv.push(errors)
        }
    }
    return retv
}
