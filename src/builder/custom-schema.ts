import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfCustomSchema(
    ctx: BuildContext,
    schemaKey: string,
    schema: Schema.CustomSchema<any>,
): string {
    return ctx.addValidation((_locals, name, value, depth, errors) => {
        const checkName = JSON.stringify(schema.name)
        const checkFunc = ctx.addConstant(`${schemaKey}.check`, schema.check)
        return `
            if (!${checkFunc}(${value})) {
                ${errors}.push({ code: "custom", args: { name: ${name}, checkFunc: ${checkFunc}, checkName: ${checkName} }, depth: ${depth} });
            }
            return ${errors};
        `
    })
}
