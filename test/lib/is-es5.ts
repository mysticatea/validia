import { ESLint } from "eslint"

const eslint = new ESLint({
    baseConfig: {
        parser: "espree",
        parserOptions: {
            ecmaVersion: 5,
        },
    },
    ignore: false,
    useEslintrc: false,
})

export async function assertES5(code: string): Promise<void> {
    const formatter = await eslint.loadFormatter()
    const results = await eslint.lintText(code, { filePath: "validate.js" })
    const message = formatter.format(results)
    if (message) {
        throw new Error(message)
    }
}
