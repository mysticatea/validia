exports["schemas.bigInt() should fail on null "] = String.raw`
[Error: "value" must be a bigint value.]
`.slice(1, -1)

exports["schemas.bigInt() should fail on number "] = String.raw`
[Error: "value" must be a bigint value.]
`.slice(1, -1)

exports["schemas.bigInt() should fail on string "] = String.raw`
[Error: "value" must be a bigint value.]
`.slice(1, -1)

exports["schemas.bigInt() should have no validation for min/max "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"bigint\") {
      d.push({ code: \"bigint\", args: { name: a }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.bigInt({ maxValue: 0n, minValue: 1n }) should throw a fatal error on compile "] = String.raw`
[Error: "maxValue" must be "minValue" or greater than it.]
`.slice(1, -1)

exports["schemas.bigInt({ maxValue: 1n }) should fail on 2n "] = String.raw`
[Error: "value" must be less than or equal to 1n.]
`.slice(1, -1)

exports["schemas.bigInt({ maxValue: 1n }) should have validation for maxValue "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"bigint\") {
      d.push({ code: \"bigint\", args: { name: a }, depth: c });
    } else {
      if (b > 1n) {
        d.push({ code: \"bigintMaxValue\", args: { name: a, maxValue: 1n }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.bigInt({ maxValue: 1n, minValue: 0n }) should fail on -1n "] = String.raw`
[Error: "value" must be greater than or equal to 0n.]
`.slice(1, -1)

exports["schemas.bigInt({ maxValue: 1n, minValue: 0n }) should fail on 2n "] = String.raw`
[Error: "value" must be less than or equal to 1n.]
`.slice(1, -1)

exports["schemas.bigInt({ maxValue: 1n, minValue: 0n }) should have validation for min/max "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"bigint\") {
      d.push({ code: \"bigint\", args: { name: a }, depth: c });
    } else {
      if (b > 1n) {
        d.push({ code: \"bigintMaxValue\", args: { name: a, maxValue: 1n }, depth: c + 1 });
      } else if (b < 0n) {
        d.push({ code: \"bigintMinValue\", args: { name: a, minValue: 0n }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.bigInt({ minValue: 1n }) should fail on 0n "] = String.raw`
[Error: "value" must be greater than or equal to 1n.]
`.slice(1, -1)

exports["schemas.bigInt({ minValue: 1n }) should have validation for minValue "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"bigint\") {
      d.push({ code: \"bigint\", args: { name: a }, depth: c });
    } else {
      if (b < 1n) {
        d.push({ code: \"bigintMinValue\", args: { name: a, minValue: 1n }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.bigInt64 should fail on -9223372036854775809n "] = String.raw`
[Error: "value" must be greater than or equal to -9223372036854775808n.]
`.slice(1, -1)

exports["schemas.bigInt64 should fail on 9223372036854775808n "] = String.raw`
[Error: "value" must be less than or equal to 9223372036854775807n.]
`.slice(1, -1)

exports["schemas.bigUint64 should fail on -1n "] = String.raw`
[Error: "value" must be greater than or equal to 0n.]
`.slice(1, -1)

exports["schemas.bigUint64 should fail on 18446744073709551616n "] = String.raw`
[Error: "value" must be less than or equal to 18446744073709551615n.]
`.slice(1, -1)