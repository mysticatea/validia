import { Schema } from "../schema-types"
import { BuildContext } from "./context"
import { addValidation } from "./schema"

export function addValidationOfObjectSchema(
    ctx: BuildContext,
    key: string,
    {
        properties,
        required = [],
    }: Schema.ObjectSchema<Record<string, Schema>, string>,
): string {
    const locals = ["remainKeys = null"]
    const code: string[] = []
    code.push(`
        if (typeof value !== "object" || value === null) {
            errors.push({ code: "object", args: { name: name }, depth: depth });
            return errors;
        }
        remainKeys = Object.keys(value);
    `)

    const requiredKeys = Array.from(new Set(required)).sort(undefined)
    const optionalKeys = Object.keys(properties).sort(undefined)
    if (optionalKeys.length > 0) {
        locals.push("i = 0")
    }
    if (requiredKeys.length > 0) {
        locals.push("missingKeys = null")
        code.push("missingKeys = [];")
        for (const propertyName of requiredKeys) {
            const i = optionalKeys.indexOf(propertyName)
            if (i === -1) {
                throw new Error(
                    `"${propertyName}" was in "${key}.required", so it must exist in "${key}.properties".`,
                )
            } else {
                optionalKeys.splice(i, 1)
            }
            const propertySchema = properties[propertyName]
            const propertyNameStr = JSON.stringify(propertyName).slice(1, -1)

            code.push(`
                i = remainKeys.indexOf("${propertyNameStr}");
                if (i !== -1) {
                    remainKeys.splice(i, 1);
            `)
            if (propertySchema.type !== "any") {
                const validationId = addValidation(
                    ctx,
                    `${key}.properties["${propertyNameStr}"]`,
                    propertySchema,
                )
                code.push(
                    `${validationId}(name + ".${propertyNameStr}", value["${propertyNameStr}"], depth + 1, errors);`,
                )
            }
            code.push(`
                } else {
                    missingKeys.push("${propertyNameStr}")
                }
            `)
        }
    }
    if (optionalKeys.length > 0) {
        locals.push("propValue = null")
        for (const propertyName of optionalKeys) {
            const propertySchema = properties[propertyName]
            const propertyNameStr = JSON.stringify(propertyName).slice(1, -1)
            code.push(`
                i = remainKeys.indexOf("${propertyNameStr}");
                if (i !== -1) {
                    remainKeys.splice(i, 1);
            `)
            if (propertySchema.type !== "any") {
                const validationId = addValidation(
                    ctx,
                    `${key}.properties["${propertyNameStr}"]`,
                    propertySchema,
                )
                code.push(`
                    propValue = value["${propertyNameStr}"]
                    if (propValue !== undefined) {
                        ${validationId}(name + ".${propertyNameStr}", propValue, depth + 1, errors);
                    }
                `)
            }
            code.push("}")
        }
    }
    if (requiredKeys.length > 0) {
        code.push(`
            if (missingKeys.length > 0) {
                errors.push({ code: "objectRequiredKeys", args: { name: name, keys: missingKeys }, depth: depth });
            }
        `)
    }
    code.push(`
        if (remainKeys.length > 0) {
            errors.push({ code: "objectUnknownKeys", args: { name: name, keys: remainKeys }, depth: depth });
        }
    `)

    code.push("return errors;")
    code.unshift(`var ${locals.join(", ")};`)
    return ctx.addValidation(code.join("\n"))
}
