import assert from "assert"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.any()", () => {
    const schema = schemas.any()

    it("should return the same instance always", () => {
        assert.strictEqual(schema, schemas.any())
    })

    it("should pass true", () => {
        validate(schema, "x", true)
    })
    it("should pass 1", () => {
        validate(schema, "x", 1)
    })
    it('should pass "foo"', () => {
        validate(schema, "x", "foo")
    })

    it("should have no validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'any' type", () => {
        const value: unknown = true
        validate(schema, "x", value)
        assertType<Equals<typeof value, any>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})