import { Schema } from "../schema-types"
import { BuildContext } from "./context"
import { addValidation } from "./schema"

export function addValidationOfRecordSchema(
    ctx: BuildContext,
    schemaKey: string,
    { properties }: Schema.Record<Schema>,
): string {
    return ctx.addValidation(function* (locals, name, value, depth, errors) {
        yield `
            if (typeof ${value} !== "object" || ${value} === null) {
                ${errors}.push({ code: "object", args: { name: ${name} }, depth: ${depth} });
        `

        if (properties.type !== "any") {
            yield "} else {"

            const validate = addValidation(
                ctx,
                `${schemaKey}.properties`,
                properties,
            )
            const keys = locals.add("null")
            const key = locals.add('""')
            const i = locals.add("0")
            yield `
                ${keys} = Object.keys(${value}).sort(undefined);
                for (; ${i} < ${keys}.length; ++${i}) {
                    ${key} = ${keys}[${i}]
                    ${validate}(${name} + "." + ${key}, ${value}[${key}], ${depth} + 1, ${errors});
                }
            `
        }

        yield `
            }
            return ${errors};
        `
    })
}
