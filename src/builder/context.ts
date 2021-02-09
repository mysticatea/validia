import { ValidationError } from "../validation-error"

type LocalType = "i" | "r" | "s"
type LocalInfo = Record<LocalType, number>

export class BuildContext {
    static readonly NameVar = "name"
    static readonly ValueVar = "value"

    private readonly args: any[] = []
    private readonly code: string[] = ['"use strict";', "var errors = [];"]
    // #IF !PROD
    private indent = 0
    // */
    private locals: LocalInfo[] = [{ i: 0, r: 0, s: 0 }]
    private localsMax: LocalInfo = { i: -1, r: -1, s: -1 }

    get depth(): number {
        return this.locals.length
    }

    addArgument(value: any): string {
        const i = this.args.indexOf(value)
        if (i !== -1) {
            return argumentId(i)
        }
        const id = argumentId(this.args.length)
        this.args.push(value)
        return id
    }

    addCodeFragment(code: string): void {
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

    addLocal(type: LocalType): string {
        return localId(type, this.locals[this.locals.length - 1][type]++)
    }
    stackLocalScope(): void {
        this.locals.push({ ...this.locals[this.locals.length - 1] })
    }
    popLocalScope(): void {
        const locals = this.locals.pop()!
        const max = this.localsMax
        for (const type of ["i", "s", "r"] as const) {
            if (locals[type] > max[type]) {
                max[type] = locals[type]
            }
        }
    }

    createFunction(): (
        name: string,
        value: any,
    ) => ValidationError.ErrorInfo[] {
        this.popLocalScope()
        this.code.push("return errors;")

        const locals: string[] = []
        for (let i = 0; i < this.localsMax.i; ++i) {
            locals.push(`${localId("i", i)} = 0`)
        }
        for (let i = 0; i < this.localsMax.s; ++i) {
            locals.push(`${localId("s", i)} = ""`)
        }
        for (let i = 0; i < this.localsMax.r; ++i) {
            locals.push(`${localId("r", i)} = null`)
        }
        if (locals.length > 0) {
            this.code[1] = `var errors = [], ${locals.join(", ")};`
        }

        const params = this.args.map((_, i) => argumentId(i))
        const code = this.code.join("\n")
        const func: any = new Function(
            ...params,
            BuildContext.NameVar,
            BuildContext.ValueVar,
            code,
        ).bind(null, ...this.args)

        // #IF !PROD
        func.toString = () => {
            const paramsStr = [
                ...params,
                BuildContext.NameVar,
                BuildContext.ValueVar,
            ].join(", ")
            const bodyStr = code
                .split("\n")
                .map(line => `  ${line}`)
                .join("\n")
            return `function validate(${paramsStr}) {\n${bodyStr}\n}`
        }
        // */

        return func
    }
}

function argumentId(i: number): string {
    return `a${i.toString(36)}`
}

function localId(type: LocalType, i: number): string {
    return `${type}${i.toString(36)}`
}
