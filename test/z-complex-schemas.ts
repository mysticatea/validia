import assert from "assert"
import path from "path"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.object({ include: schemas.anyOf(schemas.string(), schemas.array(schemas.string())), exclude: schemas.anyOf(schemas.string(), schemas.array(schemas.string())) })", () => {
    const schema = schemas.object({
        include: schemas.anyOf(
            schemas.string(),
            schemas.array(schemas.string()),
        ),
        exclude: schemas.anyOf(
            schemas.string(),
            schemas.array(schemas.string()),
        ),
    })

    it("should pass {}", () => {
        validate(schema, {})
    })
    it('should pass { include: "foo" }', () => {
        validate(schema, { include: "foo" })
    })
    it('should pass { include: ["foo"] }', () => {
        validate(schema, { include: ["foo"] })
    })
    it('should pass { include: ["foo"], exclude: "bar" }', () => {
        validate(schema, { include: ["foo"], exclude: "bar" })
    })

    it("should fail on { include: 3 }", () => {
        assert.throws(
            () => validate(schema, { include: 3 }),
            new Error('"value.include" must be a string or an array.'),
        )
    })

    it("should have good validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'any' type", () => {
        const value: unknown = {}
        validate(schema, value)
        assertType<
            Equals<
                typeof value,
                {
                    include?: string[] | string | undefined
                    exclude?: string[] | string | undefined
                }
            >
        >()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("IsomochaCommonOptions", () => {
    const ValidCoverageReporterIds = [
        "clover",
        "cobertura",
        "html-spa",
        "html",
        "json-summary",
        "json",
        "lcov",
        "lcovonly",
        "teamcity",
        "text-lcov",
        "text-summary",
        "text",
    ] as const
    const ValidMochaUIs = [
        "bdd",
        "tdd",
        /* "exports", isn't support for now */
        /* "qunit", isn't support for now */
    ] as const
    const ValidEnvironmentIds = [
        "node",
        "chromium",
        "firefox",
        "webkit",
    ] as const
    const AbsolutePathSchema = schemas.custom(
        "an absolute path",
        (x: any): x is string => typeof x === "string" && path.isAbsolute(x),
    )
    const Unsupported = schemas.custom(
        "never because unsupported",
        (_x: any): _x is never => false,
    )
    const MochaOptionsSchema = schemas.object({
        allowUncaught: schemas.boolean(),
        asyncOnly: schemas.boolean(),
        bail: schemas.boolean(),
        checkLeaks: schemas.boolean(),
        color: schemas.boolean(),
        delay: schemas.boolean(),
        diff: schemas.boolean(),
        fgrep: schemas.string({ minLength: 1 }),
        forbidOnly: schemas.boolean(),
        forbidPending: schemas.boolean(),
        fullTrace: schemas.boolean(),
        global: schemas.array(schemas.string({ minLength: 1 })),
        grep: schemas.anyOf(
            schemas.instanceOf(RegExp),
            schemas.string({ minLength: 1 }),
        ),
        growl: schemas.boolean(),
        inlineDiffs: schemas.boolean(),
        invert: schemas.boolean(),
        isWorker: Unsupported,
        jobs: Unsupported,
        noHighlighting: Unsupported,
        parallel: Unsupported,
        reporter: schemas.anyOf(
            schemas.string({ minLength: 1 }),
            schemas.function(),
        ),
        reporterOptions: schemas.record(),
        retries: schemas.number(),
        rootHooks: Unsupported,
        slow: schemas.anyOf(schemas.number(), schemas.string()),
        timeout: schemas.anyOf(schemas.number(), schemas.string()),
        ui: schemas.enum(...ValidMochaUIs),
    })
    const WebpackOptionsSchema = schemas.object({
        context: Unsupported,
        entry: Unsupported,
        mode: Unsupported,
        output: Unsupported,
        module: schemas.object({ rules: schemas.array() }),
        resolve: schemas.object({ alias: schemas.record() }),
        resolveLoader: Unsupported,
        optimization: Unsupported,
        plugins: schemas.array(),
        devServer: Unsupported,
        devtool: Unsupported,
        target: Unsupported,
        watch: Unsupported,
        watchOptions: Unsupported,
        externals: Unsupported,
        externalsType: Unsupported,
        externalsPresets: Unsupported,
        performance: Unsupported,
        node: Unsupported,
        stats: Unsupported,
        experiments: Unsupported,
        amd: Unsupported,
        bail: Unsupported,
        cache: Unsupported,
        ignoreWarnings: Unsupported,
        loader: Unsupported,
        parallelism: Unsupported,
        profile: Unsupported,
        recordsPath: Unsupported,
        recordsInputPath: Unsupported,
        recordsOutputPath: Unsupported,
        name: Unsupported,
        infrastructureLogging: Unsupported,
        snapshot: Unsupported,
    })
    const schema = schemas.object({
        assertShim: schemas.boolean(),
        coverageOptions: schemas.object({
            outputDirectoryPath: schemas.string({ minLength: 1 }),
            reporters: schemas.array(
                schemas.anyOf(
                    schemas.enum(...ValidCoverageReporterIds),
                    schemas.object(
                        {
                            id: schemas.enum(...ValidCoverageReporterIds),
                            options: schemas.record(),
                        },
                        { required: ["id"] },
                    ),
                ),
            ),
            sourceFilePatterns: schemas.array(schemas.string({ minLength: 1 })),
        }),
        cwd: AbsolutePathSchema,
        debug: schemas.boolean(),
        environments: schemas.array(schemas.enum(...ValidEnvironmentIds)),
        mochaOptions: MochaOptionsSchema,
        sortTestFiles: schemas.boolean(),
        webpackOptions: schemas.anyOf(WebpackOptionsSchema, schemas.function()),
    })

    it("should have good validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
