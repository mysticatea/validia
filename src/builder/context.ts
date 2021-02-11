import { Schema } from "../schema-types"
import { ValidationError } from "../validation-error"

export class BuildContext {
    private readonly locals: unknown[] = []
    private readonly functionMap = new Map<string, string>()
    private readonly schemaMap = new Map<string, object>()
    private readonly code: string[] = ['"use strict";']
    private lastValidationId = ""
    private indent = 0

    addValidation(code: string): string {
        this.lastValidationId = this.addFunction(
            ["name", "value", "depth", "errors"],
            code,
        )
        return this.lastValidationId
    }

    addFunction(params: string[], code: string): string {
        let id = this.functionMap.get(code)
        if (id === undefined) {
            id = localId("_", this.locals.length)
            this.locals.push({ params, code })
            this.addCodeFragment(`function ${id}(${params.join(", ")}) {`)
            this.addCodeFragment(code)
            this.addCodeFragment("}")
            this.functionMap.set(code, id)
        }
        return id
    }

    private addCodeFragment(code: string): void {
        for (const line0 of code.split("\n")) {
            const line = line0.trim()
            if (line.length === 0) {
                continue
            }
            // eslint-disable-next-line multiline-comment-style
            /* #IF PROD
            this.code.push(line)
            // */
            // #IF !PROD
            if (line.startsWith("}")) {
                this.indent -= 2
            }
            this.code.push(" ".repeat(this.indent) + line)
            if (line.endsWith("{")) {
                this.indent += 2
            }
            // */
        }
    }

    mapSchema(validationId: string, schemaKey: string): string {
        let schemaRef = this.schemaMap.get(validationId)
        if (!schemaRef) {
            schemaRef = { validationId }
            this.schemaMap.set(validationId, schemaRef)
        }
        return this.addLocal(schemaKey, schemaRef)
    }

    addLocal(valueName: string, valueRef: unknown): string {
        const i = this.locals.indexOf(valueRef)
        if (i !== -1) {
            return localId("_", i)
        }

        const id = localId("_", this.locals.length)
        this.addCodeFragment(`var ${id} = ${valueName};`)
        this.locals.push(valueRef)
        return id
    }

    build(
        schema: Schema,
    ): (name: string, value: any) => ValidationError.ErrorInfo[] {
        this.addCodeFragment(`
            return function validate(name, value) {
                return ${this.lastValidationId}(name, value, 0, [])
            };
        `)
        const code = this.code.join("\n")
        const func: any = new Function("$schema", code)(schema)

        // #IF !PROD
        func.toString = () => {
            const bodyStr = code
                .split("\n")
                .map(line => `  ${line}`)
                .join("\n")
            return `var validate = (function($schema) {\n${bodyStr}\n})({});`
        }
        // */

        return func
    }
}

function localId(type: string, i: number): string {
    return `${type}${i.toString(36)}`
}
