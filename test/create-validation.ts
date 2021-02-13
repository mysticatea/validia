import assert from "assert"
import { createValidation, Schema, schemas, Validate } from "../src"

describe("createValidation(schema, options)", () => {
    describe("createValidation(schemas.string())", () => {
        const validate: Validate<Schema.String> = createValidation(
            schemas.string(),
        )

        it('should pass "foo"', () => {
            validate("x", "foo")
        })

        it("should fail 0xDEADBEAF", () => {
            assert.throws(
                () => validate("x", 0xdeadbeaf),
                new Error('"x" must be a string.'),
            )
        })
    })
})
