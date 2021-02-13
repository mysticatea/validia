import { Schema } from "../schema-types"
import { BuildContext } from "./context"

export function addValidationOfAnySchema(
    ctx: BuildContext,
    _schemaKey: string,
    _schema: Schema.Any,
): string {
    return ctx.addValidation(
        (_locals, _name, _value, _depth, errors) => `return ${errors};`,
    )
}
