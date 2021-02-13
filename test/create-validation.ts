import { createValidation, Schema, schemas, Validate } from "../src"
import { assertThrows } from "./lib/snapshot"

describe("createValidation(schema, options)", () => {
    describe("createValidation(schemas.string())", () => {
        const validate: Validate<Schema.String> = createValidation(
            schemas.string(),
        )

        it('should pass "foo"', () => {
            validate("foo")
        })

        it("should fail 0xDEADBEAF", () => {
            assertThrows(() => validate(0xdeadbeaf))
        })
    })
})
