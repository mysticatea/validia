exports["schemas.any() should have no validation #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  return errors;
}"
`.slice(1, -1)
exports["schemas.anyOf(schemas.number(), schemas.enum(\"auto\", \"none\")) should have validation #[0]"] = String.raw`
"function validate(a0, a1, a2, name, value) {
  \"use strict\";
  var errors = [], i0 = 0, r0 = null;
  r0 = a0(a1, name, value)
  if (r0.length >= 2) {
    errors.push({ code: \"union\", args: { name: name, schemas: a2 }, depth: 1 });
  }
  if (r0.length === 1) {
    for (i0 = 0; i0 < r0[0].length; ++i0) {
      errors.push(r0[0][i0])
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.anyOf(schemas.number(), schemas.string()) should have validation #[0]"] = String.raw`
"function validate(a0, a1, a2, name, value) {
  \"use strict\";
  var errors = [], i0 = 0, r0 = null;
  r0 = a0(a1, name, value)
  if (r0.length >= 2) {
    errors.push({ code: \"union\", args: { name: name, schemas: a2 }, depth: 1 });
  }
  if (r0.length === 1) {
    for (i0 = 0; i0 < r0[0].length; ++i0) {
      errors.push(r0[0][i0])
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.anyOf(schemas.number(), schemas.string(), schemas.object({ value: schemas.number() })) should have validation #[0]"] = String.raw`
"function validate(a0, a1, a2, name, value) {
  \"use strict\";
  var errors = [], i0 = 0, r0 = null;
  r0 = a0(a1, name, value)
  if (r0.length >= 2) {
    errors.push({ code: \"union\", args: { name: name, schemas: a2 }, depth: 1 });
  }
  if (r0.length === 1) {
    for (i0 = 0; i0 < r0[0].length; ++i0) {
      errors.push(r0[0][i0])
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.array() should have no validation for elements #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (!Array.isArray(value)) {
    errors.push({ code: \"array\", args: { name: name }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.array(schemas.any(), { maxLength: 2 }) should have validation for maxLength #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [], i0 = 0;
  if (!Array.isArray(value)) {
    errors.push({ code: \"array\", args: { name: name }, depth: 1 });
  } else {
    i0 = value.length;
    if (i0 > 2) {
      errors.push({ code: \"arrayMaxLength\", args: { name: name, maxLength: 2 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.array(schemas.any(), { minLength: 2 }) should have validation for minLength #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [], i0 = 0;
  if (!Array.isArray(value)) {
    errors.push({ code: \"array\", args: { name: name }, depth: 1 });
  } else {
    i0 = value.length;
    if (i0 < 2) {
      errors.push({ code: \"arrayMinLength\", args: { name: name, minLength: 2 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.array(schemas.any(), { unique: true }) should have validation for unique #[0]"] = String.raw`
"function validate(a0, name, value) {
  \"use strict\";
  var errors = [], i0 = 0;
  if (!Array.isArray(value)) {
    errors.push({ code: \"array\", args: { name: name }, depth: 1 });
  } else {
    i0 = value.length;
    if (!a0(value, i0)) {
      errors.push({ code: \"arrayUnique\", args: { name: name }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.array(schemas.string()) should have validation for elements #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [], i0 = 0, i1 = 0, s0 = \"\", r0 = null;
  if (!Array.isArray(value)) {
    errors.push({ code: \"array\", args: { name: name }, depth: 1 });
  } else {
    i0 = value.length;
    for (i1 = 0; i1 < i0; ++i1) {
      s0 = name + \"[\" + i1 + \"]\";
      r0 = value[i1];
      if (typeof r0 !== \"string\") {
        errors.push({ code: \"string\", args: { name: s0 }, depth: 2 });
      }
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.array(schemas.string(), { maxLength: 2, minLength: 1, unique: true }) should have validation for all options #[0]"] = String.raw`
"function validate(a0, name, value) {
  \"use strict\";
  var errors = [], i0 = 0, i1 = 0, s0 = \"\", r0 = null;
  if (!Array.isArray(value)) {
    errors.push({ code: \"array\", args: { name: name }, depth: 1 });
  } else {
    i0 = value.length;
    if (i0 > 2) {
      errors.push({ code: \"arrayMaxLength\", args: { name: name, maxLength: 2 }, depth: 1 });
    }
    if (i0 < 1) {
      errors.push({ code: \"arrayMinLength\", args: { name: name, minLength: 1 }, depth: 1 });
    }
    if (!a0(value, i0)) {
      errors.push({ code: \"arrayUnique\", args: { name: name }, depth: 1 });
    }
    for (i1 = 0; i1 < i0; ++i1) {
      s0 = name + \"[\" + i1 + \"]\";
      r0 = value[i1];
      if (typeof r0 !== \"string\") {
        errors.push({ code: \"string\", args: { name: s0 }, depth: 2 });
      }
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.bigInt() should have no validation for min/max #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"bigint\") {
    errors.push({ code: \"bigint\", args: { name: name }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.bigInt({ maxValue: 1n }) should have validation for maxValue #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"bigint\") {
    errors.push({ code: \"bigint\", args: { name: name }, depth: 1 });
  } else {
    if (value > 1n) {
      errors.push({ code: \"bigintMaxValue\", args: { name: name, maxValue: 1n }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.bigInt({ maxValue: 1n, minValue: 0n }) should have validation for min/max #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"bigint\") {
    errors.push({ code: \"bigint\", args: { name: name }, depth: 1 });
  } else {
    if (value > 1n) {
      errors.push({ code: \"bigintMaxValue\", args: { name: name, maxValue: 1n }, depth: 1 });
    }
    if (value < 0n) {
      errors.push({ code: \"bigintMinValue\", args: { name: name, minValue: 0n }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.bigInt({ minValue: 1n }) should have validation for minValue #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"bigint\") {
    errors.push({ code: \"bigint\", args: { name: name }, depth: 1 });
  } else {
    if (value < 1n) {
      errors.push({ code: \"bigintMinValue\", args: { name: name, minValue: 1n }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.boolean() should have validation #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"boolean\") {
    errors.push({ code: \"boolean\", args: { name: name }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.custom(\"an absolute path\", (x: unknown): x is string => ...) should have validation #[0]"] = String.raw`
"function validate(a0, name, value) {
  \"use strict\";
  var errors = [];
  if (!a0(value)) {
    errors.push({ code: \"custom\", args: { name: name, checkFunc: a0, checkName: \"an absolute path\" }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.enum(1n, true, 0, null, \"foo\", undefined) should have validation; it uses symbol equality comparison #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (value !== 1n && value !== true && value !== 0 && value !== null && value !== \"foo\" && value !== undefined) {
    errors.push({ code: \"enum\", args: { name: name, values: [1n, true, 0, null, \"foo\", undefined] }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.enum(Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY) should have validation; it can handle NaN correctly #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (!Number.isNaN(value) && value !== Number.POSITIVE_INFINITY && value !== Number.NEGATIVE_INFINITY) {
    errors.push({ code: \"enum\", args: { name: name, values: [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY] }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.enum(Symbol.iterator) should have validation #[0]"] = String.raw`
"function validate(a0, name, value) {
  \"use strict\";
  var errors = [];
  if (value !== a0) {
    errors.push({ code: \"enum\", args: { name: name, values: [a0] }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.enum(myObj, Number.NaN) should have validation; it can handle NaN correctly, along with reference values. #[0]"] = String.raw`
"function validate(a0, name, value) {
  \"use strict\";
  var errors = [];
  if (!Number.isNaN(value) && a0.indexOf(value) === -1) {
    errors.push({ code: \"enum\", args: { name: name, values: a0.slice(0) }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.enum(myObj, mySymbol, myFunc) should have validation; give 'values' as an argument because it contains references. #[0]"] = String.raw`
"function validate(a0, name, value) {
  \"use strict\";
  var errors = [];
  if (a0.indexOf(value) === -1) {
    errors.push({ code: \"enum\", args: { name: name, values: a0.slice(0) }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.enum(null) should have validation #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (value !== null) {
    errors.push({ code: \"enum\", args: { name: name, values: [null] }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.function() should have validation #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"function\") {
    errors.push({ code: \"function\", args: { name: name }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.instanceOf(RegExp) should have validation #[0]"] = String.raw`
"function validate(a0, name, value) {
  \"use strict\";
  var errors = [];
  if (!(value instanceof a0)) {
    errors.push({ code: \"class\", args: { name: name, constructor: a0 }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.number() should have no validation for min/max #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"number\" || Number.isNaN(value)) {
    errors.push({ code: \"number\", args: { name: name }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.number({ allowNaN: true }) should have not validation for NaN #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"number\") {
    errors.push({ code: \"number\", args: { name: name }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.number({ allowNaN: true, finiteOnly: true }) should allow NaN #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (!Number.isFinite(value) && !Number.isNaN(value)) {
    errors.push({ code: \"numberFiniteOnly\", args: { name: name }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.number({ allowNaN: true, intOnly: true }) should allow NaN #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (!Number.isInteger(value) && !Number.isNaN(value)) {
    errors.push({ code: \"numberIntOnly\", args: { name: name }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.number({ finiteOnly: true }) should have validation, but not have for min/max #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (!Number.isFinite(value)) {
    errors.push({ code: \"numberFiniteOnly\", args: { name: name }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.number({ intOnly: true }) should have validation, but not have for min/max #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (!Number.isInteger(value)) {
    errors.push({ code: \"numberIntOnly\", args: { name: name }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.number({ maxValue: 1 }) should have validation for maxValue #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"number\" || Number.isNaN(value)) {
    errors.push({ code: \"number\", args: { name: name }, depth: 1 });
  } else {
    if (value > 1) {
      errors.push({ code: \"numberMaxValue\", args: { name: name, maxValue: 1 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.number({ maxValue: 1, minValue: 0 }) should have validation for min/max #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"number\" || Number.isNaN(value)) {
    errors.push({ code: \"number\", args: { name: name }, depth: 1 });
  } else {
    if (value > 1) {
      errors.push({ code: \"numberMaxValue\", args: { name: name, maxValue: 1 }, depth: 1 });
    }
    if (value < 0) {
      errors.push({ code: \"numberMinValue\", args: { name: name, minValue: 0 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.number({ minValue: 1 }) should have validation for minValue #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"number\" || Number.isNaN(value)) {
    errors.push({ code: \"number\", args: { name: name }, depth: 1 });
  } else {
    if (value < 1) {
      errors.push({ code: \"numberMinValue\", args: { name: name, minValue: 1 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.object() should have no validation for properties #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"object\" || value === null) {
    errors.push({ code: \"object\", args: { name: name }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.object({ one: schemas.any(), two: schemas.any() }) should have validation, but not have validations for property values #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [], i0 = 0, r0 = null, r1 = null;
  if (typeof value !== \"object\" || value === null) {
    errors.push({ code: \"object\", args: { name: name }, depth: 1 });
  } else {
    r0 = Object.keys(value);
    r1 = [];
    i0 = r0.indexOf(\"one\");
    if (i0 !== -1) {
      r0.splice(i0, 1);
    } else {
      r1.push(\"one\")
    }
    i0 = r0.indexOf(\"two\");
    if (i0 !== -1) {
      r0.splice(i0, 1);
    } else {
      r1.push(\"two\")
    }
    if (r1.length > 0) {
      errors.push({ code: \"objectRequiredKeys\", args: { name: name, keys: r1 }, depth: 1 });
    }
    if (r0.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: r0 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.object({ one: schemas.string(), two: schemas.string() }) should have validation for property values #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [], i0 = 0, s0 = \"\", r0 = null, r1 = null, r2 = null;
  if (typeof value !== \"object\" || value === null) {
    errors.push({ code: \"object\", args: { name: name }, depth: 1 });
  } else {
    r0 = Object.keys(value);
    r1 = [];
    i0 = r0.indexOf(\"one\");
    if (i0 !== -1) {
      r0.splice(i0, 1);
      s0 = name + \".one\";
      r2 = value[\"one\"];
      if (typeof r2 !== \"string\") {
        errors.push({ code: \"string\", args: { name: s0 }, depth: 2 });
      }
    } else {
      r1.push(\"one\")
    }
    i0 = r0.indexOf(\"two\");
    if (i0 !== -1) {
      r0.splice(i0, 1);
      s0 = name + \".two\";
      r2 = value[\"two\"];
      if (typeof r2 !== \"string\") {
        errors.push({ code: \"string\", args: { name: s0 }, depth: 2 });
      }
    } else {
      r1.push(\"two\")
    }
    if (r1.length > 0) {
      errors.push({ code: \"objectRequiredKeys\", args: { name: name, keys: r1 }, depth: 1 });
    }
    if (r0.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: r0 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.object({}) should have validation, only for unknown properties #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [], r0 = null;
  if (typeof value !== \"object\" || value === null) {
    errors.push({ code: \"object\", args: { name: name }, depth: 1 });
  } else {
    r0 = Object.keys(value);
    if (r0.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: r0 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.partialObject({ one: schemas.any(), two: schemas.any() }) should have validation, but not have validations for property values #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [], i0 = 0, r0 = null;
  if (typeof value !== \"object\" || value === null) {
    errors.push({ code: \"object\", args: { name: name }, depth: 1 });
  } else {
    r0 = Object.keys(value);
    i0 = r0.indexOf(\"one\");
    if (i0 !== -1) {
      r0.splice(i0, 1);
    }
    i0 = r0.indexOf(\"two\");
    if (i0 !== -1) {
      r0.splice(i0, 1);
    }
    if (r0.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: r0 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.partialObject({ one: schemas.string(), two: schemas.string() }) should have validation for property values #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [], i0 = 0, s0 = \"\", r0 = null, r1 = null;
  if (typeof value !== \"object\" || value === null) {
    errors.push({ code: \"object\", args: { name: name }, depth: 1 });
  } else {
    r0 = Object.keys(value);
    i0 = r0.indexOf(\"one\");
    if (i0 !== -1) {
      r0.splice(i0, 1);
      s0 = name + \".one\";
      r1 = value[\"one\"];
      if (r1 !== undefined) {
        if (typeof r1 !== \"string\") {
          errors.push({ code: \"string\", args: { name: s0 }, depth: 2 });
        }
      }
    }
    i0 = r0.indexOf(\"two\");
    if (i0 !== -1) {
      r0.splice(i0, 1);
      s0 = name + \".two\";
      r1 = value[\"two\"];
      if (r1 !== undefined) {
        if (typeof r1 !== \"string\") {
          errors.push({ code: \"string\", args: { name: s0 }, depth: 2 });
        }
      }
    }
    if (r0.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: r0 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.partialObject({ one: schemas.string(), two: schemas.string() }, [\"one\"]) should have validation for property values #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [], i0 = 0, s0 = \"\", r0 = null, r1 = null, r2 = null;
  if (typeof value !== \"object\" || value === null) {
    errors.push({ code: \"object\", args: { name: name }, depth: 1 });
  } else {
    r0 = Object.keys(value);
    r1 = [];
    i0 = r0.indexOf(\"one\");
    if (i0 !== -1) {
      r0.splice(i0, 1);
      s0 = name + \".one\";
      r2 = value[\"one\"];
      if (typeof r2 !== \"string\") {
        errors.push({ code: \"string\", args: { name: s0 }, depth: 2 });
      }
    } else {
      r1.push(\"one\")
    }
    i0 = r0.indexOf(\"two\");
    if (i0 !== -1) {
      r0.splice(i0, 1);
      s0 = name + \".two\";
      r2 = value[\"two\"];
      if (r2 !== undefined) {
        if (typeof r2 !== \"string\") {
          errors.push({ code: \"string\", args: { name: s0 }, depth: 2 });
        }
      }
    }
    if (r1.length > 0) {
      errors.push({ code: \"objectRequiredKeys\", args: { name: name, keys: r1 }, depth: 1 });
    }
    if (r0.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: r0 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.record() should have no validation for properties #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"object\" || value === null) {
    errors.push({ code: \"object\", args: { name: name }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.record(schemas.string()) should have validation for elements #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [], i0 = 0, s0 = \"\", r0 = null, r1 = null;
  if (typeof value !== \"object\" || value === null) {
    errors.push({ code: \"object\", args: { name: name }, depth: 1 });
  } else {
    r0 = Object.keys(value)
    for (i0 = 0; i0 < r0.length; ++i0) {
      s0 = r0[i0];
      r1 = value[s0];
      s0 = name + \".\" + s0;
      if (typeof r1 !== \"string\") {
        errors.push({ code: \"string\", args: { name: s0 }, depth: 2 });
      }
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.string() should have validation #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"string\") {
    errors.push({ code: \"string\", args: { name: name }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.string({ maxLength: 2 }) should have validation #[0]"] = String.raw`
"function validate(a0, name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"string\") {
    errors.push({ code: \"string\", args: { name: name }, depth: 1 });
  } else {
    if (a0(value, 3) > 2) {
      errors.push({ code: \"stringMaxLength\", args: { name: name, maxLength: 2 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.string({ maxLength: 2, minLength: 1 }) should have validation #[0]"] = String.raw`
"function validate(a0, name, value) {
  \"use strict\";
  var errors = [], i0 = 0;
  if (typeof value !== \"string\") {
    errors.push({ code: \"string\", args: { name: name }, depth: 1 });
  } else {
    i0 = a0(value, 3);
    if (i0 > 2) {
      errors.push({ code: \"stringMaxLength\", args: { name: name, maxLength: 2 }, depth: 1 });
    }
    if (i0 < 1) {
      errors.push({ code: \"stringMinLength\", args: { name: name, minLength: 1 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.string({ minLength: 2 }) should have validation #[0]"] = String.raw`
"function validate(a0, name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"string\") {
    errors.push({ code: \"string\", args: { name: name }, depth: 1 });
  } else {
    if (a0(value, 2) < 2) {
      errors.push({ code: \"stringMinLength\", args: { name: name, minLength: 2 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.string({ pattern: /^\\d+$/ }) should have validation #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"string\") {
    errors.push({ code: \"string\", args: { name: name }, depth: 1 });
  } else {
    if (!/^\\d+$/.test(value)) {
      errors.push({ code: \"stringPattern\", args: { name: name, pattern: /^\\d+$/ }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.symbol() should have validation #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (typeof value !== \"symbol\") {
    errors.push({ code: \"symbol\", args: { name: name }, depth: 1 });
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.tuple() should have no validation for elements #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (!Array.isArray(value)) {
    errors.push({ code: \"tuple\", args: { name: name }, depth: 1 });
  } else {
    if (value.length !== 0) {
      errors.push({ code: \"tupleLength\", args: { name: name, length: 0 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.tuple(schemas.any()) should have no validation for elements #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [];
  if (!Array.isArray(value)) {
    errors.push({ code: \"tuple\", args: { name: name }, depth: 1 });
  } else {
    if (value.length !== 1) {
      errors.push({ code: \"tupleLength\", args: { name: name, length: 1 }, depth: 1 });
    }
  }
  return errors;
}"
`.slice(1, -1)
exports["schemas.tuple(schemas.string(), schemas.string()) should have validation #[0]"] = String.raw`
"function validate(name, value) {
  \"use strict\";
  var errors = [], s0 = \"\", r0 = null;
  if (!Array.isArray(value)) {
    errors.push({ code: \"tuple\", args: { name: name }, depth: 1 });
  } else {
    if (value.length !== 2) {
      errors.push({ code: \"tupleLength\", args: { name: name, length: 2 }, depth: 1 });
    }
    s0 = name + \"[0]\";
    r0 = value[0];
    if (typeof r0 !== \"string\") {
      errors.push({ code: \"string\", args: { name: s0 }, depth: 2 });
    }
    s0 = name + \"[1]\";
    r0 = value[1];
    if (typeof r0 !== \"string\") {
      errors.push({ code: \"string\", args: { name: s0 }, depth: 2 });
    }
  }
  return errors;
}"
`.slice(1, -1)