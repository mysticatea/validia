exports["schemas.custom(\"an absolute path\", (x: unknown): x is string => ...) should fail on ./foo.js "] = String.raw`
[Error: "value" must be an absolute path.]
`.slice(1, -1)

exports["schemas.custom(\"an absolute path\", (x: unknown): x is string => ...) should fail on null "] = String.raw`
[Error: "value" must be an absolute path.]
`.slice(1, -1)

exports["schemas.custom(\"an absolute path\", (x: unknown): x is string => ...) should have validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  var _0 = $schema.check;
  function _1(a, b, c, d) {
    if (!_0(b)) {
      d.push({ code: \"custom\", args: { name: a, checkFunc: _0, checkName: \"an absolute path\" }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)