import assert from "assert"
import { schemas, validate } from "../src"
import { createValidationOfSchema } from "../src/builder"
import { assertES5 } from "./lib/is-es5"
import { assertSnapshot } from "./lib/snapshot"
import { assertType, Equals } from "./lib/type-util"

describe("schemas.number()", () => {
    const schema = schemas.number()

    it("should return the same instance always", () => {
        assert.strictEqual(schema, schemas.number())
    })

    it("should pass 0", () => {
        validate(schema, "x", 0)
    })

    it("should pass Infinity", () => {
        validate(schema, "x", Number.POSITIVE_INFINITY)
    })

    it("should pass -Infinity", () => {
        validate(schema, "x", Number.NEGATIVE_INFINITY)
    })

    it("should pass 1.79E+308", () => {
        validate(schema, "x", Number.MAX_VALUE)
    })

    it("should fail on null", () => {
        assert.throws(
            () => validate(schema, "x", null),
            new Error('"x" must be a number.'),
        )
    })

    it("should fail on NaN", () => {
        assert.throws(
            () => validate(schema, "x", Number.NaN),
            new Error('"x" must be a number.'),
        )
    })

    it("should fail on bigint", () => {
        assert.throws(
            () => validate(schema, "x", BigInt("0")),
            new Error('"x" must be a number.'),
        )
    })

    it("should fail on string", () => {
        assert.throws(
            () => validate(schema, "x", "0"),
            new Error('"x" must be a number.'),
        )
    })

    it("should have no validation for min/max", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = 0
        validate(schema, "x", value)
        assertType<Equals<typeof value, number>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.number({ allowNaN: true })", () => {
    const schema = schemas.number({ allowNaN: true })

    it("should pass 0", () => {
        validate(schema, "x", 0)
    })

    it("should pass NaN", () => {
        validate(schema, "x", Number.NaN)
    })

    it('should fail on "0"', () => {
        assert.throws(
            () => validate(schema, "x", "0"),
            new Error('"x" must be a number.'),
        )
    })

    it("should have not validation for NaN", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = 0
        validate(schema, "x", value)
        assertType<Equals<typeof value, number>>()
    })
})

describe("schemas.number({ finiteOnly: true })", () => {
    const schema = schemas.number({ finiteOnly: true })

    it("should return the same instance always", () => {
        assert.strictEqual(schema, schemas.number({ finiteOnly: true }))
    })

    it("should pass 0", () => {
        validate(schema, "x", 0)
    })

    it("should pass 1.79E+308", () => {
        validate(schema, "x", Number.MAX_VALUE)
    })

    it("should fail on Infinity", () => {
        assert.throws(
            () => validate(schema, "x", Number.POSITIVE_INFINITY),
            new Error('"x" must be a finite number.'),
        )
    })

    it("should fail on -Infinity", () => {
        assert.throws(
            () => validate(schema, "x", Number.NEGATIVE_INFINITY),
            new Error('"x" must be a finite number.'),
        )
    })

    it("should fail on NaN", () => {
        assert.throws(
            () => validate(schema, "x", Number.NaN),
            new Error('"x" must be a finite number.'),
        )
    })

    it("should fail on bigint", () => {
        assert.throws(
            () => validate(schema, "x", BigInt("0")),
            new Error('"x" must be a finite number.'),
        )
    })

    it("should have validation, but not have for min/max", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = 0
        validate(schema, "x", value)
        assertType<Equals<typeof value, number>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.number({ allowNaN: true, finiteOnly: true })", () => {
    const schema = schemas.number({ allowNaN: true, finiteOnly: true })

    it("should pass NaN", () => {
        validate(schema, "x", Number.NaN)
    })

    it("should allow NaN", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.number({ intOnly: true })", () => {
    const schema = schemas.number({ intOnly: true })

    it("should return the same instance always", () => {
        assert.strictEqual(schema, schemas.number({ intOnly: true }))
    })

    it("should pass 0", () => {
        validate(schema, "x", 0)
    })

    it("should pass 9007199254740991", () => {
        validate(schema, "x", Number.MAX_SAFE_INTEGER)
    })

    it("should fail on 0.5", () => {
        assert.throws(
            () => validate(schema, "x", 0.5),
            new Error('"x" must be an integer.'),
        )
    })

    it("should fail on Infinity", () => {
        assert.throws(
            () => validate(schema, "x", Number.POSITIVE_INFINITY),
            new Error('"x" must be an integer.'),
        )
    })

    it("should fail on -Infinity", () => {
        assert.throws(
            () => validate(schema, "x", Number.NEGATIVE_INFINITY),
            new Error('"x" must be an integer.'),
        )
    })

    it("should fail on NaN", () => {
        assert.throws(
            () => validate(schema, "x", Number.NaN),
            new Error('"x" must be an integer.'),
        )
    })

    it("should fail on bigint", () => {
        assert.throws(
            () => validate(schema, "x", BigInt("0")),
            new Error('"x" must be an integer.'),
        )
    })

    it("should have validation, but not have for min/max", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = 0
        validate(schema, "x", value)
        assertType<Equals<typeof value, number>>()
    })

    it("should be able to run on ES5", async () => {
        await assertES5(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.number({ allowNaN: true, intOnly: true })", () => {
    const schema = schemas.number({ allowNaN: true, intOnly: true })

    it("should pass NaN", () => {
        validate(schema, "x", Number.NaN)
    })

    it("should allow NaN", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.number({ maxValue: 1 })", () => {
    const schema = schemas.number({ maxValue: 1 })

    it("should pass 0", () => {
        validate(schema, "x", 0)
    })

    it("should pass 1", () => {
        validate(schema, "x", 1)
    })

    it("should fail on 2", () => {
        assert.throws(
            () => validate(schema, "x", 2),
            new Error('"x" must be 1 or less than it.'),
        )
    })

    it("should fail on NaN", () => {
        assert.throws(
            () => validate(schema, "x", Number.NaN),
            new Error('"x" must be a number.'),
        )
    })

    it("should have validation for maxValue", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = 0
        validate(schema, "x", value)
        assertType<Equals<typeof value, number>>()
    })
})

describe("schemas.number({ minValue: 1 })", () => {
    const schema = schemas.number({ minValue: 1 })

    it("should pass 2", () => {
        validate(schema, "x", 2)
    })

    it("should pass 1", () => {
        validate(schema, "x", 1)
    })

    it("should fail on 0", () => {
        assert.throws(
            () => validate(schema, "x", 0),
            new Error('"x" must be 1 or greater than it.'),
        )
    })

    it("should fail on NaN", () => {
        assert.throws(
            () => validate(schema, "x", Number.NaN),
            new Error('"x" must be a number.'),
        )
    })

    it("should have validation for minValue", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })

    it("should the value gets 'number' type", () => {
        const value: unknown = 1
        validate(schema, "x", value)
        assertType<Equals<typeof value, number>>()
    })
})

describe("schemas.number({ maxValue: 1, minValue: 0 })", () => {
    const schema = schemas.number({
        maxValue: 1,
        minValue: 0,
    })

    it("should pass 0", () => {
        validate(schema, "x", 0)
    })

    it("should pass 1", () => {
        validate(schema, "x", 1)
    })

    it("should fail on -1", () => {
        assert.throws(
            () => validate(schema, "x", Number("-1")),
            new Error('"x" must be 0 or greater than it.'),
        )
    })

    it("should fail on 2", () => {
        assert.throws(
            () => validate(schema, "x", 2),
            new Error('"x" must be 1 or less than it.'),
        )
    })

    it("should fail on NaN", () => {
        assert.throws(
            () => validate(schema, "x", Number.NaN),
            new Error('"x" must be a number.'),
        )
    })

    it("should have validation for min/max", () => {
        assertSnapshot(createValidationOfSchema(schema).toString())
    })
})

describe("schemas.number({ finiteOnly: true, intOnly: true })", () => {
    const schema = schemas.number({ finiteOnly: true, intOnly: true })

    it("should throw a fatal error on compile", () => {
        assert.throws(
            () => createValidationOfSchema(schema),
            new Error(
                '"finiteOnly" and "intOnly" cannot be true at the same time.',
            ),
        )
    })
})

describe("schemas.number({ maxValue: 0, minValue: 1 })", () => {
    const schema = schemas.number({ maxValue: 0, minValue: 1 })

    it("should throw a fatal error on compile", () => {
        assert.throws(
            () => createValidationOfSchema(schema),
            new Error('"maxValue" must be "minValue" or greater than it.'),
        )
    })
})

describe("schemas.int8", () => {
    const schema = schemas.int8

    it("should pass -128", () => {
        validate(schema, "x", -128)
    })

    it("should pass 127", () => {
        validate(schema, "x", 127)
    })

    it("should fail on -129", () => {
        assert.throws(
            () => validate(schema, "x", -129),
            new Error('"x" must be -128 or greater than it.'),
        )
    })

    it("should fail on 128", () => {
        assert.throws(
            () => validate(schema, "x", 128),
            new Error('"x" must be 127 or less than it.'),
        )
    })

    it("should fail on 0.5", () => {
        assert.throws(
            () => validate(schema, "x", 0.5),
            new Error('"x" must be an integer.'),
        )
    })
})

describe("schemas.int16", () => {
    const schema = schemas.int16

    it("should pass -32768", () => {
        validate(schema, "x", -32768)
    })

    it("should pass 32767", () => {
        validate(schema, "x", 32767)
    })

    it("should fail on -32769", () => {
        assert.throws(
            () => validate(schema, "x", -32769),
            new Error('"x" must be -32768 or greater than it.'),
        )
    })

    it("should fail on 32768", () => {
        assert.throws(
            () => validate(schema, "x", 32768),
            new Error('"x" must be 32767 or less than it.'),
        )
    })

    it("should fail on 0.5", () => {
        assert.throws(
            () => validate(schema, "x", 0.5),
            new Error('"x" must be an integer.'),
        )
    })
})

describe("schemas.int32", () => {
    const schema = schemas.int32

    it("should pass -2147483648", () => {
        validate(schema, "x", -2147483648)
    })

    it("should pass 2147483647", () => {
        validate(schema, "x", 2147483647)
    })

    it("should fail on -2147483649", () => {
        assert.throws(
            () => validate(schema, "x", -2147483649),
            new Error('"x" must be -2147483648 or greater than it.'),
        )
    })

    it("should fail on 2147483648", () => {
        assert.throws(
            () => validate(schema, "x", 2147483648),
            new Error('"x" must be 2147483647 or less than it.'),
        )
    })

    it("should fail on 0.5", () => {
        assert.throws(
            () => validate(schema, "x", 0.5),
            new Error('"x" must be an integer.'),
        )
    })
})

describe("schemas.uint8", () => {
    const schema = schemas.uint8

    it("should pass 0", () => {
        validate(schema, "x", 0)
    })

    it("should pass 255", () => {
        validate(schema, "x", 255)
    })

    it("should fail on -1", () => {
        assert.throws(
            () => validate(schema, "x", -1),
            new Error('"x" must be 0 or greater than it.'),
        )
    })

    it("should fail on 256", () => {
        assert.throws(
            () => validate(schema, "x", 256),
            new Error('"x" must be 255 or less than it.'),
        )
    })

    it("should fail on 0.5", () => {
        assert.throws(
            () => validate(schema, "x", 0.5),
            new Error('"x" must be an integer.'),
        )
    })
})

describe("schemas.uint16", () => {
    const schema = schemas.uint16

    it("should pass 0", () => {
        validate(schema, "x", 0)
    })

    it("should pass 65535", () => {
        validate(schema, "x", 65535)
    })

    it("should fail on -1", () => {
        assert.throws(
            () => validate(schema, "x", -1),
            new Error('"x" must be 0 or greater than it.'),
        )
    })

    it("should fail on 65536", () => {
        assert.throws(
            () => validate(schema, "x", 65536),
            new Error('"x" must be 65535 or less than it.'),
        )
    })

    it("should fail on 0.5", () => {
        assert.throws(
            () => validate(schema, "x", 0.5),
            new Error('"x" must be an integer.'),
        )
    })
})

describe("schemas.uint32", () => {
    const schema = schemas.uint32

    it("should pass 0", () => {
        validate(schema, "x", 0)
    })

    it("should pass 4294967295", () => {
        validate(schema, "x", 4294967295)
    })

    it("should fail on -1", () => {
        assert.throws(
            () => validate(schema, "x", -1),
            new Error('"x" must be 0 or greater than it.'),
        )
    })

    it("should fail on 4294967296", () => {
        assert.throws(
            () => validate(schema, "x", 4294967296),
            new Error('"x" must be 4294967295 or less than it.'),
        )
    })

    it("should fail on 0.5", () => {
        assert.throws(
            () => validate(schema, "x", 0.5),
            new Error('"x" must be an integer.'),
        )
    })
})