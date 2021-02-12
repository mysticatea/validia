exports["IsomochaCommonOptions should have good validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a) {
    var b = new Set(), c = \"\";
    for (c in a) b.add(c);
    return b;
  }
  function _1(a, b, c, d) {
    if (typeof b !== \"boolean\") {
      d.push({ code: \"boolean\", args: { name: a }, depth: c });
    }
    return d;
  }
  function _2(a, b) {
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
  function _3(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
      return d;
    }
    if (_2(b, 1) < 1) {
      d.push({ code: \"stringMinLength\", args: { name: a, minLength: 1 }, depth: c });
    }
    return d;
  }
  function _4(a, b, c, d) {
    if (b !== \"clover\" && b !== \"cobertura\" && b !== \"html-spa\" && b !== \"html\" && b !== \"json-summary\" && b !== \"json\" && b !== \"lcov\" && b !== \"lcovonly\" && b !== \"teamcity\" && b !== \"text-lcov\" && b !== \"text-summary\" && b !== \"text\") {
      d.push({ code: \"enum\", args: { name: a, values: [\"clover\", \"cobertura\", \"html-spa\", \"html\", \"json-summary\", \"json\", \"lcov\", \"lcovonly\", \"teamcity\", \"text-lcov\", \"text-summary\", \"text\"] }, depth: c });
    }
    return d;
  }
  var _5 = $schema.properties[\"coverageOptions\"].properties[\"reporters\"].elements.schemas[0];
  function _6(a, b, c, d) {
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    }
    return d;
  }
  function _7(a) {
    var b = [];
    a.forEach(function(x) { b.push(x) });
    return b.sort(undefined);
  }
  function _8(a, b, c, d) {
    var e = null, f = null, g = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
      return d;
    }
    e = _0(b);
    f = [];
    if (e.delete(\"id\")) {
      _4(a + \".id\", b[\"id\"], c + 1, d);
    } else {
      f.push(\"id\");
    }
    if (e.delete(\"options\") && (g = b[\"options\"]) !== undefined) {
      _6(a + \".options\", g, c + 1, d);
    }
    if (f.length > 0) {
      d.push({ code: \"objectRequiredKeys\", args: { name: a, keys: f }, depth: c });
    }
    if (e.size > 0) {
      d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _7(e) }, depth: c });
    }
    return d;
  }
  var _9 = $schema.properties[\"coverageOptions\"].properties[\"reporters\"].elements.schemas[1];
  function _a(a, b) {
    return a <= b.depth ? a : b.depth;
  }
  function _b(a, b, c, d, e, f) {
    var g = [], h = null, i = -1, j = 0, k = 0;
    for (k = 0; k < f.length; ++k) {
      h = f[k](a, b, c, []);
      if (h.length === 0) {
        return d;
      }
      j = h.reduce(_a, 1073741823)
      if (j > i) {
        g = [h];
        i = j;
      } else if (j === i) {
        g.push(h);
      }
    }
    if (g.length === 1) {
      g = g[0];
      for (k = 0; k < g.length; ++k) {
        d.push(g[k]);
      }
    } else if (g.length >= 2) {
      d.push({ code: \"union\", args: { name: a, schemas: e }, depth: c });
    }
    return d;
  }
  function _c(a, b, c, d) {
    return _b(a, b, c, d, [_5, _9], [_4, _8]);
  }
  function _d(a, b, c, d) {
    var e = 0, f = 0;
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
      return d;
    }
    e = b.length;
    for (f = 0; f < e; ++f) {
      _c(a + \"[\" + f + \"]\", b[f], c + 1, d);
    }
    return d;
  }
  function _e(a, b, c, d) {
    var e = 0, f = 0;
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
      return d;
    }
    e = b.length;
    for (f = 0; f < e; ++f) {
      _3(a + \"[\" + f + \"]\", b[f], c + 1, d);
    }
    return d;
  }
  function _f(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
      return d;
    }
    e = _0(b);
    if (e.delete(\"outputDirectoryPath\") && (f = b[\"outputDirectoryPath\"]) !== undefined) {
      _3(a + \".outputDirectoryPath\", f, c + 1, d);
    }
    if (e.delete(\"reporters\") && (f = b[\"reporters\"]) !== undefined) {
      _d(a + \".reporters\", f, c + 1, d);
    }
    if (e.delete(\"sourceFilePatterns\") && (f = b[\"sourceFilePatterns\"]) !== undefined) {
      _e(a + \".sourceFilePatterns\", f, c + 1, d);
    }
    if (e.size > 0) {
      d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _7(e) }, depth: c });
    }
    return d;
  }
  var _g = $schema.properties[\"cwd\"].check;
  function _h(a, b, c, d) {
    if (!_g(b)) {
      d.push({ code: \"custom\", args: { name: a, checkFunc: _g, checkName: \"an absolute path\" }, depth: c });
    }
    return d;
  }
  function _i(a, b, c, d) {
    if (b !== \"node\" && b !== \"chromium\" && b !== \"firefox\" && b !== \"webkit\") {
      d.push({ code: \"enum\", args: { name: a, values: [\"node\", \"chromium\", \"firefox\", \"webkit\"] }, depth: c });
    }
    return d;
  }
  function _j(a, b, c, d) {
    var e = 0, f = 0;
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
      return d;
    }
    e = b.length;
    for (f = 0; f < e; ++f) {
      _i(a + \"[\" + f + \"]\", b[f], c + 1, d);
    }
    return d;
  }
  var _k = $schema.properties[\"mochaOptions\"].properties[\"grep\"].schemas[0].constructor;
  function _l(a, b, c, d) {
    if (!(b instanceof _k)) {
      d.push({ code: \"class\", args: { name: a, constructor: _k }, depth: c });
    }
    return d;
  }
  var _m = $schema.properties[\"mochaOptions\"].properties[\"grep\"].schemas[0];
  var _n = $schema.properties[\"mochaOptions\"].properties[\"grep\"].schemas[1];
  function _o(a, b, c, d) {
    return _b(a, b, c, d, [_m, _n], [_l, _3]);
  }
  var _p = $schema.properties[\"mochaOptions\"].properties[\"isWorker\"].check;
  function _q(a, b, c, d) {
    if (!_p(b)) {
      d.push({ code: \"custom\", args: { name: a, checkFunc: _p, checkName: \"never because unsupported\" }, depth: c });
    }
    return d;
  }
  function _r(a, b, c, d) {
    if (typeof b !== \"function\") {
      d.push({ code: \"function\", args: { name: a }, depth: c });
    }
    return d;
  }
  var _s = $schema.properties[\"mochaOptions\"].properties[\"reporter\"].schemas[1];
  function _t(a, b, c, d) {
    return _b(a, b, c, d, [_n, _s], [_3, _r]);
  }
  function _u(a, b, c, d) {
    if (typeof b !== \"number\" || Number.isNaN(b)) {
      d.push({ code: \"number\", args: { name: a }, depth: c });
    }
    return d;
  }
  var _v = $schema.properties[\"mochaOptions\"].properties[\"slow\"].schemas[0];
  function _w(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  var _x = $schema.properties[\"mochaOptions\"].properties[\"slow\"].schemas[1];
  function _y(a, b, c, d) {
    return _b(a, b, c, d, [_v, _x], [_u, _w]);
  }
  function _z(a, b, c, d) {
    if (b !== \"bdd\" && b !== \"tdd\") {
      d.push({ code: \"enum\", args: { name: a, values: [\"bdd\", \"tdd\"] }, depth: c });
    }
    return d;
  }
  function _10(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
      return d;
    }
    e = _0(b);
    if (e.delete(\"allowUncaught\") && (f = b[\"allowUncaught\"]) !== undefined) {
      _1(a + \".allowUncaught\", f, c + 1, d);
    }
    if (e.delete(\"asyncOnly\") && (f = b[\"asyncOnly\"]) !== undefined) {
      _1(a + \".asyncOnly\", f, c + 1, d);
    }
    if (e.delete(\"bail\") && (f = b[\"bail\"]) !== undefined) {
      _1(a + \".bail\", f, c + 1, d);
    }
    if (e.delete(\"checkLeaks\") && (f = b[\"checkLeaks\"]) !== undefined) {
      _1(a + \".checkLeaks\", f, c + 1, d);
    }
    if (e.delete(\"color\") && (f = b[\"color\"]) !== undefined) {
      _1(a + \".color\", f, c + 1, d);
    }
    if (e.delete(\"delay\") && (f = b[\"delay\"]) !== undefined) {
      _1(a + \".delay\", f, c + 1, d);
    }
    if (e.delete(\"diff\") && (f = b[\"diff\"]) !== undefined) {
      _1(a + \".diff\", f, c + 1, d);
    }
    if (e.delete(\"fgrep\") && (f = b[\"fgrep\"]) !== undefined) {
      _3(a + \".fgrep\", f, c + 1, d);
    }
    if (e.delete(\"forbidOnly\") && (f = b[\"forbidOnly\"]) !== undefined) {
      _1(a + \".forbidOnly\", f, c + 1, d);
    }
    if (e.delete(\"forbidPending\") && (f = b[\"forbidPending\"]) !== undefined) {
      _1(a + \".forbidPending\", f, c + 1, d);
    }
    if (e.delete(\"fullTrace\") && (f = b[\"fullTrace\"]) !== undefined) {
      _1(a + \".fullTrace\", f, c + 1, d);
    }
    if (e.delete(\"global\") && (f = b[\"global\"]) !== undefined) {
      _e(a + \".global\", f, c + 1, d);
    }
    if (e.delete(\"grep\") && (f = b[\"grep\"]) !== undefined) {
      _o(a + \".grep\", f, c + 1, d);
    }
    if (e.delete(\"growl\") && (f = b[\"growl\"]) !== undefined) {
      _1(a + \".growl\", f, c + 1, d);
    }
    if (e.delete(\"inlineDiffs\") && (f = b[\"inlineDiffs\"]) !== undefined) {
      _1(a + \".inlineDiffs\", f, c + 1, d);
    }
    if (e.delete(\"invert\") && (f = b[\"invert\"]) !== undefined) {
      _1(a + \".invert\", f, c + 1, d);
    }
    if (e.delete(\"isWorker\") && (f = b[\"isWorker\"]) !== undefined) {
      _q(a + \".isWorker\", f, c + 1, d);
    }
    if (e.delete(\"jobs\") && (f = b[\"jobs\"]) !== undefined) {
      _q(a + \".jobs\", f, c + 1, d);
    }
    if (e.delete(\"noHighlighting\") && (f = b[\"noHighlighting\"]) !== undefined) {
      _q(a + \".noHighlighting\", f, c + 1, d);
    }
    if (e.delete(\"parallel\") && (f = b[\"parallel\"]) !== undefined) {
      _q(a + \".parallel\", f, c + 1, d);
    }
    if (e.delete(\"reporter\") && (f = b[\"reporter\"]) !== undefined) {
      _t(a + \".reporter\", f, c + 1, d);
    }
    if (e.delete(\"reporterOptions\") && (f = b[\"reporterOptions\"]) !== undefined) {
      _6(a + \".reporterOptions\", f, c + 1, d);
    }
    if (e.delete(\"retries\") && (f = b[\"retries\"]) !== undefined) {
      _u(a + \".retries\", f, c + 1, d);
    }
    if (e.delete(\"rootHooks\") && (f = b[\"rootHooks\"]) !== undefined) {
      _q(a + \".rootHooks\", f, c + 1, d);
    }
    if (e.delete(\"slow\") && (f = b[\"slow\"]) !== undefined) {
      _y(a + \".slow\", f, c + 1, d);
    }
    if (e.delete(\"timeout\") && (f = b[\"timeout\"]) !== undefined) {
      _y(a + \".timeout\", f, c + 1, d);
    }
    if (e.delete(\"ui\") && (f = b[\"ui\"]) !== undefined) {
      _z(a + \".ui\", f, c + 1, d);
    }
    if (e.size > 0) {
      d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _7(e) }, depth: c });
    }
    return d;
  }
  function _11(a, b, c, d) {
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
    }
    return d;
  }
  function _12(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
      return d;
    }
    e = _0(b);
    if (e.delete(\"rules\") && (f = b[\"rules\"]) !== undefined) {
      _11(a + \".rules\", f, c + 1, d);
    }
    if (e.size > 0) {
      d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _7(e) }, depth: c });
    }
    return d;
  }
  function _13(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
      return d;
    }
    e = _0(b);
    if (e.delete(\"alias\") && (f = b[\"alias\"]) !== undefined) {
      _6(a + \".alias\", f, c + 1, d);
    }
    if (e.size > 0) {
      d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _7(e) }, depth: c });
    }
    return d;
  }
  function _14(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
      return d;
    }
    e = _0(b);
    if (e.delete(\"amd\") && (f = b[\"amd\"]) !== undefined) {
      _q(a + \".amd\", f, c + 1, d);
    }
    if (e.delete(\"bail\") && (f = b[\"bail\"]) !== undefined) {
      _q(a + \".bail\", f, c + 1, d);
    }
    if (e.delete(\"cache\") && (f = b[\"cache\"]) !== undefined) {
      _q(a + \".cache\", f, c + 1, d);
    }
    if (e.delete(\"context\") && (f = b[\"context\"]) !== undefined) {
      _q(a + \".context\", f, c + 1, d);
    }
    if (e.delete(\"devServer\") && (f = b[\"devServer\"]) !== undefined) {
      _q(a + \".devServer\", f, c + 1, d);
    }
    if (e.delete(\"devtool\") && (f = b[\"devtool\"]) !== undefined) {
      _q(a + \".devtool\", f, c + 1, d);
    }
    if (e.delete(\"entry\") && (f = b[\"entry\"]) !== undefined) {
      _q(a + \".entry\", f, c + 1, d);
    }
    if (e.delete(\"experiments\") && (f = b[\"experiments\"]) !== undefined) {
      _q(a + \".experiments\", f, c + 1, d);
    }
    if (e.delete(\"externals\") && (f = b[\"externals\"]) !== undefined) {
      _q(a + \".externals\", f, c + 1, d);
    }
    if (e.delete(\"externalsPresets\") && (f = b[\"externalsPresets\"]) !== undefined) {
      _q(a + \".externalsPresets\", f, c + 1, d);
    }
    if (e.delete(\"externalsType\") && (f = b[\"externalsType\"]) !== undefined) {
      _q(a + \".externalsType\", f, c + 1, d);
    }
    if (e.delete(\"ignoreWarnings\") && (f = b[\"ignoreWarnings\"]) !== undefined) {
      _q(a + \".ignoreWarnings\", f, c + 1, d);
    }
    if (e.delete(\"infrastructureLogging\") && (f = b[\"infrastructureLogging\"]) !== undefined) {
      _q(a + \".infrastructureLogging\", f, c + 1, d);
    }
    if (e.delete(\"loader\") && (f = b[\"loader\"]) !== undefined) {
      _q(a + \".loader\", f, c + 1, d);
    }
    if (e.delete(\"mode\") && (f = b[\"mode\"]) !== undefined) {
      _q(a + \".mode\", f, c + 1, d);
    }
    if (e.delete(\"module\") && (f = b[\"module\"]) !== undefined) {
      _12(a + \".module\", f, c + 1, d);
    }
    if (e.delete(\"name\") && (f = b[\"name\"]) !== undefined) {
      _q(a + \".name\", f, c + 1, d);
    }
    if (e.delete(\"node\") && (f = b[\"node\"]) !== undefined) {
      _q(a + \".node\", f, c + 1, d);
    }
    if (e.delete(\"optimization\") && (f = b[\"optimization\"]) !== undefined) {
      _q(a + \".optimization\", f, c + 1, d);
    }
    if (e.delete(\"output\") && (f = b[\"output\"]) !== undefined) {
      _q(a + \".output\", f, c + 1, d);
    }
    if (e.delete(\"parallelism\") && (f = b[\"parallelism\"]) !== undefined) {
      _q(a + \".parallelism\", f, c + 1, d);
    }
    if (e.delete(\"performance\") && (f = b[\"performance\"]) !== undefined) {
      _q(a + \".performance\", f, c + 1, d);
    }
    if (e.delete(\"plugins\") && (f = b[\"plugins\"]) !== undefined) {
      _11(a + \".plugins\", f, c + 1, d);
    }
    if (e.delete(\"profile\") && (f = b[\"profile\"]) !== undefined) {
      _q(a + \".profile\", f, c + 1, d);
    }
    if (e.delete(\"recordsInputPath\") && (f = b[\"recordsInputPath\"]) !== undefined) {
      _q(a + \".recordsInputPath\", f, c + 1, d);
    }
    if (e.delete(\"recordsOutputPath\") && (f = b[\"recordsOutputPath\"]) !== undefined) {
      _q(a + \".recordsOutputPath\", f, c + 1, d);
    }
    if (e.delete(\"recordsPath\") && (f = b[\"recordsPath\"]) !== undefined) {
      _q(a + \".recordsPath\", f, c + 1, d);
    }
    if (e.delete(\"resolve\") && (f = b[\"resolve\"]) !== undefined) {
      _13(a + \".resolve\", f, c + 1, d);
    }
    if (e.delete(\"resolveLoader\") && (f = b[\"resolveLoader\"]) !== undefined) {
      _q(a + \".resolveLoader\", f, c + 1, d);
    }
    if (e.delete(\"snapshot\") && (f = b[\"snapshot\"]) !== undefined) {
      _q(a + \".snapshot\", f, c + 1, d);
    }
    if (e.delete(\"stats\") && (f = b[\"stats\"]) !== undefined) {
      _q(a + \".stats\", f, c + 1, d);
    }
    if (e.delete(\"target\") && (f = b[\"target\"]) !== undefined) {
      _q(a + \".target\", f, c + 1, d);
    }
    if (e.delete(\"watch\") && (f = b[\"watch\"]) !== undefined) {
      _q(a + \".watch\", f, c + 1, d);
    }
    if (e.delete(\"watchOptions\") && (f = b[\"watchOptions\"]) !== undefined) {
      _q(a + \".watchOptions\", f, c + 1, d);
    }
    if (e.size > 0) {
      d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _7(e) }, depth: c });
    }
    return d;
  }
  var _15 = $schema.properties[\"webpackOptions\"].schemas[0];
  function _16(a, b, c, d) {
    return _b(a, b, c, d, [_15, _s], [_14, _r]);
  }
  function _17(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
      return d;
    }
    e = _0(b);
    if (e.delete(\"assertShim\") && (f = b[\"assertShim\"]) !== undefined) {
      _1(a + \".assertShim\", f, c + 1, d);
    }
    if (e.delete(\"coverageOptions\") && (f = b[\"coverageOptions\"]) !== undefined) {
      _f(a + \".coverageOptions\", f, c + 1, d);
    }
    if (e.delete(\"cwd\") && (f = b[\"cwd\"]) !== undefined) {
      _h(a + \".cwd\", f, c + 1, d);
    }
    if (e.delete(\"debug\") && (f = b[\"debug\"]) !== undefined) {
      _1(a + \".debug\", f, c + 1, d);
    }
    if (e.delete(\"environments\") && (f = b[\"environments\"]) !== undefined) {
      _j(a + \".environments\", f, c + 1, d);
    }
    if (e.delete(\"mochaOptions\") && (f = b[\"mochaOptions\"]) !== undefined) {
      _10(a + \".mochaOptions\", f, c + 1, d);
    }
    if (e.delete(\"sortTestFiles\") && (f = b[\"sortTestFiles\"]) !== undefined) {
      _1(a + \".sortTestFiles\", f, c + 1, d);
    }
    if (e.delete(\"webpackOptions\") && (f = b[\"webpackOptions\"]) !== undefined) {
      _16(a + \".webpackOptions\", f, c + 1, d);
    }
    if (e.size > 0) {
      d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _7(e) }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _17(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.any() should have no validation #[0]"] = String.raw`
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
exports["schemas.anyOf(schemas.number(), schemas.enum(\"auto\", \"none\")) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"number\" || Number.isNaN(b)) {
      d.push({ code: \"number\", args: { name: a }, depth: c });
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
    var g = [], h = null, i = -1, j = 0, k = 0;
    for (k = 0; k < f.length; ++k) {
      h = f[k](a, b, c, []);
      if (h.length === 0) {
        return d;
      }
      j = h.reduce(_4, 1073741823)
      if (j > i) {
        g = [h];
        i = j;
      } else if (j === i) {
        g.push(h);
      }
    }
    if (g.length === 1) {
      g = g[0];
      for (k = 0; k < g.length; ++k) {
        d.push(g[k]);
      }
    } else if (g.length >= 2) {
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
exports["schemas.anyOf(schemas.number(), schemas.string()) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"number\" || Number.isNaN(b)) {
      d.push({ code: \"number\", args: { name: a }, depth: c });
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
    var g = [], h = null, i = -1, j = 0, k = 0;
    for (k = 0; k < f.length; ++k) {
      h = f[k](a, b, c, []);
      if (h.length === 0) {
        return d;
      }
      j = h.reduce(_4, 1073741823)
      if (j > i) {
        g = [h];
        i = j;
      } else if (j === i) {
        g.push(h);
      }
    }
    if (g.length === 1) {
      g = g[0];
      for (k = 0; k < g.length; ++k) {
        d.push(g[k]);
      }
    } else if (g.length >= 2) {
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
exports["schemas.anyOf(schemas.number(), schemas.string(), schemas.object({ value: schemas.number() })) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"number\" || Number.isNaN(b)) {
      d.push({ code: \"number\", args: { name: a }, depth: c });
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
      return d;
    }
    e = _4(b);
    f = [];
    if (e.delete(\"value\")) {
      _0(a + \".value\", b[\"value\"], c + 1, d);
    } else {
      f.push(\"value\");
    }
    if (f.length > 0) {
      d.push({ code: \"objectRequiredKeys\", args: { name: a, keys: f }, depth: c });
    }
    if (e.size > 0) {
      d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _5(e) }, depth: c });
    }
    return d;
  }
  var _7 = $schema.schemas[2];
  function _8(a, b) {
    return a <= b.depth ? a : b.depth;
  }
  function _9(a, b, c, d, e, f) {
    var g = [], h = null, i = -1, j = 0, k = 0;
    for (k = 0; k < f.length; ++k) {
      h = f[k](a, b, c, []);
      if (h.length === 0) {
        return d;
      }
      j = h.reduce(_8, 1073741823)
      if (j > i) {
        g = [h];
        i = j;
      } else if (j === i) {
        g.push(h);
      }
    }
    if (g.length === 1) {
      g = g[0];
      for (k = 0; k < g.length; ++k) {
        d.push(g[k]);
      }
    } else if (g.length >= 2) {
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
exports["schemas.array() should have no validation for elements #[0]"] = String.raw`
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
exports["schemas.array(schemas.any(), { maxLength: 2 }) should have validation for maxLength #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    var e = 0;
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
      return d;
    }
    e = b.length;
    if (e > 2) {
      d.push({ code: \"arrayMaxLength\", args: { name: a, maxLength: 2 }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.array(schemas.any(), { minLength: 2 }) should have validation for minLength #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    var e = 0;
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
      return d;
    }
    e = b.length;
    if (e < 2) {
      d.push({ code: \"arrayMinLength\", args: { name: a, minLength: 2 }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.array(schemas.any(), { unique: true }) should have validation for unique #[0]"] = String.raw`
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
      return d;
    }
    e = b.length;
    if (!_0(b, e)) {
      d.push({ code: \"arrayUnique\", args: { name: a }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.array(schemas.string()) should have validation for elements #[0]"] = String.raw`
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
      return d;
    }
    e = b.length;
    for (f = 0; f < e; ++f) {
      _0(a + \"[\" + f + \"]\", b[f], c + 1, d);
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.array(schemas.string(), { maxLength: 2, minLength: 1, unique: true }) should have validation for all options #[0]"] = String.raw`
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
      return d;
    }
    e = b.length;
    if (e > 2) {
      d.push({ code: \"arrayMaxLength\", args: { name: a, maxLength: 2 }, depth: c });
    }
    if (e < 1) {
      d.push({ code: \"arrayMinLength\", args: { name: a, minLength: 1 }, depth: c });
    }
    if (!_0(b, e)) {
      d.push({ code: \"arrayUnique\", args: { name: a }, depth: c });
    }
    for (f = 0; f < e; ++f) {
      _1(a + \"[\" + f + \"]\", b[f], c + 1, d);
    }
    return d;
  }
  return function validate(name, value) {
    return _2(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.bigInt() should have no validation for min/max #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"bigint\") {
      d.push({ code: \"bigint\", args: { name: a }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.bigInt({ maxValue: 1n }) should have validation for maxValue #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"bigint\") {
      d.push({ code: \"bigint\", args: { name: a }, depth: c });
      return d;
    }
    if (b > 1n) {
      d.push({ code: \"bigintMaxValue\", args: { name: a, maxValue: 1n }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.bigInt({ maxValue: 1n, minValue: 0n }) should have validation for min/max #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"bigint\") {
      d.push({ code: \"bigint\", args: { name: a }, depth: c });
      return d;
    }
    if (b > 1n) {
      d.push({ code: \"bigintMaxValue\", args: { name: a, maxValue: 1n }, depth: c });
    }
    if (b < 0n) {
      d.push({ code: \"bigintMinValue\", args: { name: a, minValue: 0n }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.bigInt({ minValue: 1n }) should have validation for minValue #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"bigint\") {
      d.push({ code: \"bigint\", args: { name: a }, depth: c });
      return d;
    }
    if (b < 1n) {
      d.push({ code: \"bigintMinValue\", args: { name: a, minValue: 1n }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.boolean() should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"boolean\") {
      d.push({ code: \"boolean\", args: { name: a }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.custom(\"an absolute path\", (x: unknown): x is string => ...) should have validation #[0]"] = String.raw`
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
exports["schemas.enum(1n, true, 0, null, \"foo\", undefined) should have validation; it uses symbol equality comparison #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (b !== 1n && b !== true && b !== 0 && b !== null && b !== \"foo\" && b !== undefined) {
      d.push({ code: \"enum\", args: { name: a, values: [1n, true, 0, null, \"foo\", undefined] }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.enum(Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY) should have validation; it can handle NaN correctly #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Number.isNaN(b) && b !== Number.POSITIVE_INFINITY && b !== Number.NEGATIVE_INFINITY) {
      d.push({ code: \"enum\", args: { name: a, values: [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY] }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.enum(Symbol.iterator) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  var _0 = $schema.values[0];
  function _1(a, b, c, d) {
    if (b !== _0) {
      d.push({ code: \"enum\", args: { name: a, values: [_0] }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.enum(myObj, Number.NaN) should have validation; it can handle NaN correctly, along with reference values. #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  var _0 = $schema.values[0];
  function _1(a, b, c, d) {
    if (b !== _0 && !Number.isNaN(b)) {
      d.push({ code: \"enum\", args: { name: a, values: [_0, Number.NaN] }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.enum(myObj, mySymbol, myFunc) should have validation; give 'values' as an argument because it contains references. #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  var _0 = $schema.values[0];
  var _1 = $schema.values[1];
  var _2 = $schema.values[2];
  function _3(a, b, c, d) {
    if (b !== _0 && b !== _1 && b !== _2) {
      d.push({ code: \"enum\", args: { name: a, values: [_0, _1, _2] }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _3(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.enum(null) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (b !== null) {
      d.push({ code: \"enum\", args: { name: a, values: [null] }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.function() should have validation #[0]"] = String.raw`
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
exports["schemas.instanceOf(RegExp) should have validation #[0]"] = String.raw`
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
exports["schemas.number() should have no validation for min/max #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"number\" || Number.isNaN(b)) {
      d.push({ code: \"number\", args: { name: a }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.number({ allowNaN: true }) should have not validation for NaN #[0]"] = String.raw`
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
exports["schemas.number({ allowNaN: true, finiteOnly: true }) should allow NaN #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Number.isFinite(b) && !Number.isNaN(b)) {
      d.push({ code: \"numberFiniteOnly\", args: { name: a }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.number({ allowNaN: true, intOnly: true }) should allow NaN #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Number.isInteger(b) && !Number.isNaN(b)) {
      d.push({ code: \"numberIntOnly\", args: { name: a }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.number({ finiteOnly: true }) should have validation, but not have for min/max #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Number.isFinite(b)) {
      d.push({ code: \"numberFiniteOnly\", args: { name: a }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.number({ intOnly: true }) should have validation, but not have for min/max #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Number.isInteger(b)) {
      d.push({ code: \"numberIntOnly\", args: { name: a }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.number({ maxValue: 1 }) should have validation for maxValue #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"number\" || Number.isNaN(b)) {
      d.push({ code: \"number\", args: { name: a }, depth: c });
      return d;
    }
    if (b > 1) {
      d.push({ code: \"numberMaxValue\", args: { name: a, maxValue: 1 }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.number({ maxValue: 1, minValue: 0 }) should have validation for min/max #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"number\" || Number.isNaN(b)) {
      d.push({ code: \"number\", args: { name: a }, depth: c });
      return d;
    }
    if (b > 1) {
      d.push({ code: \"numberMaxValue\", args: { name: a, maxValue: 1 }, depth: c });
    }
    if (b < 0) {
      d.push({ code: \"numberMinValue\", args: { name: a, minValue: 0 }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.number({ minValue: 1 }) should have validation for minValue #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"number\" || Number.isNaN(b)) {
      d.push({ code: \"number\", args: { name: a }, depth: c });
      return d;
    }
    if (b < 1) {
      d.push({ code: \"numberMinValue\", args: { name: a, minValue: 1 }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.object() should have no validation for properties #[0]"] = String.raw`
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
exports["schemas.object({ include: schemas.anyOf(schemas.string(), schemas.array(schemas.string())), exclude: schemas.anyOf(schemas.string(), schemas.array(schemas.string())) }) should have good validation #[0]"] = String.raw`
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
  var _2 = $schema.properties[\"exclude\"].schemas[0];
  function _3(a, b, c, d) {
    var e = 0, f = 0;
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
      return d;
    }
    e = b.length;
    for (f = 0; f < e; ++f) {
      _1(a + \"[\" + f + \"]\", b[f], c + 1, d);
    }
    return d;
  }
  var _4 = $schema.properties[\"exclude\"].schemas[1];
  function _5(a, b) {
    return a <= b.depth ? a : b.depth;
  }
  function _6(a, b, c, d, e, f) {
    var g = [], h = null, i = -1, j = 0, k = 0;
    for (k = 0; k < f.length; ++k) {
      h = f[k](a, b, c, []);
      if (h.length === 0) {
        return d;
      }
      j = h.reduce(_5, 1073741823)
      if (j > i) {
        g = [h];
        i = j;
      } else if (j === i) {
        g.push(h);
      }
    }
    if (g.length === 1) {
      g = g[0];
      for (k = 0; k < g.length; ++k) {
        d.push(g[k]);
      }
    } else if (g.length >= 2) {
      d.push({ code: \"union\", args: { name: a, schemas: e }, depth: c });
    }
    return d;
  }
  function _7(a, b, c, d) {
    return _6(a, b, c, d, [_2, _4], [_1, _3]);
  }
  function _8(a) {
    var b = [];
    a.forEach(function(x) { b.push(x) });
    return b.sort(undefined);
  }
  function _9(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
      return d;
    }
    e = _0(b);
    if (e.delete(\"exclude\") && (f = b[\"exclude\"]) !== undefined) {
      _7(a + \".exclude\", f, c + 1, d);
    }
    if (e.delete(\"include\") && (f = b[\"include\"]) !== undefined) {
      _7(a + \".include\", f, c + 1, d);
    }
    if (e.size > 0) {
      d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _8(e) }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _9(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.object({ one: schemas.any(), two: schemas.any() }) should have validation, but not have validations for property values #[0]"] = String.raw`
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
      return d;
    }
    e = _0(b);
    e.delete(\"one\");
    e.delete(\"two\");
    if (e.size > 0) {
      d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _1(e) }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _2(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.object({ one: schemas.any(), two: schemas.any() }, { required: true }) should have validation, but not have validations for property values #[0]"] = String.raw`
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
      return d;
    }
    e = _0(b);
    f = [];
    if (!e.delete(\"one\")) {
      f.push(\"one\");
    }
    if (!e.delete(\"two\")) {
      f.push(\"two\");
    }
    if (f.length > 0) {
      d.push({ code: \"objectRequiredKeys\", args: { name: a, keys: f }, depth: c });
    }
    if (e.size > 0) {
      d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _1(e) }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _2(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.object({ one: schemas.any(), two: schemas.string() }, { allowUnknown: true }) should have validation, but not have validations for extra properties #[0]"] = String.raw`
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
      return d;
    }
    e = _0(b);
    if (e.delete(\"two\") && (f = b[\"two\"]) !== undefined) {
      _1(a + \".two\", f, c + 1, d);
    }
    return d;
  }
  return function validate(name, value) {
    return _2(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.object({ one: schemas.string(), two: schemas.string() }) should have validation for property values #[0]"] = String.raw`
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
      return d;
    }
    e = _0(b);
    if (e.delete(\"one\") && (f = b[\"one\"]) !== undefined) {
      _1(a + \".one\", f, c + 1, d);
    }
    if (e.delete(\"two\") && (f = b[\"two\"]) !== undefined) {
      _1(a + \".two\", f, c + 1, d);
    }
    if (e.size > 0) {
      d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _2(e) }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _3(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { allowUnknown: true, required: [\"one\"] }) should have validation, but not have validations for extra properties #[0]"] = String.raw`
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
      return d;
    }
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
      d.push({ code: \"objectRequiredKeys\", args: { name: a, keys: f }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _2(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { allowUnknown: true, required: true }) should have validation, but not have validations for extra properties #[0]"] = String.raw`
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
      return d;
    }
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
      d.push({ code: \"objectRequiredKeys\", args: { name: a, keys: f }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _2(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: [\"one\"] }) should have validation for property values #[0]"] = String.raw`
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
      return d;
    }
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
      d.push({ code: \"objectRequiredKeys\", args: { name: a, keys: f }, depth: c });
    }
    if (e.size > 0) {
      d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _2(e) }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _3(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.object({ one: schemas.string(), two: schemas.string() }, { required: true }) should have validation for property values #[0]"] = String.raw`
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
      return d;
    }
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
      d.push({ code: \"objectRequiredKeys\", args: { name: a, keys: f }, depth: c });
    }
    if (e.size > 0) {
      d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _2(e) }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _3(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.object({}) should have validation, only for unknown properties #[0]"] = String.raw`
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
      return d;
    }
    e = _0(b);
    if (e.size > 0) {
      d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _1(e) }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _2(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.record() should have no validation for properties #[0]"] = String.raw`
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
exports["schemas.record(schemas.string()) should have validation for elements #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  function _1(a, b, c, d) {
    var e = null, f = \"\", g = 0;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
      return d;
    }
    e = Object.keys(b).sort(undefined);
    for (g = 0; g < e.length; ++g) {
      f = e[g]
      _0(a + \".\" + f, b[f], c + 1, d);
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.string() should have validation #[0]"] = String.raw`
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
exports["schemas.string({ maxLength: 2 }) should have validation #[0]"] = String.raw`
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
      return d;
    }
    if (_0(b, 3) > 2) {
      d.push({ code: \"stringMaxLength\", args: { name: a, maxLength: 2 }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.string({ maxLength: 2, minLength: 1 }) should have validation #[0]"] = String.raw`
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
      return d;
    }
    e = _0(b, 3);
    if (e > 2) {
      d.push({ code: \"stringMaxLength\", args: { name: a, maxLength: 2 }, depth: c });
    }
    if (e < 1) {
      d.push({ code: \"stringMinLength\", args: { name: a, minLength: 1 }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.string({ minLength: 2 }) should have validation #[0]"] = String.raw`
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
      return d;
    }
    if (_0(b, 2) < 2) {
      d.push({ code: \"stringMinLength\", args: { name: a, minLength: 2 }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.string({ pattern: /^\\d+$/ }) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
      return d;
    }
    if (!/^\\d+$/.test(b)) {
      d.push({ code: \"stringPattern\", args: { name: a, pattern: /^\\d+$/ }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.symbol() should have validation #[0]"] = String.raw`
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
exports["schemas.tuple() should have no validation for elements #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Array.isArray(b)) {
      d.push({ code: \"tuple\", args: { name: a }, depth: c });
      return d;
    }
    if (b.length !== 0) {
      d.push({ code: \"tupleLength\", args: { name: a, length: 0 }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.tuple(schemas.any()) should have no validation for elements #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (!Array.isArray(b)) {
      d.push({ code: \"tuple\", args: { name: a }, depth: c });
      return d;
    }
    if (b.length !== 1) {
      d.push({ code: \"tupleLength\", args: { name: a, length: 1 }, depth: c });
    }
    return d;
  }
  return function validate(name, value) {
    return _0(name, value, 0, []);
  };
})({});"
`.slice(1, -1)
exports["schemas.tuple(schemas.string(), schemas.string()) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(a, b, c, d) {
    if (typeof b !== \"string\") {
      d.push({ code: \"string\", args: { name: a }, depth: c });
    }
    return d;
  }
  function _1(a, b, c, d) {
    if (!Array.isArray(b)) {
      d.push({ code: \"tuple\", args: { name: a }, depth: c });
      return d;
    }
    if (b.length !== 2) {
      d.push({ code: \"tupleLength\", args: { name: a, length: 2 }, depth: c });
    }
    _0(a + \"[0]\", b[0], c + 1, d);
    _0(a + \"[1]\", b[1], c + 1, d);
    return d;
  }
  return function validate(name, value) {
    return _1(name, value, 0, []);
  };
})({});"
`.slice(1, -1)