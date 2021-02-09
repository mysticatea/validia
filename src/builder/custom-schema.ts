import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationCodeOfCustomSchema(
    ctx: BuildContext,
    { check, name }: Schema.CustomSchema<any>,
    nameVar: string,
    valueVar: string,
): void {
    const checkName = JSON.stringify(name)
    const checkVar = ctx.addArgument(check)
    ctx.addCodeFragment(`
        if (!${checkVar}(${valueVar})) {
            errors.push({ code: "custom", args: { name: ${nameVar}, checkFunc: ${checkVar}, checkName: ${checkName} }, depth: ${ctx.depth} });
        }
    `)
}
