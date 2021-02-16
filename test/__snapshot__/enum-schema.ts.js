exports["schemas.enum(1n, true, 0, null, \"foo\", undefined) should have validation; it uses symbol equality comparison "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (b !== 1n && b !== true && b !== 0 && b !== null && b !== \"foo\" && b !== undefined) {
      d.push({ code: \"enum\", args: { name: a, values: [1n, true, 0, null, \"foo\", undefined] }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.enum(Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY) should fail on 0 "] = String.raw`
[Error: "value" must be any of NaN, Infinity, and -Infinity.]
`.slice(1, -1)

exports["schemas.enum(Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY) should have validation; it can handle NaN correctly "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Number.isNaN(b) && b !== Number.POSITIVE_INFINITY && b !== Number.NEGATIVE_INFINITY) {
      d.push({ code: \"enum\", args: { name: a, values: [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY] }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.enum(Symbol.iterator) should fail on 0 "] = String.raw`
[Error: "value" must be Symbol(Symbol.iterator).]
`.slice(1, -1)

exports["schemas.enum(Symbol.iterator) should fail on another symbol "] = String.raw`
[Error: "value" must be Symbol(Symbol.iterator).]
`.slice(1, -1)

exports["schemas.enum(Symbol.iterator) should fail on undefined "] = String.raw`
[Error: "value" must be Symbol(Symbol.iterator).]
`.slice(1, -1)

exports["schemas.enum(Symbol.iterator) should have validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  var _0 = $schema.values[0];
  function _1(a, b, c, d) {
    if (b !== _0) {
      d.push({ code: \"enum\", args: { name: a, values: [_0] }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.enum(myObj, Number.NaN) should fail on 0 "] = String.raw`
[Error: "value" must be [object Object] or NaN.]
`.slice(1, -1)

exports["schemas.enum(myObj, Number.NaN) should fail on {} "] = String.raw`
[Error: "value" must be [object Object] or NaN.]
`.slice(1, -1)

exports["schemas.enum(myObj, Number.NaN) should have validation; it can handle NaN correctly, along with reference values. "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  var _0 = $schema.values[0];
  function _1(a, b, c, d) {
    if (b !== _0 && !Number.isNaN(b)) {
      d.push({ code: \"enum\", args: { name: a, values: [_0, Number.NaN] }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.enum(myObj, mySymbol, myFunc) should fail on another symbol "] = String.raw`
[Error: "value" must be any of [object Object], Symbol(mySymbol), and [function myFunc].]
`.slice(1, -1)

exports["schemas.enum(myObj, mySymbol, myFunc) should fail on {} "] = String.raw`
[Error: "value" must be any of [object Object], Symbol(mySymbol), and [function myFunc].]
`.slice(1, -1)

exports["schemas.enum(myObj, mySymbol, myFunc) should have validation; give 'values' as an argument because it contains references. "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  var _0 = $schema.values[0];
  var _1 = $schema.values[1];
  var _2 = $schema.values[2];
  function _3(a, b, c, d) {
    if (b !== _0 && b !== _1 && b !== _2) {
      d.push({ code: \"enum\", args: { name: a, values: [_0, _1, _2] }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _3(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.enum(null) should fail on 0 "] = String.raw`
[Error: "value" must be null.]
`.slice(1, -1)

exports["schemas.enum(null) should fail on undefined "] = String.raw`
[Error: "value" must be null.]
`.slice(1, -1)

exports["schemas.enum(null) should have validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (b !== null) {
      d.push({ code: \"enum\", args: { name: a, values: [null] }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["{ type: \"enum\", values: [] } should fail on compile "] = String.raw`
[Error: EnumSchema must have 1 or more values.]
`.slice(1, -1)