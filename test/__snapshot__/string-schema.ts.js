exports["schemas.string() should fail on null "] = String.raw`
[Error: "value" must be a string.]
`.slice(1, -1)

exports["schemas.string() should fail on number "] = String.raw`
[Error: "value" must be a string.]
`.slice(1, -1)

exports["schemas.string() should have validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.string({ maxLength: 1, minLength: 2 }) should throw a fatal error on compile "] = String.raw`
[Error: "maxLength" must be "minLength" or greater than it.]
`.slice(1, -1)

exports["schemas.string({ maxLength: 2 }) should fail on \"foo\" "] = String.raw`
[Error: "value" must be less than or equal to 2 characters.]
`.slice(1, -1)

exports["schemas.string({ maxLength: 2 }) should fail on \"👍👍1\" "] = String.raw`
[Error: "value" must be less than or equal to 2 characters.]
`.slice(1, -1)

exports["schemas.string({ maxLength: 2 }) should have validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b) {
    var c = 0, d = 0, e = 0, f = a.length;
    while (e < f) {
      c += 1;
      if (c >= b) {
        return c;
      }
      e += (d = a.charCodeAt(e)) >= 0xd800 && d <= 0xdbff ? 2 : 1;
    }
    return c
  }
  function _1(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    } else {
      if (_0(b, 3) > 2) {
        d.push({ code: \"stringMaxLength\", args: { name: a, maxLength: 2 }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.string({ maxLength: 2, minLength: 1 }) should fail on \"\" "] = String.raw`
[Error: "value" must not be empty.]
`.slice(1, -1)

exports["schemas.string({ maxLength: 2, minLength: 1 }) should fail on \"foo\" "] = String.raw`
[Error: "value" must be less than or equal to 2 characters.]
`.slice(1, -1)

exports["schemas.string({ maxLength: 2, minLength: 1 }) should fail on \"👍👍👍\" "] = String.raw`
[Error: "value" must be less than or equal to 2 characters.]
`.slice(1, -1)

exports["schemas.string({ maxLength: 2, minLength: 1 }) should have validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b) {
    var c = 0, d = 0, e = 0, f = a.length;
    while (e < f) {
      c += 1;
      if (c >= b) {
        return c;
      }
      e += (d = a.charCodeAt(e)) >= 0xd800 && d <= 0xdbff ? 2 : 1;
    }
    return c
  }
  function _1(a, b, c, d) {
    var e = 0;
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    } else {
      e = _0(b, 3);
      if (e > 2) {
        d.push({ code: \"stringMaxLength\", args: { name: a, maxLength: 2 }, depth: c + 1 });
      } else if (e < 1) {
        d.push({ code: \"stringMinLength\", args: { name: a, minLength: 1 }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.string({ minLength: 2 }) should fail on \"f\" "] = String.raw`
[Error: "value" must be more than or equal to 2 characters.]
`.slice(1, -1)

exports["schemas.string({ minLength: 2 }) should fail on \"👍\" "] = String.raw`
[Error: "value" must be more than or equal to 2 characters.]
`.slice(1, -1)

exports["schemas.string({ minLength: 2 }) should have validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b) {
    var c = 0, d = 0, e = 0, f = a.length;
    while (e < f) {
      c += 1;
      if (c >= b) {
        return c;
      }
      e += (d = a.charCodeAt(e)) >= 0xd800 && d <= 0xdbff ? 2 : 1;
    }
    return c
  }
  function _1(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    } else {
      if (_0(b, 2) < 2) {
        d.push({ code: \"stringMinLength\", args: { name: a, minLength: 2 }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.string({ pattern: /^\\d+$/ }) should fail on \"\" "] = String.raw`
[Error: "value" must match the pattern /^\d+$/.]
`.slice(1, -1)

exports["schemas.string({ pattern: /^\\d+$/ }) should fail on \"foo\" "] = String.raw`
[Error: "value" must match the pattern /^\d+$/.]
`.slice(1, -1)

exports["schemas.string({ pattern: /^\\d+$/ }) should have validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    } else {
      if (!/^\\d+$/.test(b)) {
        d.push({ code: \"stringPattern\", args: { name: a, pattern: /^\\d+$/ }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)