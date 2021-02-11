import assert from "assert"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.boolean()", () => {
    const schema = schemas.boolean()

    it("should pass true", () => {
        validate(schema, "x", true)
    })

    it("should pass false", () => {
        validate(schema, "x", false)
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be a boolean value.'),
        )
    })

    it("should fail on number", () => {
        assert.throws(
            () => validate(schema, "x", 0),
            new Error('"x" must be a boolean value.'),
        )
    })

    it("should fail on string", () => {
        assert.throws(
            () => validate(schema, "x", "0"),
            new Error('"x" must be a boolean value.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'boolean' type", () => {
        const value: unknown = true
        validate(schema, "x", value)
        assertType<Equals<typeof value, boolean>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
