import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationCodeOfFunctionSchema(
    ctx: BuildContext,
    _schema: Schema.FunctionSchema,
    nameVar: string,
    valueVar: string,
): void {
    ctx.addCodeFragment(`
        if (typeof ${valueVar} !== "function") {
            errors.push({ code: "function", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        }
    `)
}
