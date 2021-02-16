exports["schemas.array() should fail on null "] = String.raw`
[Error: "value" must be an array.]
`.slice(1, -1)

exports["schemas.array() should fail on object "] = String.raw`
[Error: "value" must be an array.]
`.slice(1, -1)

exports["schemas.array() should have no validation for elements "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.array(schemas.any(), { maxLength: 1, minLength: 2 }) should throw a fatal error on compile "] = String.raw`
[Error: "maxLength" must be "minLength" or greater than it.]
`.slice(1, -1)

exports["schemas.array(schemas.any(), { maxLength: 2 }) should fail on array that includes three strings "] = String.raw`
[Error: "value" must contain less than or equal to 2 items.]
`.slice(1, -1)

exports["schemas.array(schemas.any(), { maxLength: 2 }) should fail on null "] = String.raw`
[Error: "value" must be an array.]
`.slice(1, -1)

exports["schemas.array(schemas.any(), { maxLength: 2 }) should have validation for maxLength "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    var e = 0;
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
    } else {
      e = b.length;
      if (e > 2) {
        d.push({ code: \"arrayMaxLength\", args: { name: a, maxLength: 2 }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.array(schemas.any(), { minLength: 2 }) should fail on empty array "] = String.raw`
[Error: "value" must contain more than or equal to 2 items.]
`.slice(1, -1)

exports["schemas.array(schemas.any(), { minLength: 2 }) should fail on null "] = String.raw`
[Error: "value" must be an array.]
`.slice(1, -1)

exports["schemas.array(schemas.any(), { minLength: 2 }) should have validation for minLength "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    var e = 0;
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
    } else {
      e = b.length;
      if (e < 2) {
        d.push({ code: \"arrayMinLength\", args: { name: a, minLength: 2 }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.array(schemas.any(), { unique: true }) should fail on array that includes two same strings "] = String.raw`
[Error: "value" must not contain duplicate values.]
`.slice(1, -1)

exports["schemas.array(schemas.any(), { unique: true }) should fail on null "] = String.raw`
[Error: "value" must be an array.]
`.slice(1, -1)

exports["schemas.array(schemas.any(), { unique: true }) should have validation for unique "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b) {
    var c = 0, d = 0, e = null;
    for (; c < b; ++c) {
      e = a[c];
      for (d = 0; d < c; ++d) {
        if (e === a[d]) {
          return false;
        }
      }
    }
    return true;
  }
  function _1(a, b, c, d) {
    var e = 0;
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
    } else {
      e = b.length;
      if (!_0(b, e)) {
        d.push({ code: \"arrayUnique\", args: { name: a }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.array(schemas.any(), { unique: true }) should report once even if array included many same strings "] = String.raw`
[Error: "value" must not contain duplicate values.]
`.slice(1, -1)

exports["schemas.array(schemas.string()) should fail on array that includes null "] = String.raw`
[Error: "value[1]" must be a string.]
`.slice(1, -1)

exports["schemas.array(schemas.string()) should fail on null "] = String.raw`
[Error: "value" must be an array.]
`.slice(1, -1)

exports["schemas.array(schemas.string()) should have validation for elements "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  function _1(a, b, c, d) {
    var e = 0, f = 0;
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
    } else {
      e = b.length;
      for (f = 0; f < e; ++f) {
        _0(a + \"[\" + f + \"]\", b[f], c + 1, d);
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.array(schemas.string(), { maxLength: 2, minLength: 1, unique: true }) should fail on array that has many errors "] = String.raw`
[Error: "value" has 3 validation errors:
- "value" must contain less than or equal to 2 items.
- "value" must not contain duplicate values.
- "value[0]" must be a string.]
`.slice(1, -1)

exports["schemas.array(schemas.string(), { maxLength: 2, minLength: 1, unique: true }) should fail on array that includes two numbers "] = String.raw`
[Error: "value[1]" must be a string.]
`.slice(1, -1)

exports["schemas.array(schemas.string(), { maxLength: 2, minLength: 1, unique: true }) should fail on array that includes two same string "] = String.raw`
[Error: "value" must not contain duplicate values.]
`.slice(1, -1)

exports["schemas.array(schemas.string(), { maxLength: 2, minLength: 1, unique: true }) should fail on empty array "] = String.raw`
[Error: "value" must not be empty.]
`.slice(1, -1)

exports["schemas.array(schemas.string(), { maxLength: 2, minLength: 1, unique: true }) should fail on null "] = String.raw`
[Error: "value" must be an array.]
`.slice(1, -1)

exports["schemas.array(schemas.string(), { maxLength: 2, minLength: 1, unique: true }) should have validation for all options "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b) {
    var c = 0, d = 0, e = null;
    for (; c < b; ++c) {
      e = a[c];
      for (d = 0; d < c; ++d) {
        if (e === a[d]) {
          return false;
        }
      }
    }
    return true;
  }
  function _1(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  function _2(a, b, c, d) {
    var e = 0, f = 0;
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
    } else {
      e = b.length;
      if (e > 2) {
        d.push({ code: \"arrayMaxLength\", args: { name: a, maxLength: 2 }, depth: c + 1 });
      } else if (e < 1) {
        d.push({ code: \"arrayMinLength\", args: { name: a, minLength: 1 }, depth: c + 1 });
      }
      if (!_0(b, e)) {
        d.push({ code: \"arrayUnique\", args: { name: a }, depth: c + 1 });
      }
      for (f = 0; f < e; ++f) {
        _1(a + \"[\" + f + \"]\", b[f], c + 1, d);
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _2(name, value, 0, []);
  };
})({});"
`.slice(1, -1)