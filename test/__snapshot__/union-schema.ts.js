exports["schemas.anyOf(/* all kinds of schema except any */) should print the name of schemas if failed "] = String.raw`
[Error: "value" must be any of an array, a bigint value, a boolean value, a RegExp instance, xxxx-check, 1n, [function myFunc], [function (anonymous)], 2, "foo", a function, a number, an object, a string, a symbol, and a tuple.]
`.slice(1, -1)

exports["schemas.anyOf(/* includes the same schema */) should check once for the same schema "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
    }
    return d;
  }
  var _1 = $schema.schemas[0].schemas[0];
  function _2(a, b, c, d) {
    if (typeof b !== \"bigint\") {
      d.push({ code: \"bigint\", args: { name: a }, depth: c });
    }
    return d;
  }
  var _3 = $schema.schemas[0].schemas[1];
  function _4(a, b, c, d) {
    if (typeof b !== \"boolean\") {
      d.push({ code: \"boolean\", args: { name: a }, depth: c });
    }
    return d;
  }
  var _5 = $schema.schemas[0].schemas[2];
  function _6(a, b, c, d) {
    if (!Number.isFinite(b)) {
      if (b === Number.POSITIVE_INFINITY || b === Number.NEGATIVE_INFINITY) {
        d.push({ code: \"numberDisallowInfinity\", args: { name: a }, depth: c });
      } else if (Number.isNaN(b)) {
        d.push({ code: \"numberDisallowNaN\", args: { name: a }, depth: c });
      } else {
        d.push({ code: \"number\", args: { name: a }, depth: c });
      }
    }
    return d;
  }
  var _7 = $schema.schemas[1].schemas[1];
  function _8(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  var _9 = $schema.schemas[1].schemas[2];
  function _a(a, b) {
    return a <= b.depth ? a : b.depth;
  }
  function _b(a, b, c, d, e, f) {
    var g = null, h = null, i = -1, j = 0, k = 0;
    for (; k < f.length; ++k) {
      h = f[k](a, b, c, []);
      if (h.length === 0) {
        return d;
      }
      j = h.reduce(_a, 1073741823)
      if (j > i) {
        g = h;
        i = j;
      } else if (j === i) {
        g = null;
      }
    }
    if (g !== null) {
      for (k = 0; k < g.length; ++k) {
        d.push(g[k]);
      }
    } else {
      d.push({ code: \"union\", args: { name: a, schemas: e }, depth: c });
    }
    return d;
  }
  function _c(a, b, c, d) {
    return _b(a, b, c, d, [_1, _3, _5, _7, _9], [_0, _2, _4, _6, _8]);
  }
  return function validate(name, value) {
    return _c(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.anyOf(schemas.number(), schemas.enum(\"auto\", \"none\")) should fail on \"foo\" "] = String.raw`
[Error: "value" must be any of a number, "auto", and "none".]
`.slice(1, -1)

exports["schemas.anyOf(schemas.number(), schemas.enum(\"auto\", \"none\")) should fail on null "] = String.raw`
[Error: "value" must be any of a number, "auto", and "none".]
`.slice(1, -1)

exports["schemas.anyOf(schemas.number(), schemas.enum(\"auto\", \"none\")) should have validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Number.isFinite(b)) {
      if (b === Number.POSITIVE_INFINITY || b === Number.NEGATIVE_INFINITY) {
        d.push({ code: \"numberDisallowInfinity\", args: { name: a }, depth: c });
      } else if (Number.isNaN(b)) {
        d.push({ code: \"numberDisallowNaN\", args: { name: a }, depth: c });
      } else {
        d.push({ code: \"number\", args: { name: a }, depth: c });
      }
    }
    return d;
  }
  var _1 = $schema.schemas[0];
  function _2(a, b, c, d) {
    if (b !== \"auto\" && b !== \"none\") {
      d.push({ code: \"enum\", args: { name: a, values: [\"auto\", \"none\"] }, depth: c });
    }
    return d;
  }
  var _3 = $schema.schemas[1];
  function _4(a, b) {
    return a <= b.depth ? a : b.depth;
  }
  function _5(a, b, c, d, e, f) {
    var g = null, h = null, i = -1, j = 0, k = 0;
    for (; k < f.length; ++k) {
      h = f[k](a, b, c, []);
      if (h.length === 0) {
        return d;
      }
      j = h.reduce(_4, 1073741823)
      if (j > i) {
        g = h;
        i = j;
      } else if (j === i) {
        g = null;
      }
    }
    if (g !== null) {
      for (k = 0; k < g.length; ++k) {
        d.push(g[k]);
      }
    } else {
      d.push({ code: \"union\", args: { name: a, schemas: e }, depth: c });
    }
    return d;
  }
  function _6(a, b, c, d) {
    return _5(a, b, c, d, [_1, _3], [_0, _2]);
  }
  return function validate(name, value) {
    return _6(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.anyOf(schemas.number(), schemas.string()) should fail on boolean "] = String.raw`
[Error: "value" must be a number or a string.]
`.slice(1, -1)

exports["schemas.anyOf(schemas.number(), schemas.string()) should fail on null "] = String.raw`
[Error: "value" must be a number or a string.]
`.slice(1, -1)

exports["schemas.anyOf(schemas.number(), schemas.string()) should fail on object "] = String.raw`
[Error: "value" must be a number or a string.]
`.slice(1, -1)

exports["schemas.anyOf(schemas.number(), schemas.string()) should have validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Number.isFinite(b)) {
      if (b === Number.POSITIVE_INFINITY || b === Number.NEGATIVE_INFINITY) {
        d.push({ code: \"numberDisallowInfinity\", args: { name: a }, depth: c });
      } else if (Number.isNaN(b)) {
        d.push({ code: \"numberDisallowNaN\", args: { name: a }, depth: c });
      } else {
        d.push({ code: \"number\", args: { name: a }, depth: c });
      }
    }
    return d;
  }
  var _1 = $schema.schemas[0];
  function _2(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  var _3 = $schema.schemas[1];
  function _4(a, b) {
    return a <= b.depth ? a : b.depth;
  }
  function _5(a, b, c, d, e, f) {
    var g = null, h = null, i = -1, j = 0, k = 0;
    for (; k < f.length; ++k) {
      h = f[k](a, b, c, []);
      if (h.length === 0) {
        return d;
      }
      j = h.reduce(_4, 1073741823)
      if (j > i) {
        g = h;
        i = j;
      } else if (j === i) {
        g = null;
      }
    }
    if (g !== null) {
      for (k = 0; k < g.length; ++k) {
        d.push(g[k]);
      }
    } else {
      d.push({ code: \"union\", args: { name: a, schemas: e }, depth: c });
    }
    return d;
  }
  function _6(a, b, c, d) {
    return _5(a, b, c, d, [_1, _3], [_0, _2]);
  }
  return function validate(name, value) {
    return _6(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.anyOf(schemas.number(), schemas.string(), schemas.object({ value: schemas.number() })) should fail on null "] = String.raw`
[Error: "value" must be any of a number, a string, and an object.]
`.slice(1, -1)

exports["schemas.anyOf(schemas.number(), schemas.string(), schemas.object({ value: schemas.number() })) should fail on { valu: \"foo\" }, with the error message of the nearest choice "] = String.raw`
[Error: "value" has 2 validation errors:
- "value" must have the required property: value.
- "value" must not have unknown property: vale.]
`.slice(1, -1)

exports["schemas.anyOf(schemas.number(), schemas.string(), schemas.object({ value: schemas.number() })) should fail on { value: \"foo\" }, with the error message of the nearest choice "] = String.raw`
[Error: "value.value" must be a number.]
`.slice(1, -1)

exports["schemas.anyOf(schemas.number(), schemas.string(), schemas.object({ value: schemas.number() })) should have validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Number.isFinite(b)) {
      if (b === Number.POSITIVE_INFINITY || b === Number.NEGATIVE_INFINITY) {
        d.push({ code: \"numberDisallowInfinity\", args: { name: a }, depth: c });
      } else if (Number.isNaN(b)) {
        d.push({ code: \"numberDisallowNaN\", args: { name: a }, depth: c });
      } else {
        d.push({ code: \"number\", args: { name: a }, depth: c });
      }
    }
    return d;
  }
  var _1 = $schema.schemas[0];
  function _2(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  var _3 = $schema.schemas[1];
  function _4(a) {
    var b = new Set(), c = \"\";
    for (c in a) b.add(c);
    return b;
  }
  function _5(a) {
    var b = [];
    a.forEach(function(x) { b.push(x) });
    return b.sort(undefined);
  }
  function _6(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    } else {
      e = _4(b);
      f = [];
      if (e.delete(\"value\")) {
        _0(a + \".value\", b[\"value\"], c + 1, d);
      } else {
        f.push(\"value\");
      }
      if (f.length > 0) {
        d.push({ code: \"objectRequiredKeys\", args: { name: a, keys: f }, depth: c + 1 });
      }
      if (e.size > 0) {
        d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _5(e) }, depth: c + 1 });
      }
    }
    return d;
  }
  var _7 = $schema.schemas[2];
  function _8(a, b) {
    return a <= b.depth ? a : b.depth;
  }
  function _9(a, b, c, d, e, f) {
    var g = null, h = null, i = -1, j = 0, k = 0;
    for (; k < f.length; ++k) {
      h = f[k](a, b, c, []);
      if (h.length === 0) {
        return d;
      }
      j = h.reduce(_8, 1073741823)
      if (j > i) {
        g = h;
        i = j;
      } else if (j === i) {
        g = null;
      }
    }
    if (g !== null) {
      for (k = 0; k < g.length; ++k) {
        d.push(g[k]);
      }
    } else {
      d.push({ code: \"union\", args: { name: a, schemas: e }, depth: c });
    }
    return d;
  }
  function _a(a, b, c, d) {
    return _9(a, b, c, d, [_1, _3, _7], [_0, _2, _6]);
  }
  return function validate(name, value) {
    return _a(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["{ type: \"union\", schemas: [] } should throw a fatail error on compile "] = String.raw`
[Error: UnionSchema must have 1 or more schemas.]
`.slice(1, -1)