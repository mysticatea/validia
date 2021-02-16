exports["schemas.function() should fail on null "] = String.raw`
[Error: "value" must be a function.]
`.slice(1, -1)

exports["schemas.function() should fail on number "] = String.raw`
[Error: "value" must be a function.]
`.slice(1, -1)

exports["schemas.function() should fail on string "] = String.raw`
[Error: "value" must be a function.]
`.slice(1, -1)

exports["schemas.function() should have validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"function\") {
      d.push({ code: \"function\", args: { name: a }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)