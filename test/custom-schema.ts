import assert from "assert"
import path from "path"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe('schemas.custom("an absolute path", (x: unknown): x is string => ...)', () => {
    const schema = schemas.custom(
        "an absolute path",
        (x: unknown): x is string =>
            typeof x === "string" && path.isAbsolute(x),
    )

    it("should pass process.cwd()", () => {
        validate(schema, "x", process.cwd())
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be an absolute path.'),
        )
    })

    it("should fail on ./foo.js", () => {
        assert.throws(
            () => validate(schema, "x", "./foo.js"),
            new Error('"x" must be an absolute path.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = process.cwd()
        validate(schema, "x", value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
