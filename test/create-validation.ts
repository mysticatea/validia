import assert from "assert"
import { createValidation, Schema, schemas, Validate } from "../src"

describe("createValidation(schema, options)", () => {
    describe("createValidation(schemas.string())", () => {
        const validate: Validate<Schema.String> = createValidation(
            schemas.string(),
        )

        it('should pass "foo"', () => {
            validate("foo")
        })

        it("should fail 0xDEADBEAF", () => {
            assert.throws(
                () => validate(0xdeadbeaf),
                new Error('"value" must be a string.'),
            )
        })
    })
})
