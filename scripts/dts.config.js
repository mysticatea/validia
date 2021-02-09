"use strict"

/** @type import('dts-bundle-generator/config-schema').BundlerConfig */
module.exports = {
    compilationOptions: {
        preferredConfigPath: "../tsconfig/dts.json",
    },
    entries: [
        {
            filePath: "../src/index.ts",
            outFile: "../dist/index.d.ts",
        },
    ],
}
