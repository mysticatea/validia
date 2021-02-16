import { assertSnapshotThrows } from "mocha-assert-snapshot"
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
            assertSnapshotThrows(() => validate(0xdeadbeaf))
        })
    })
})
