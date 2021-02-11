import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfCustomSchema(
    ctx: BuildContext,
    key: string,
    { check, name }: Schema.CustomSchema<any>,
): string {
    const checkName = JSON.stringify(name)
    const checkVar = ctx.addLocal(`${key}.check`, check)
    return ctx.addValidation(`
        if (!${checkVar}(value)) {
            errors.push({ code: "custom", args: { name: name, checkFunc: ${checkVar}, checkName: ${checkName} }, depth: depth });
        }
        return errors;
    `)
}
