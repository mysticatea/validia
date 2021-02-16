exports["schemas.tuple() should fail on [0] "] = String.raw`
[Error: "value" must contain exactly 0 items.]
`.slice(1, -1)

exports["schemas.tuple() should fail on null "] = String.raw`
[Error: "value" must be a tuple.]
`.slice(1, -1)

exports["schemas.tuple() should fail on { length: 0 } "] = String.raw`
[Error: "value" must be a tuple.]
`.slice(1, -1)

exports["schemas.tuple() should have no validation for elements "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Array.isArray(b)) {
      d.push({ code: \"tuple\", args: { name: a }, depth: c });
    } else {
      if (b.length !== 0) {
        d.push({ code: \"tupleLength\", args: { name: a, length: 0 }, depth: c });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.tuple(schemas.any()) should fail on [] "] = String.raw`
[Error: "value" must contain exactly 1 item.]
`.slice(1, -1)

exports["schemas.tuple(schemas.any()) should fail on null "] = String.raw`
[Error: "value" must be a tuple.]
`.slice(1, -1)

exports["schemas.tuple(schemas.any()) should fail on { length: 1 } "] = String.raw`
[Error: "value" must be a tuple.]
`.slice(1, -1)

exports["schemas.tuple(schemas.any()) should have no validation for elements "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Array.isArray(b)) {
      d.push({ code: \"tuple\", args: { name: a }, depth: c });
    } else {
      if (b.length !== 1) {
        d.push({ code: \"tupleLength\", args: { name: a, length: 1 }, depth: c });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.tuple(schemas.string(), schemas.string()) should fail on [1, 2] "] = String.raw`
[Error: "value" has 2 validation errors:
- "value[0]" must be a string.
- "value[1]" must be a string.]
`.slice(1, -1)

exports["schemas.tuple(schemas.string(), schemas.string()) should fail on [\"a\", null] "] = String.raw`
[Error: "value[1]" must be a string.]
`.slice(1, -1)

exports["schemas.tuple(schemas.string(), schemas.string()) should fail on [] "] = String.raw`
[Error: "value" has 3 validation errors:
- "value" must contain exactly 2 items.
- "value[0]" must be a string.
- "value[1]" must be a string.]
`.slice(1, -1)

exports["schemas.tuple(schemas.string(), schemas.string()) should have validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  function _1(a, b, c, d) {
    if (!Array.isArray(b)) {
      d.push({ code: \"tuple\", args: { name: a }, depth: c });
    } else {
      if (b.length !== 2) {
        d.push({ code: \"tupleLength\", args: { name: a, length: 2 }, depth: c });
      }
      _0(a + \"[0]\", b[0], c + 1, d);
      _0(a + \"[1]\", b[1], c + 1, d);
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)