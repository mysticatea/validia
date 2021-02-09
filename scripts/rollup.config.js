import replace from "@rollup/plugin-replace"
import typescript from "@rollup/plugin-typescript"
import path from "path"

function sourcemapPathTransform(filePath) {
    const prefix = `..${path.sep}`
    return filePath.startsWith(prefix)
        ? filePath.slice(prefix.length)
        : filePath
}

/** @type {import("rollup").RollupOptions} */
const options = {
    input: "src/index.ts",
    output: [
        {
            file: "dist/index.mjs",
            format: "esm",
            sourcemap: true,
            sourcemapPathTransform,
        },
        {
            file: "dist/index.js",
            format: "cjs",
            sourcemap: true,
            sourcemapPathTransform,
        },
    ],
    plugins: [
        typescript({ tsconfig: "tsconfig/build.json" }),
        replace({
            delimiters: ["", ""],
            values: {
                "/* #IF PROD": "// #IF PROD",
                "// #IF !PROD": "/* #IF !PROD",
            },
        }),
    ],
    treeshake: {
        moduleSideEffects: false,
        unknownGlobalSideEffects: false,
    },
}

export default options
