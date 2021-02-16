exports["schemas.symbol() should fail on null "] = String.raw`
[Error: "value" must be a symbol.]
`.slice(1, -1)

exports["schemas.symbol() should fail on number "] = String.raw`
[Error: "value" must be a symbol.]
`.slice(1, -1)

exports["schemas.symbol() should fail on string "] = String.raw`
[Error: "value" must be a symbol.]
`.slice(1, -1)

exports["schemas.symbol() should have validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"symbol\") {
      d.push({ code: \"symbol\", args: { name: a }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)