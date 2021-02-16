import { assertSnapshotThrows } from "mocha-assert-snapshot"
import { schemas, validate } from "../src"

describe("validate(schema, value, options)", () => {
    describe('validate(schemas.string(), "foo")', () => {
        it("should pass", () => {
            validate(schemas.string(), "foo")
        })
    })

    describe("validate(schemas.string(), 0xDEADBEAF)", () => {
        it("should fail", () => {
            assertSnapshotThrows(() => validate(schemas.string(), 0xdeadbeaf))
        })
    })
})
