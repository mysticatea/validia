import { Schema } from "../schema-types"
import { BuildContext } from "./context"
import { addValidation } from "./schema"

export function addValidationOfObjectSchema(
    ctx: BuildContext,
    schemaKey: string,
    {
        allowUnknown = false,
        properties,
        required = [],
    }: Schema.ObjectSchema<Record<string, Schema>, string, boolean>,
): string {
    return ctx.addValidation(function* (locals, name, value, depth, errors) {
        const requiredKeys = Array.from(new Set(required)).sort(undefined)
        const optionalKeys = Object.keys(properties).sort(undefined)

        yield `
            if (typeof ${value} !== "object" || ${value} === null) {
                ${errors}.push({ code: "object", args: { name: ${name} }, depth: ${depth} });
        `

        if (allowUnknown && optionalKeys.length === 0) {
            yield "}"
        } else {
            yield `
                    return ${errors};
                }
            `

            const collectKeys = addCollectKeys(ctx)
            const remainKeys = locals.add("null")
            yield `${remainKeys} = ${collectKeys}(${value});`

            let missingKeys = ""
            if (requiredKeys.length > 0) {
                missingKeys = locals.add("null")
                yield `${missingKeys} = [];`
                for (const propertyName of requiredKeys) {
                    const i = optionalKeys.indexOf(propertyName)
                    if (i === -1) {
                        throw new Error(
                            `"${propertyName}" was in "${schemaKey}.required", so it must exist in "${schemaKey}.properties".`,
                        )
                    } else {
                        optionalKeys.splice(i, 1)
                    }
                    const propertySchema = properties[propertyName]
                    const propertyNameStr = JSON.stringify(propertyName).slice(
                        1,
                        -1,
                    )

                    if (propertySchema.type === "any") {
                        yield `
                            if (!${remainKeys}.delete("${propertyNameStr}")) {
                                ${missingKeys}.push("${propertyNameStr}");
                            }
                        `
                    } else {
                        const validationId = addValidation(
                            ctx,
                            `${schemaKey}.properties["${propertyNameStr}"]`,
                            propertySchema,
                        )
                        yield `
                            if (${remainKeys}.delete("${propertyNameStr}")) {
                                ${validationId}(${name} + ".${propertyNameStr}", ${value}["${propertyNameStr}"], ${depth} + 1, ${errors});
                            } else {
                                ${missingKeys}.push("${propertyNameStr}");
                            }
                        `
                    }
                }
            }
            if (optionalKeys.length > 0) {
                const propValue = locals.add("null")
                for (const propertyName of optionalKeys) {
                    const propertySchema = properties[propertyName]
                    const propertyNameStr = JSON.stringify(propertyName).slice(
                        1,
                        -1,
                    )

                    if (propertySchema.type === "any") {
                        if (!allowUnknown) {
                            yield `${remainKeys}.delete("${propertyNameStr}");`
                        }
                    } else {
                        const validationId = addValidation(
                            ctx,
                            `${schemaKey}.properties["${propertyNameStr}"]`,
                            propertySchema,
                        )
                        yield `
                            if (${remainKeys}.delete("${propertyNameStr}") && (${propValue} = ${value}["${propertyNameStr}"]) !== undefined) {
                                ${validationId}(${name} + ".${propertyNameStr}", ${propValue}, ${depth} + 1, ${errors});
                            }
                        `
                    }
                }
            }
            if (missingKeys) {
                yield `
                    if (${missingKeys}.length > 0) {
                        ${errors}.push({ code: "objectRequiredKeys", args: { name: ${name}, keys: ${missingKeys} }, depth: ${depth} });
                    }
                `
            }
            if (!allowUnknown) {
                const setToArray = addSetToArray(ctx)
                yield `
                    if (${remainKeys}.size > 0) {
                        ${errors}.push({ code: "objectUnknownKeys", args: { name: ${name}, keys: ${setToArray}(${remainKeys}) }, depth: ${depth} });
                    }
                `
            }
        }

        yield `return ${errors};`
    })
}

function addCollectKeys(ctx: BuildContext): string {
    return ctx.addFunction((locals, obj) => {
        const keys = locals.add("new Set()")
        const key = locals.add('""')
        return `
            for (${key} in ${obj}) ${keys}.add(${key});
            return ${keys};
        `
    })
}

function addSetToArray(ctx: BuildContext): string {
    return ctx.addFunction((locals, set) => {
        const retv = locals.add("[]")
        return `
            ${set}.forEach(function(x) { ${retv}.push(x) });
            return ${retv}.sort(undefined);
        `
    })
}
