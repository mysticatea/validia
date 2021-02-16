exports["schemas.any() should have no validation "] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)