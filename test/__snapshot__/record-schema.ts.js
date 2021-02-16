exports["schemas.record() should fail on null "] = String.raw`
[Error: "value" must be an object.]
`.slice(1, -1)

exports["schemas.record() should fail on string "] = String.raw`
[Error: "value" must be an object.]
`.slice(1, -1)

exports["schemas.record() should have no validation for properties "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.record(schemas.string()) should fail on array that includes null "] = String.raw`
[Error: "value.1" must be a string.]
`.slice(1, -1)

exports["schemas.record(schemas.string()) should fail on null "] = String.raw`
[Error: "value" must be an object.]
`.slice(1, -1)

exports["schemas.record(schemas.string()) should fail on object that has null property "] = String.raw`
[Error: "value.foo" must be a string.]
`.slice(1, -1)

exports["schemas.record(schemas.string()) should have validation for elements "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  function _1(a, b, c, d) {
    var e = null, f = \"\", g = 0;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    } else {
      e = Object.keys(b).sort(undefined);
      for (; g < e.length; ++g) {
        f = e[g]
        _0(a + \".\" + f, b[f], c + 1, d);
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)