import { schemas, validate } from "../src"
import { assertThrows } from "./lib/snapshot"

describe("validate(schema, value, options)", () => {
    describe('validate(schemas.string(), "foo")', () => {
        it("should pass", () => {
            validate(schemas.string(), "foo")
        })
    })

    describe("validate(schemas.string(), 0xDEADBEAF)", () => {
        it("should fail", () => {
            assertThrows(() => validate(schemas.string(), 0xdeadbeaf))
        })
    })
})
