exports["schemas.instanceOf(RegExp) should fail on null "] = String.raw`
[Error: "value" must be an instance of RegExp.]
`.slice(1, -1)

exports["schemas.instanceOf(RegExp) should fail on other objects "] = String.raw`
[Error: "value" must be an instance of RegExp.]
`.slice(1, -1)

exports["schemas.instanceOf(RegExp) should fail on string "] = String.raw`
[Error: "value" must be an instance of RegExp.]
`.slice(1, -1)

exports["schemas.instanceOf(RegExp) should have validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  var _0 = $schema.constructor;
  function _1(a, b, c, d) {
    if (!(b instanceof _0)) {
      d.push({ code: \"class\", args: { name: a, constructor: _0 }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)