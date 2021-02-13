import { MaxInt32 } from "../constants"
import { Schema } from "../schema-types"
import { BuildContext } from "./context"
import { addValidation } from "./schema"

export function addValidationOfUnionSchema(
    ctx: BuildContext,
    schemaKey: string,
    { schemas }: Schema.Union<Schema>,
): string {
    const flattened = flatten(`${schemaKey}.schemas`, schemas)
    if (flattened.length === 0) {
        throw new Error("UnionSchema must have 1 or more schemas.")
    }
    if (flattened.length === 1) {
        return addValidation(
            ctx,
            flattened[0].childSchemaKey,
            flattened[0].childSchema,
        )
    }

    const validationIds: string[] = []
    const schemaIds: string[] = []
    for (const { childSchemaKey, childSchema } of flattened) {
        const validationId = addValidation(ctx, childSchemaKey, childSchema)
        if (validationIds.includes(validationId)) {
            continue
        }
        const schemaId = ctx.mapSchema(validationId, childSchemaKey)

        validationIds.push(validationId)
        schemaIds.push(schemaId)
    }

    const validateUnion = addValidateUnion(ctx)
    const validationsStr = validationIds.join(", ")
    const schemasStr = schemaIds.join(", ")
    return ctx.addValidation(
        (_locals, name, value, depth, errors) =>
            `return ${validateUnion}(${name}, ${value}, ${depth}, ${errors}, [${schemasStr}], [${validationsStr}]);`,
    )
}

function flatten(
    key: string,
    schemas: readonly Schema[],
    flattened: {
        childSchemaKey: string
        childSchema: Exclude<Schema, Schema.Union<any>>
    }[] = [],
): {
    childSchemaKey: string
    childSchema: Exclude<Schema, Schema.Union<any>>
}[] {
    for (let i = 0; i < schemas.length; ++i) {
        const childSchema = schemas[i]
        const childSchemaKey = `${key}[${i}]`
        if (childSchema.type === "any") {
            return [{ childSchemaKey, childSchema }]
        }
        if (childSchema.type === "union") {
            const retv = flatten(
                `${childSchemaKey}.schemas`,
                childSchema.schemas,
                flattened,
            )
            if (retv !== flattened) {
                return retv
            }
        } else {
            flattened.push({ childSchemaKey, childSchema })
        }
    }
    return flattened
}

function addValidateUnion(ctx: BuildContext): string {
    return ctx.addFunction(
        (locals, name, value, depth, errors, schemas, validates) => {
            const maxDepth = MaxInt32 >> 1
            const reduceMinDepthVar = addReduceMinDepth(ctx)
            const currentErrors = locals.add("null")
            const thisErrors = locals.add("null")
            const currentMaxDepth = locals.add("-1")
            const thisDepth = locals.add("0")
            const i = locals.add("0")
            return `
                for (; ${i} < ${validates}.length; ++${i}) {
                    ${thisErrors} = ${validates}[${i}](${name}, ${value}, ${depth}, []);
                    if (${thisErrors}.length === 0) {
                        return ${errors};
                    }
                    ${thisDepth} = ${thisErrors}.reduce(${reduceMinDepthVar}, ${maxDepth})
                    if (${thisDepth} > ${currentMaxDepth}) {
                        ${currentErrors} = ${thisErrors};
                        ${currentMaxDepth} = ${thisDepth};
                    } else if (${thisDepth} === ${currentMaxDepth}) {
                        ${currentErrors} = null;
                    }
                }
                if (${currentErrors} !== null) {
                    for (${i} = 0; ${i} < ${currentErrors}.length; ++${i}) {
                        ${errors}.push(${currentErrors}[${i}]);
                    }
                } else {
                    ${errors}.push({ code: "union", args: { name: ${name}, schemas: ${schemas} }, depth: ${depth} });
                }
                return ${errors};
            `
        },
    )
}

function addReduceMinDepth(ctx: BuildContext): string {
    return ctx.addFunction(
        (_locals, minDepth, error) => `
            return ${minDepth} <= ${error}.depth ? ${minDepth} : ${error}.depth;
        `,
    )
}
