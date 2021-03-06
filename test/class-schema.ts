import { assertSnapshot, assertSnapshotThrows } from "mocha-assert-snapshot"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.instanceOf(RegExp)", () => {
    const schema = schemas.instanceOf(RegExp)

    it("should pass /foo/u", () => {
        validate(schema, /foo/u)
    })

    it("should fail on null", () => {
        assertSnapshotThrows(() => validate(schema, null))
    })

    it("should fail on string", () => {
        assertSnapshotThrows(() => validate(schema, "/foo/u"))
    })

    it("should fail on other objects", () => {
        assertSnapshotThrows(() =>
            validate(schema, { pattern: "foo", flags: "u" }),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'RegExp' type", () => {
        const value: unknown = /foo/u
        validate(schema, value)
        assertType<Equals<typeof value, RegExp>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
