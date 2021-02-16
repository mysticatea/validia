exports["schemas.int16 should fail on -32769 "] = String.raw`
[Error: "value" must be greater than or equal to -32768.]
`.slice(1, -1)

exports["schemas.int16 should fail on 0.5 "] = String.raw`
[Error: "value" must be an integer.]
`.slice(1, -1)

exports["schemas.int16 should fail on 32768 "] = String.raw`
[Error: "value" must be less than or equal to 32767.]
`.slice(1, -1)

exports["schemas.int32 should fail on -2147483649 "] = String.raw`
[Error: "value" must be greater than or equal to -2147483648.]
`.slice(1, -1)

exports["schemas.int32 should fail on 0.5 "] = String.raw`
[Error: "value" must be an integer.]
`.slice(1, -1)

exports["schemas.int32 should fail on 2147483648 "] = String.raw`
[Error: "value" must be less than or equal to 2147483647.]
`.slice(1, -1)

exports["schemas.int8 should fail on -129 "] = String.raw`
[Error: "value" must be greater than or equal to -128.]
`.slice(1, -1)

exports["schemas.int8 should fail on 0.5 "] = String.raw`
[Error: "value" must be an integer.]
`.slice(1, -1)

exports["schemas.int8 should fail on 128 "] = String.raw`
[Error: "value" must be less than or equal to 127.]
`.slice(1, -1)

exports["schemas.number() should fail on -Infinity "] = String.raw`
[Error: "value" must not be Infinity.]
`.slice(1, -1)

exports["schemas.number() should fail on Infinity "] = String.raw`
[Error: "value" must not be Infinity.]
`.slice(1, -1)

exports["schemas.number() should fail on NaN "] = String.raw`
[Error: "value" must not be NaN.]
`.slice(1, -1)

exports["schemas.number() should fail on bigint "] = String.raw`
[Error: "value" must be a number.]
`.slice(1, -1)

exports["schemas.number() should fail on null "] = String.raw`
[Error: "value" must be a number.]
`.slice(1, -1)

exports["schemas.number() should fail on string "] = String.raw`
[Error: "value" must be a number.]
`.slice(1, -1)

exports["schemas.number() should have no validation for min/max "] = String.raw`
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
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.number({ allowInfinity: true }) should fail on NaN "] = String.raw`
[Error: "value" must not be NaN.]
`.slice(1, -1)

exports["schemas.number({ allowInfinity: true }) should fail on \"0\" "] = String.raw`
[Error: "value" must be a number.]
`.slice(1, -1)

exports["schemas.number({ allowInfinity: true }) should have validation allowing Infinity "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Number.isFinite(b)) {
      if (Number.isNaN(b)) {
        d.push({ code: \"numberDisallowNaN\", args: { name: a }, depth: c });
      } else if (b !== Number.POSITIVE_INFINITY && b !== Number.NEGATIVE_INFINITY) {
        d.push({ code: \"number\", args: { name: a }, depth: c });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.number({ allowInfinity: true, allowNaN: true }) should fail on \"0\" "] = String.raw`
[Error: "value" must be a number.]
`.slice(1, -1)

exports["schemas.number({ allowInfinity: true, allowNaN: true }) should have validation allowing Infinity and NaN "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"number\") {
      d.push({ code: \"number\", args: { name: a }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.number({ allowInfinity: true, allowNaN: true, intOnly: true }) should fail on 0.5 "] = String.raw`
[Error: "value" must be an integer.]
`.slice(1, -1)

exports["schemas.number({ allowInfinity: true, allowNaN: true, intOnly: true }) should fail on \"0\" "] = String.raw`
[Error: "value" must be an integer.]
`.slice(1, -1)

exports["schemas.number({ allowInfinity: true, allowNaN: true, intOnly: true }) should have validation allowing Infinity and NaN "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Number.isInteger(b)) {
      if (b !== Number.POSITIVE_INFINITY && b !== Number.NEGATIVE_INFINITY && !Number.isNaN(b)) {
        d.push({ code: \"numberIntOnly\", args: { name: a }, depth: c });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.number({ allowInfinity: true, intOnly: true }) should fail on 0.5 "] = String.raw`
[Error: "value" must be an integer.]
`.slice(1, -1)

exports["schemas.number({ allowInfinity: true, intOnly: true }) should fail on NaN "] = String.raw`
[Error: "value" must not be NaN.]
`.slice(1, -1)

exports["schemas.number({ allowInfinity: true, intOnly: true }) should fail on \"0\" "] = String.raw`
[Error: "value" must be an integer.]
`.slice(1, -1)

exports["schemas.number({ allowInfinity: true, intOnly: true }) should have validation allowing Infinity "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Number.isInteger(b)) {
      if (Number.isNaN(b)) {
        d.push({ code: \"numberDisallowNaN\", args: { name: a }, depth: c });
      } else if (b !== Number.POSITIVE_INFINITY && b !== Number.NEGATIVE_INFINITY) {
        d.push({ code: \"numberIntOnly\", args: { name: a }, depth: c });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.number({ allowNaN: true }) should fail on -Infinity "] = String.raw`
[Error: "value" must not be Infinity.]
`.slice(1, -1)

exports["schemas.number({ allowNaN: true }) should fail on Infinity "] = String.raw`
[Error: "value" must not be Infinity.]
`.slice(1, -1)

exports["schemas.number({ allowNaN: true }) should fail on \"0\" "] = String.raw`
[Error: "value" must be a number.]
`.slice(1, -1)

exports["schemas.number({ allowNaN: true }) should have validation allowing NaN "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Number.isFinite(b)) {
      if (b === Number.POSITIVE_INFINITY || b === Number.NEGATIVE_INFINITY) {
        d.push({ code: \"numberDisallowInfinity\", args: { name: a }, depth: c });
      } else if (!Number.isNaN(b)) {
        d.push({ code: \"number\", args: { name: a }, depth: c });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.number({ allowNaN: true, intOnly: true }) should fail on -Infinity "] = String.raw`
[Error: "value" must not be Infinity.]
`.slice(1, -1)

exports["schemas.number({ allowNaN: true, intOnly: true }) should fail on 0.5 "] = String.raw`
[Error: "value" must be an integer.]
`.slice(1, -1)

exports["schemas.number({ allowNaN: true, intOnly: true }) should fail on Infinity "] = String.raw`
[Error: "value" must not be Infinity.]
`.slice(1, -1)

exports["schemas.number({ allowNaN: true, intOnly: true }) should fail on \"0\" "] = String.raw`
[Error: "value" must be an integer.]
`.slice(1, -1)

exports["schemas.number({ allowNaN: true, intOnly: true }) should have validation allowing NaN "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Number.isInteger(b)) {
      if (b === Number.POSITIVE_INFINITY || b === Number.NEGATIVE_INFINITY) {
        d.push({ code: \"numberDisallowInfinity\", args: { name: a }, depth: c });
      } else if (!Number.isNaN(b)) {
        d.push({ code: \"numberIntOnly\", args: { name: a }, depth: c });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.number({ intOnly: true }) should fail on -Infinity "] = String.raw`
[Error: "value" must not be Infinity.]
`.slice(1, -1)

exports["schemas.number({ intOnly: true }) should fail on 0.5 "] = String.raw`
[Error: "value" must be an integer.]
`.slice(1, -1)

exports["schemas.number({ intOnly: true }) should fail on Infinity "] = String.raw`
[Error: "value" must not be Infinity.]
`.slice(1, -1)

exports["schemas.number({ intOnly: true }) should fail on NaN "] = String.raw`
[Error: "value" must not be NaN.]
`.slice(1, -1)

exports["schemas.number({ intOnly: true }) should fail on bigint "] = String.raw`
[Error: "value" must be an integer.]
`.slice(1, -1)

exports["schemas.number({ intOnly: true }) should have validation, but not have for min/max "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Number.isInteger(b)) {
      if (b === Number.POSITIVE_INFINITY || b === Number.NEGATIVE_INFINITY) {
        d.push({ code: \"numberDisallowInfinity\", args: { name: a }, depth: c });
      } else if (Number.isNaN(b)) {
        d.push({ code: \"numberDisallowNaN\", args: { name: a }, depth: c });
      } else {
        d.push({ code: \"numberIntOnly\", args: { name: a }, depth: c });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.number({ maxValue: 0, minValue: 1 }) should throw a fatal error on compile "] = String.raw`
[Error: "maxValue" must be "minValue" or greater than it.]
`.slice(1, -1)

exports["schemas.number({ maxValue: 1 }) should fail on 2 "] = String.raw`
[Error: "value" must be less than or equal to 1.]
`.slice(1, -1)

exports["schemas.number({ maxValue: 1 }) should fail on NaN "] = String.raw`
[Error: "value" must not be NaN.]
`.slice(1, -1)

exports["schemas.number({ maxValue: 1 }) should have validation for maxValue "] = String.raw`
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
    } else {
      if (b > 1) {
        d.push({ code: \"numberMaxValue\", args: { name: a, maxValue: 1 }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.number({ maxValue: 1, minValue: 0 }) should fail on -1 "] = String.raw`
[Error: "value" must be greater than or equal to 0.]
`.slice(1, -1)

exports["schemas.number({ maxValue: 1, minValue: 0 }) should fail on 2 "] = String.raw`
[Error: "value" must be less than or equal to 1.]
`.slice(1, -1)

exports["schemas.number({ maxValue: 1, minValue: 0 }) should fail on NaN "] = String.raw`
[Error: "value" must not be NaN.]
`.slice(1, -1)

exports["schemas.number({ maxValue: 1, minValue: 0 }) should have validation for min/max "] = String.raw`
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
    } else {
      if (b > 1) {
        d.push({ code: \"numberMaxValue\", args: { name: a, maxValue: 1 }, depth: c + 1 });
      } else if (b < 0) {
        d.push({ code: \"numberMinValue\", args: { name: a, minValue: 0 }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.number({ minValue: 1 }) should fail on 0 "] = String.raw`
[Error: "value" must be greater than or equal to 1.]
`.slice(1, -1)

exports["schemas.number({ minValue: 1 }) should fail on NaN "] = String.raw`
[Error: "value" must not be NaN.]
`.slice(1, -1)

exports["schemas.number({ minValue: 1 }) should have validation for minValue "] = String.raw`
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
    } else {
      if (b < 1) {
        d.push({ code: \"numberMinValue\", args: { name: a, minValue: 1 }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.uint16 should fail on -1 "] = String.raw`
[Error: "value" must be greater than or equal to 0.]
`.slice(1, -1)

exports["schemas.uint16 should fail on 0.5 "] = String.raw`
[Error: "value" must be an integer.]
`.slice(1, -1)

exports["schemas.uint16 should fail on 65536 "] = String.raw`
[Error: "value" must be less than or equal to 65535.]
`.slice(1, -1)

exports["schemas.uint32 should fail on -1 "] = String.raw`
[Error: "value" must be greater than or equal to 0.]
`.slice(1, -1)

exports["schemas.uint32 should fail on 0.5 "] = String.raw`
[Error: "value" must be an integer.]
`.slice(1, -1)

exports["schemas.uint32 should fail on 4294967296 "] = String.raw`
[Error: "value" must be less than or equal to 4294967295.]
`.slice(1, -1)

exports["schemas.uint8 should fail on -1 "] = String.raw`
[Error: "value" must be greater than or equal to 0.]
`.slice(1, -1)

exports["schemas.uint8 should fail on 0.5 "] = String.raw`
[Error: "value" must be an integer.]
`.slice(1, -1)

exports["schemas.uint8 should fail on 256 "] = String.raw`
[Error: "value" must be less than or equal to 255.]
`.slice(1, -1)