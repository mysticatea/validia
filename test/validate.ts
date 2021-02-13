import assert from "assert"
import { schemas, validate } from "../src"

describe("validate(schema, value, options)", () => {
    describe('validate(schemas.string(), "foo")', () => {
        it("should pass", () => {
            validate(schemas.string(), "foo")
        })
    })

    describe("validate(schemas.string(), 0xDEADBEAF)", () => {
        it("should fail", () => {
            assert.throws(
                () => validate(schemas.string(), 0xdeadbeaf),
                new Error('"value" must be a string.'),
            )
        })
    })
})
