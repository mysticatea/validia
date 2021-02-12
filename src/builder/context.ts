import { Schema } from "../schema-types"
import { ValidationError } from "../validation-error"

export class BuildContext {
    private readonly constants: unknown[] = []
    private readonly functionMap = new Map<string, string>()
    private readonly flyweightMap = new Map<string, object>()
    private readonly code: string[] = ['"use strict";']
    private indent = 0

    addValidation(
        createBody: (
            locals: BuildContext.Locals,
            name: string,
            value: string,
            depth: string,
            errors: string,
        ) => string | IterableIterator<string>,
    ): string {
        return this.addFunction(createBody)
    }

    addFunction(
        createBody: (
            locals: BuildContext.Locals,
            ...params: string[]
        ) => string | IterableIterator<string>,
    ): string {
        const numArgs = Math.max(0, createBody.length - 1)
        const locals = new Locals()
        const params = Array.from({ length: numArgs }, () => locals.addArgs())
        const bodyGen = createBody(locals, ...params)
        const body =
            typeof bodyGen === "string" ? bodyGen : [...bodyGen].join("\n")
        const code = locals.getVariableDeclaration() + body
        let id = this.functionMap.get(code)
        if (id === undefined) {
            id = constantId(this.constants.length)
            this.constants.push({})
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
        let ref = this.flyweightMap.get(validationId)
        if (!ref) {
            ref = {}
            this.flyweightMap.set(validationId, ref)
        }
        return this.addConstant(schemaKey, ref)
    }

    addConstant(valueExpr: string, valueRef: unknown): string {
        const i = this.constants.indexOf(valueRef)
        if (i !== -1) {
            return constantId(i)
        }

        const id = constantId(this.constants.length)
        this.addCodeFragment(`var ${id} = ${valueExpr};`)
        this.constants.push(valueRef)
        return id
    }

    build(
        schema: Schema,
        validationId: string,
    ): (name: string, value: any) => ValidationError.ErrorInfo[] {
        this.addCodeFragment(`
            return function validate(name, value) {
                return ${validationId}(name, value, 0, []);
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
export namespace BuildContext {
    export interface Locals {
        add(initExpr: string): string
    }
}

const Chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

class Locals {
    private numArgs = 0
    private localInits: string[] = []

    addArgs(): string {
        return localId(this.numArgs++)
    }

    add(initExpr: string): string {
        const id = localId(this.numArgs + this.localInits.length)
        this.localInits.push(`${id} = ${initExpr}`)
        return id
    }

    getVariableDeclaration(): string {
        if (this.localInits.length > 0) {
            return `var ${this.localInits.join(", ")};\n`
        }
        return ""
    }
}

function constantId(i: number): string {
    return `_${i.toString(36)}`
}

function localId(i: number): string {
    if (i >= Chars.length) {
        throw new Error("Too many locals")
    }
    return Chars[i]
}
