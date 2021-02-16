import { assertSnapshot, assertSnapshotThrows } from "mocha-assert-snapshot"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.string()", () => {
    const schema = schemas.string()

    it('should pass ""', () => {
        validate(schema, "")
    })
    it('should pass "foo"', () => {
        validate(schema, "foo")
    })

    it("should fail on null", () => {
        assertSnapshotThrows(() => validate(schema, null))
    })

    it("should fail on number", () => {
        assertSnapshotThrows(() => validate(schema, 0))
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = ""
        validate(schema, value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.string({ maxLength: 2 })", () => {
    const schema = schemas.string({ maxLength: 2 })

    it('should pass ""', () => {
        validate(schema, "")
    })
    it('should pass "f"', () => {
        validate(schema, "f")
    })
    it('should pass "fo"', () => {
        validate(schema, "fo")
    })
    it('should fail on "foo"', () => {
        assertSnapshotThrows(() => validate(schema, "foo"))
    })

    it('should pass "👍👍"', () => {
        validate(schema, "👍👍")
    })
    it('should fail on "👍👍1"', () => {
        assertSnapshotThrows(() => validate(schema, "👍👍1"))
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = ""
        validate(schema, value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.string({ minLength: 2 })", () => {
    const schema = schemas.string({ minLength: 2 })

    it('should pass "foo"', () => {
        validate(schema, "foo")
    })
    it('should pass "fo"', () => {
        validate(schema, "fo")
    })
    it('should fail on "f"', () => {
        assertSnapshotThrows(() => validate(schema, "f"))
    })

    it('should pass "👍👍"', () => {
        validate(schema, "👍👍")
    })
    it('should fail on "👍"', () => {
        assertSnapshotThrows(() => validate(schema, "👍"))
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = "two"
        validate(schema, value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.string({ maxLength: 2, minLength: 1 })", () => {
    const schema = schemas.string({ maxLength: 2, minLength: 1 })

    it('should pass "f"', () => {
        validate(schema, "f")
    })
    it('should pass "fo"', () => {
        validate(schema, "fo")
    })

    it('should fail on ""', () => {
        assertSnapshotThrows(() => validate(schema, ""))
    })
    it('should fail on "foo"', () => {
        assertSnapshotThrows(() => validate(schema, "foo"))
    })

    it('should pass "👍"', () => {
        validate(schema, "👍")
    })
    it('should pass "👍👍"', () => {
        validate(schema, "👍👍")
    })
    it('should fail on "👍👍👍"', () => {
        assertSnapshotThrows(() => validate(schema, "👍👍👍"))
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = "s"
        validate(schema, value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.string({ maxLength: 1, minLength: 2 })", () => {
    const schema = schemas.string({ maxLength: 1, minLength: 2 })

    it("should throw a fatal error on compile", () => {
        assertSnapshotThrows(() => createValidationOfSchema(schema))
    })
})

describe("schemas.string({ pattern: /^\\d+$/ })", () => {
    // eslint-disable-next-line require-unicode-regexp
    const schema = schemas.string({ pattern: /^\d+$/ })

    it('should pass "0"', () => {
        validate(schema, "0")
    })
    it('should pass "999"', () => {
        validate(schema, "999")
    })

    it('should fail on ""', () => {
        assertSnapshotThrows(() => validate(schema, ""))
    })
    it('should fail on "foo"', () => {
        assertSnapshotThrows(() => validate(schema, "foo"))
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = "0"
        validate(schema, value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
