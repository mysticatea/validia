import babel from "@rollup/plugin-babel"
import replace from "@rollup/plugin-replace"
import typescript from "@rollup/plugin-typescript"
import path from "path"

function sourcemapPathTransform(filePath) {
    const prefix = `..${path.sep}`
    return filePath.startsWith(prefix)
        ? filePath.slice(prefix.length)
        : filePath
}

function es5External(id) {
    return (
        id.startsWith("core-js/") ||
        id.startsWith("@babel/runtime/") ||
        id.startsWith("regenerator-runtime/")
    )
}

/** @type {import("rollup").RollupOptions[]} */
const options = [
    {
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
    },
    {
        external: es5External,
        input: "dist/index.mjs",
        output: { file: "dist/es5.mjs", format: "esm" },
        plugins: [
            babel({
                babelHelpers: "runtime",
                babelrc: false,
                plugins: [["@babel/transform-runtime", { useESModules: true }]],
                presets: [
                    [
                        "@babel/env",
                        {
                            corejs: "3.8",
                            modules: false,
                            targets: "IE 11",
                            useBuiltIns: "usage",
                        },
                    ],
                ],
            }),
        ],
    },
    {
        external: es5External,
        input: "dist/index.mjs",
        output: { file: "dist/es5.js", format: "cjs" },
        plugins: [
            babel({
                babelHelpers: "runtime",
                babelrc: false,
                plugins: ["@babel/transform-runtime"],
                presets: [
                    [
                        "@babel/env",
                        {
                            corejs: "3.8",
                            modules: false,
                            targets: "IE 11",
                            useBuiltIns: "usage",
                        },
                    ],
                ],
            }),
        ],
    },
]

export default options
