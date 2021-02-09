import assert from "assert"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.instanceOf(RegExp)", () => {
    const schema = schemas.instanceOf(RegExp)

    it("should return the same instance always", () => {
        assert.strictEqual(schema, schemas.instanceOf(RegExp))
    })

    it("should pass /foo/u", () => {
        validate(schema, "x", /foo/u)
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be an instance of RegExp.'),
        )
    })

    it("should fail on string", () => {
        assert.throws(
            () => validate(schema, "x", "/foo/u"),
            new Error('"x" must be an instance of RegExp.'),
        )
    })

    it("should fail on other objects", () => {
        assert.throws(
            () => validate(schema, "x", { pattern: "foo", flags: "u" }),
            new Error('"x" must be an instance of RegExp.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'RegExp' type", () => {
        const value: unknown = /foo/u
        validate(schema, "x", value)
        assertType<Equals<typeof value, RegExp>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
