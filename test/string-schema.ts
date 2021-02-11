import assert from "assert"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.string()", () => {
    const schema = schemas.string()

    it('should pass ""', () => {
        validate(schema, "x", "")
    })
    it('should pass "foo"', () => {
        validate(schema, "x", "foo")
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be a string.'),
        )
    })

    it("should fail on number", () => {
        assert.throws(
            () => validate(schema, "x", 0),
            new Error('"x" must be a string.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = ""
        validate(schema, "x", value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.string({ maxLength: 2 })", () => {
    const schema = schemas.string({ maxLength: 2 })

    it('should pass ""', () => {
        validate(schema, "x", "")
    })
    it('should pass "f"', () => {
        validate(schema, "x", "f")
    })
    it('should pass "fo"', () => {
        validate(schema, "x", "fo")
    })
    it('should fail on "foo"', () => {
        assert.throws(
            () => validate(schema, "x", "foo"),
            new Error('The cheracters of "x" must be 2 or less than it.'),
        )
    })

    it('should pass "👍👍"', () => {
        validate(schema, "x", "👍👍")
    })
    it('should fail on "👍👍1"', () => {
        assert.throws(
            () => validate(schema, "x", "👍👍1"),
            new Error('The cheracters of "x" must be 2 or less than it.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = ""
        validate(schema, "x", value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.string({ minLength: 2 })", () => {
    const schema = schemas.string({ minLength: 2 })

    it('should pass "foo"', () => {
        validate(schema, "x", "foo")
    })
    it('should pass "fo"', () => {
        validate(schema, "x", "fo")
    })
    it('should fail on "f"', () => {
        assert.throws(
            () => validate(schema, "x", "f"),
            new Error('The cheracters of "x" must be 2 or more than it.'),
        )
    })

    it('should pass "👍👍"', () => {
        validate(schema, "x", "👍👍")
    })
    it('should fail on "👍"', () => {
        assert.throws(
            () => validate(schema, "x", "👍"),
            new Error('The cheracters of "x" must be 2 or more than it.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = "two"
        validate(schema, "x", value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.string({ maxLength: 2, minLength: 1 })", () => {
    const schema = schemas.string({ maxLength: 2, minLength: 1 })

    it('should pass "f"', () => {
        validate(schema, "x", "f")
    })
    it('should pass "fo"', () => {
        validate(schema, "x", "fo")
    })

    it('should fail on ""', () => {
        assert.throws(
            () => validate(schema, "x", ""),
            new Error('The cheracters of "x" must be 1 or more than it.'),
        )
    })
    it('should fail on "foo"', () => {
        assert.throws(
            () => validate(schema, "x", "foo"),
            new Error('The cheracters of "x" must be 2 or less than it.'),
        )
    })

    it('should pass "👍"', () => {
        validate(schema, "x", "👍")
    })
    it('should pass "👍👍"', () => {
        validate(schema, "x", "👍👍")
    })
    it('should fail on "👍👍👍"', () => {
        assert.throws(
            () => validate(schema, "x", "👍👍👍"),
            new Error('The cheracters of "x" must be 2 or less than it.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = "s"
        validate(schema, "x", value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.string({ maxLength: 1, minLength: 2 })", () => {
    const schema = schemas.string({ maxLength: 1, minLength: 2 })

    it("should throw a fatal error on compile", () => {
        assert.throws(
            () => createValidationOfSchema(schema),
            new Error('"maxLength" must be "minLength" or greater than it.'),
        )
    })
})

describe("schemas.string({ pattern: /^\\d+$/ })", () => {
    // eslint-disable-next-line require-unicode-regexp
    const schema = schemas.string({ pattern: /^\d+$/ })

    it('should pass "0"', () => {
        validate(schema, "x", "0")
    })
    it('should pass "999"', () => {
        validate(schema, "x", "999")
    })

    it('should fail on ""', () => {
        assert.throws(
            () => validate(schema, "x", ""),
            new Error('"x" must match the pattern /^\\d+$/.'),
        )
    })
    it('should fail on "foo"', () => {
        assert.throws(
            () => validate(schema, "x", "foo"),
            new Error('"x" must match the pattern /^\\d+$/.'),
        )
    })

    it("should have validation", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'string' type", () => {
        const value: unknown = "0"
        validate(schema, "x", value)
        assertType<Equals<typeof value, string>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})
