import assert from "assert"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.bigInt()", () => {
    const schema = schemas.bigInt()

    it("should return the same instance always", () => {
        assert.strictEqual(schema, schemas.bigInt())
    })

    it("should pass 0n", () => {
        validate(schema, "x", BigInt("0"))
    })

    it("should pass 18446744073709551615n", () => {
        validate(schema, "x", BigInt("18446744073709551615"))
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be a bigint value.'),
        )
    })

    it("should fail on number", () => {
        assert.throws(
            () => validate(schema, "x", 0),
            new Error('"x" must be a bigint value.'),
        )
    })

    it("should fail on string", () => {
        assert.throws(
            () => validate(schema, "x", "0"),
            new Error('"x" must be a bigint value.'),
        )
    })

    it("should have no validation for min/max", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'bigint' type", () => {
        const value: unknown = BigInt("0")
        validate(schema, "x", value)
        assertType<Equals<typeof value, bigint>>()
    })
})

describe("schemas.bigInt({ maxValue: 1n })", () => {
    const schema = schemas.bigInt({ maxValue: BigInt("1") })

    it("should pass 0n", () => {
        validate(schema, "x", BigInt("0"))
    })

    it("should pass 1n", () => {
        validate(schema, "x", BigInt("1"))
    })

    it("should fail on 2n", () => {
        assert.throws(
            () => validate(schema, "x", BigInt("2")),
            new Error('"x" must be 1n or less than it.'),
        )
    })

    it("should have validation for maxValue", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'bigint' type", () => {
        const value: unknown = BigInt("0")
        validate(schema, "x", value)
        assertType<Equals<typeof value, bigint>>()
    })
})

describe("schemas.bigInt({ minValue: 1n })", () => {
    const schema = schemas.bigInt({ minValue: BigInt("1") })

    it("should pass 2n", () => {
        validate(schema, "x", BigInt("2"))
    })

    it("should pass 1n", () => {
        validate(schema, "x", BigInt("1"))
    })

    it("should fail on 0n", () => {
        assert.throws(
            () => validate(schema, "x", BigInt("0")),
            new Error('"x" must be 1n or greater than it.'),
        )
    })

    it("should have validation for minValue", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'bigint' type", () => {
        const value: unknown = BigInt("1")
        validate(schema, "x", value)
        assertType<Equals<typeof value, bigint>>()
    })
})

describe("schemas.bigInt({ maxValue: 1n, minValue: 0n })", () => {
    const schema = schemas.bigInt({
        maxValue: BigInt("1"),
        minValue: BigInt("0"),
    })

    it("should pass 0n", () => {
        validate(schema, "x", BigInt("0"))
    })

    it("should pass 1n", () => {
        validate(schema, "x", BigInt("1"))
    })

    it("should fail on -1n", () => {
        assert.throws(
            () => validate(schema, "x", BigInt("-1")),
            new Error('"x" must be 0n or greater than it.'),
        )
    })

    it("should fail on 2n", () => {
        assert.throws(
            () => validate(schema, "x", BigInt("2")),
            new Error('"x" must be 1n or less than it.'),
        )
    })

    it("should have validation for min/max", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.bigInt({ maxValue: 0n, minValue: 1n })", () => {
    const schema = schemas.bigInt({
        maxValue: BigInt("0"),
        minValue: BigInt("1"),
    })

    it("should throw a fatal error on compile", () => {
        assert.throws(
            () => createValidationOfSchema(schema),
            new Error('"maxValue" must be "minValue" or greater than it.'),
        )
    })
})

describe("schemas.bigInt64", () => {
    const schema = schemas.bigInt64

    it("should pass -9223372036854775808n", () => {
        validate(schema, "x", BigInt("-9223372036854775808"))
    })

    it("should pass 9223372036854775807n", () => {
        validate(schema, "x", BigInt("9223372036854775807"))
    })

    it("should fail on -9223372036854775809n", () => {
        assert.throws(
            () => validate(schema, "x", BigInt("-9223372036854775809")),
            new Error('"x" must be -9223372036854775808n or greater than it.'),
        )
    })

    it("should fail on 9223372036854775808n", () => {
        assert.throws(
            () => validate(schema, "x", BigInt("9223372036854775808")),
            new Error('"x" must be 9223372036854775807n or less than it.'),
        )
    })
})

describe("schemas.bigUint64", () => {
    const schema = schemas.bigUint64

    it("should pass 0", () => {
        validate(schema, "x", BigInt("0"))
    })

    it("should pass 18446744073709551615n", () => {
        validate(schema, "x", BigInt("18446744073709551615"))
    })

    it("should fail on -1n", () => {
        assert.throws(
            () => validate(schema, "x", BigInt("-1")),
            new Error('"x" must be 0n or greater than it.'),
        )
    })

    it("should fail on 18446744073709551616n", () => {
        assert.throws(
            () => validate(schema, "x", BigInt("18446744073709551616")),
            new Error('"x" must be 18446744073709551615n or less than it.'),
        )
    })
})
