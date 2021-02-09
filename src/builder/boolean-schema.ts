import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationCodeOfBooleanSchema(
    ctx: BuildContext,
    _schema: Schema.BooleanSchema,
    nameVar: string,
    valueVar: string,
): void {
    ctx.addCodeFragment(`
        if (typeof ${valueVar} !== "boolean") {
            errors.push({ code: "boolean", args: { name: ${nameVar} }, depth: ${ctx.depth} });
        }
    `)
}
