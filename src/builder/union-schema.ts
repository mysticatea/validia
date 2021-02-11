import { Schema } from "../schema-types"
import { BuildContext } from "./context"
import { addValidation } from "./schema"

export function addValidationOfUnionSchema(
    ctx: BuildContext,
    key: string,
    { schemas }: Schema.UnionSchema<Schema>,
): string {
    const flattened = flatten(`${key}.schemas`, schemas)
    if (flattened.length === 0) {
        throw new Error("UnionSchema must have 1 or more schemas.")
    }
    if (flattened.length === 1) {
        return addValidation(ctx, flattened[0].schemaKey, flattened[0].schema)
    }

    const validationIds: string[] = []
    const schemaIds: string[] = []
    for (const { schemaKey, schema } of flattened) {
        const validationId = addValidation(ctx, schemaKey, schema)
        if (validationIds.includes(validationId)) {
            continue
        }
        const schemaId = ctx.mapSchema(validationId, schemaKey)

        validationIds.push(validationId)
        schemaIds.push(schemaId)
    }

    const reduceMinDepthVar = ctx.addFunction(
        ["minDepth", "error"],
        "return minDepth <= error.depth ? minDepth : error.depth;",
    )
    const validationsStr = validationIds.join(", ")
    const schemasStr = schemaIds.join(", ")
    return ctx.addValidation(`
        var varidations = [${validationsStr}], errorsOfMaxDepth = [], e = null, maxDepth = -1, d = 0, i = 0;
        for (i = 0; i < varidations.length; ++i) {
            e = varidations[i](name, value, depth, []);
            if (e.length === 0) {
                return errors;
            }
            d = e.reduce(${reduceMinDepthVar}, Number.MAX_SAFE_INTEGER)
            if (d > maxDepth) {
                errorsOfMaxDepth = [e]
                maxDepth = d;
            } else if (d === maxDepth) {
                errorsOfMaxDepth.push(e);
            }
        }
        if (errorsOfMaxDepth.length === 1) {
            errorsOfMaxDepth = errorsOfMaxDepth[0]
            for (d = 0; d < errorsOfMaxDepth.length; ++d) {
                errors.push(errorsOfMaxDepth[d])
            }
        } else if (errorsOfMaxDepth.length >= 2) {
            errors.push({ code: "union", args: { name: name, schemas: [${schemasStr}] }, depth: depth });
        }
        return errors;
    `)
}

function flatten(
    key: string,
    schemas: readonly Schema[],
    flattened: {
        schemaKey: string
        schema: Exclude<Schema, Schema.UnionSchema<any>>
    }[] = [],
): { schemaKey: string; schema: Exclude<Schema, Schema.UnionSchema<any>> }[] {
    for (let i = 0; i < schemas.length; ++i) {
        const schema = schemas[i]
        const schemaKey = `${key}[${i}]`
        if (schema.type === "any") {
            return [{ schemaKey, schema }]
        }
        if (schema.type === "union") {
            const retv = flatten(
                `${schemaKey}.schemas`,
                schema.schemas,
                flattened,
            )
            if (retv !== flattened) {
                return retv
            }
        } else {
            flattened.push({ schemaKey, schema })
        }
    }
    return flattened
}
