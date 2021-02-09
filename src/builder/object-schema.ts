import { Schema } from "../schema-types"
import { BuildContext } from "./context"
import { addValidationCodeOfSchema } from "./schema"

export function addValidationCodeOfObjectSchema(
    ctx: BuildContext,
    {
        properties,
        required = [],
    }: Schema.ObjectSchema<Record<string, Schema>, string>,
    nameVar: string,
    valueVar: string,
): void {
    const remainingKeysVar = ctx.addLocal("r")

    ctx.addCodeFragment(`
        if (typeof ${valueVar} !== "object" || ${valueVar} === null) {
            errors.push({ code: "object", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        } else {
            ${remainingKeysVar} = Object.keys(${valueVar});
    `)

    const keys = Object.keys(properties).sort(undefined)
    if (keys.length > 0) {
        const iVar = ctx.addLocal("i")

        const missingKeysVar =
            required.length > 0 ? ctx.addLocal("r") : undefined
        if (missingKeysVar) {
            ctx.addCodeFragment(`${missingKeysVar} = [];`)
        }
        for (const propertyName of keys) {
            const propertySchema = properties[propertyName]
            const propertyNameStr = JSON.stringify(propertyName).slice(1, -1)
            const isRequired = required.includes(propertyName)
            ctx.addCodeFragment(`
                ${iVar} = ${remainingKeysVar}.indexOf("${propertyNameStr}");
                if (${iVar} !== -1) {
                    ${remainingKeysVar}.splice(${iVar}, 1);
            `)
            if (propertySchema.type !== "any") {
                ctx.stackLocalScope()
                const propertyNameVar = ctx.addLocal("s")
                const propertyValueVar = ctx.addLocal("r")
                ctx.addCodeFragment(`
                    ${propertyNameVar} = ${nameVar} + ".${propertyNameStr}";
                    ${propertyValueVar} = ${valueVar}["${propertyNameStr}"];
                `)
                if (!isRequired) {
                    ctx.addCodeFragment(
                        `if (${propertyValueVar} !== undefined) {`,
                    )
                }
                addValidationCodeOfSchema(
                    ctx,
                    propertySchema,
                    propertyNameVar,
                    propertyValueVar,
                )
                if (!isRequired) {
                    ctx.addCodeFragment("}")
                }
                ctx.popLocalScope()
            }
            if (missingKeysVar && isRequired) {
                ctx.addCodeFragment(`
                    } else {
                        ${missingKeysVar}.push("${propertyNameStr}")
                    }
                `)
            } else {
                ctx.addCodeFragment("}")
            }
        }
        if (missingKeysVar) {
            ctx.addCodeFragment(`
                if (${missingKeysVar}.length > 0) {
                    errors.push({ code: "objectRequiredKeys", args: { name: ${nameVar}, keys: ${missingKeysVar} }, depth: ${ctx.depth} });
                }
            `)
        }
    }
    ctx.addCodeFragment(`
        if (${remainingKeysVar}.length > 0) {
            errors.push({ code: "objectUnknownKeys", args: { name: ${nameVar}, keys: ${remainingKeysVar} }, depth: ${ctx.depth} });
        }
    `)

    ctx.addCodeFragment("}")
}
