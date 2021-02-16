exports["schemas.object() should fail on null "] = String.raw`
[Error: "value" must be an object.]
`.slice(1, -1)

exports["schemas.object() should fail on string "] = String.raw`
[Error: "value" must be an object.]
`.slice(1, -1)

exports["schemas.object() should have no validation for properties "] = String.raw`
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

exports["schemas.object({ one: schemas.any(), two: schemas.any() }) should fail on object that has different properties "] = String.raw`
[Error: "value" must not have unknown property: three.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.any(), two: schemas.any() }) should fail on object that has extra properties "] = String.raw`
[Error: "value" must not have unknown properties: four,three.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.any(), two: schemas.any() }) should have validation, but not have validations for property values "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a) {
    var b = new Set(), c = \"\";
    for (c in a) b.add(c);
    return b;
  }
  function _1(a) {
    var b = [];
    a.forEach(function(x) { b.push(x) });
    return b.sort(undefined);
  }
  function _2(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    } else {
      e = _0(b);
      e.delete(\"one\");
      e.delete(\"two\");
      if (e.size > 0) {
        d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _1(e) }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _2(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.object({ one: schemas.any(), two: schemas.any() }, { required: true }) should fail on object that has different properties "] = String.raw`
[Error: "value" has 2 validation errors:
- "value" must have the required property: two.
- "value" must not have unknown property: three.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.any(), two: schemas.any() }, { required: true }) should fail on object that has extra properties "] = String.raw`
[Error: "value" must not have unknown properties: four,three.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.any(), two: schemas.any() }, { required: true }) should fail on {} "] = String.raw`
[Error: "value" must have the required properties: one,two.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.any(), two: schemas.any() }, { required: true }) should have validation, but not have validations for property values "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a) {
    var b = new Set(), c = \"\";
    for (c in a) b.add(c);
    return b;
  }
  function _1(a) {
    var b = [];
    a.forEach(function(x) { b.push(x) });
    return b.sort(undefined);
  }
  function _2(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    } else {
      e = _0(b);
      f = [];
      if (!e.delete(\"one\")) {
        f.push(\"one\");
      }
      if (!e.delete(\"two\")) {
        f.push(\"two\");
      }
      if (f.length > 0) {
        d.push({ code: \"objectRequiredKeys\", args: { name: a, keys: f }, depth: c + 1 });
      }
      if (e.size > 0) {
        d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _1(e) }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _2(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.object({ one: schemas.any(), two: schemas.string() }, { allowUnknown: true }) should fail on { two: 2 } "] = String.raw`
[Error: "value.two" must be a string.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.any(), two: schemas.string() }, { allowUnknown: true }) should have validation, but not have validations for extra properties "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a) {
    var b = new Set(), c = \"\";
    for (c in a) b.add(c);
    return b;
  }
  function _1(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  function _2(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    } else {
      e = _0(b);
      if (e.delete(\"two\") && (f = b[\"two\"]) !== undefined) {
        _1(a + \".two\", f, c + 1, d);
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _2(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.object({ one: schemas.string() }, { required: [\"two\"] }) should throw a fatal error on compile "] = String.raw`
[Error: "two" was in "$schema.required", so it must exist in "$schema.properties".]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }) should fail on object that has different properties "] = String.raw`
[Error: "value" must not have unknown property: three.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }) should fail on object that has extra properties "] = String.raw`
[Error: "value" must not have unknown properties: four,three.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }) should fail on { one: 1, two: \"two\" } "] = String.raw`
[Error: "value.one" must be a string.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }) should fail on { two: 2 } "] = String.raw`
[Error: "value.two" must be a string.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }) should have validation for property values "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a) {
    var b = new Set(), c = \"\";
    for (c in a) b.add(c);
    return b;
  }
  function _1(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  function _2(a) {
    var b = [];
    a.forEach(function(x) { b.push(x) });
    return b.sort(undefined);
  }
  function _3(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    } else {
      e = _0(b);
      if (e.delete(\"one\") && (f = b[\"one\"]) !== undefined) {
        _1(a + \".one\", f, c + 1, d);
      }
      if (e.delete(\"two\") && (f = b[\"two\"]) !== undefined) {
        _1(a + \".two\", f, c + 1, d);
      }
      if (e.size > 0) {
        d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _2(e) }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _3(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { allowUnknown: true, required: [\"one\"] }) should fail on { two: \"two\" } "] = String.raw`
[Error: "value" must have the required property: one.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { allowUnknown: true, required: [\"one\"] }) should fail on { two: \"two\", three: 3 } "] = String.raw`
[Error: "value" must have the required property: one.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { allowUnknown: true, required: [\"one\"] }) should have validation, but not have validations for extra properties "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a) {
    var b = new Set(), c = \"\";
    for (c in a) b.add(c);
    return b;
  }
  function _1(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  function _2(a, b, c, d) {
    var e = null, f = null, g = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    } else {
      e = _0(b);
      f = [];
      if (e.delete(\"one\")) {
        _1(a + \".one\", b[\"one\"], c + 1, d);
      } else {
        f.push(\"one\");
      }
      if (e.delete(\"two\") && (g = b[\"two\"]) !== undefined) {
        _1(a + \".two\", g, c + 1, d);
      }
      if (f.length > 0) {
        d.push({ code: \"objectRequiredKeys\", args: { name: a, keys: f }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _2(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { allowUnknown: true, required: true }) should fail on { one: \"one\" } "] = String.raw`
[Error: "value" must have the required property: two.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { allowUnknown: true, required: true }) should fail on { two: \"two\" } "] = String.raw`
[Error: "value" must have the required property: one.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { allowUnknown: true, required: true }) should fail on { two: \"two\", three: 3 } "] = String.raw`
[Error: "value" must have the required property: one.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { allowUnknown: true, required: true }) should have validation, but not have validations for extra properties "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a) {
    var b = new Set(), c = \"\";
    for (c in a) b.add(c);
    return b;
  }
  function _1(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  function _2(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    } else {
      e = _0(b);
      f = [];
      if (e.delete(\"one\")) {
        _1(a + \".one\", b[\"one\"], c + 1, d);
      } else {
        f.push(\"one\");
      }
      if (e.delete(\"two\")) {
        _1(a + \".two\", b[\"two\"], c + 1, d);
      } else {
        f.push(\"two\");
      }
      if (f.length > 0) {
        d.push({ code: \"objectRequiredKeys\", args: { name: a, keys: f }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _2(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: [\"one\"] }) should fail on object that has different properties "] = String.raw`
[Error: "value" must not have unknown property: three.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: [\"one\"] }) should fail on object that has extra properties "] = String.raw`
[Error: "value" must not have unknown properties: four,three.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: [\"one\"] }) should fail on { one: 1, two: \"two\" } "] = String.raw`
[Error: "value.one" must be a string.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: [\"one\"] }) should fail on { one: null, two: null } "] = String.raw`
[Error: "value" has 2 validation errors:
- "value.one" must be a string.
- "value.two" must be a string.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: [\"one\"] }) should fail on { two: \"two\" } "] = String.raw`
[Error: "value" must have the required property: one.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: [\"one\"] }) should fail on {} "] = String.raw`
[Error: "value" must have the required property: one.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: [\"one\"] }) should have validation for property values "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a) {
    var b = new Set(), c = \"\";
    for (c in a) b.add(c);
    return b;
  }
  function _1(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  function _2(a) {
    var b = [];
    a.forEach(function(x) { b.push(x) });
    return b.sort(undefined);
  }
  function _3(a, b, c, d) {
    var e = null, f = null, g = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    } else {
      e = _0(b);
      f = [];
      if (e.delete(\"one\")) {
        _1(a + \".one\", b[\"one\"], c + 1, d);
      } else {
        f.push(\"one\");
      }
      if (e.delete(\"two\") && (g = b[\"two\"]) !== undefined) {
        _1(a + \".two\", g, c + 1, d);
      }
      if (f.length > 0) {
        d.push({ code: \"objectRequiredKeys\", args: { name: a, keys: f }, depth: c + 1 });
      }
      if (e.size > 0) {
        d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _2(e) }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _3(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: true }) should fail on object that has different properties "] = String.raw`
[Error: "value" has 2 validation errors:
- "value" must have the required property: two.
- "value" must not have unknown property: three.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: true }) should fail on object that has extra properties "] = String.raw`
[Error: "value" must not have unknown properties: four,three.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: true }) should fail on { one: 1, two: \"two\" } "] = String.raw`
[Error: "value.one" must be a string.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: true }) should fail on { one: \"one\", two: null } "] = String.raw`
[Error: "value.two" must be a string.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: true }) should fail on { one: \"one\", two: undefined } "] = String.raw`
[Error: "value.two" must be a string.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: true }) should fail on {} "] = String.raw`
[Error: "value" must have the required properties: one,two.]
`.slice(1, -1)

exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: true }) should have validation for property values "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a) {
    var b = new Set(), c = \"\";
    for (c in a) b.add(c);
    return b;
  }
  function _1(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  function _2(a) {
    var b = [];
    a.forEach(function(x) { b.push(x) });
    return b.sort(undefined);
  }
  function _3(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    } else {
      e = _0(b);
      f = [];
      if (e.delete(\"one\")) {
        _1(a + \".one\", b[\"one\"], c + 1, d);
      } else {
        f.push(\"one\");
      }
      if (e.delete(\"two\")) {
        _1(a + \".two\", b[\"two\"], c + 1, d);
      } else {
        f.push(\"two\");
      }
      if (f.length > 0) {
        d.push({ code: \"objectRequiredKeys\", args: { name: a, keys: f }, depth: c + 1 });
      }
      if (e.size > 0) {
        d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _2(e) }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _3(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.object({}) should fail on null "] = String.raw`
[Error: "value" must be an object.]
`.slice(1, -1)

exports["schemas.object({}) should fail on object that has properties "] = String.raw`
[Error: "value" must not have unknown properties: bar,foo.]
`.slice(1, -1)

exports["schemas.object({}) should fail on string "] = String.raw`
[Error: "value" must be an object.]
`.slice(1, -1)

exports["schemas.object({}) should have validation, only for unknown properties "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a) {
    var b = new Set(), c = \"\";
    for (c in a) b.add(c);
    return b;
  }
  function _1(a) {
    var b = [];
    a.forEach(function(x) { b.push(x) });
    return b.sort(undefined);
  }
  function _2(a, b, c, d) {
    var e = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    } else {
      e = _0(b);
      if (e.size > 0) {
        d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _1(e) }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _2(name, value, 0, []);
  };
})({});"
`.slice(1, -1)