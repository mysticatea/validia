import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfFunctionSchema(
    ctx: BuildContext,
    _key: string,
    _schema: Schema.FunctionSchema,
): string {
    return ctx.addValidation(`
        if (typeof value !== "function") {
            errors.push({ code: "function", args: { name: name }, depth: depth });
        }
        return errors;
    `)
}
