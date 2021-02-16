exports["IsomochaCommonOptions should have good validation "] = String.raw`
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
    } else {
      if (_2(b, 1) < 1) {
        d.push({ code: \"stringMinLength\", args: { name: a, minLength: 1 }, depth: c + 1 });
      }
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
    } else {
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
        d.push({ code: \"objectRequiredKeys\", args: { name: a, keys: f }, depth: c + 1 });
      }
      if (e.size > 0) {
        d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _7(e) }, depth: c + 1 });
      }
    }
    return d;
  }
  var _9 = $schema.properties[\"coverageOptions\"].properties[\"reporters\"].elements.schemas[1];
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
    return _b(a, b, c, d, [_5, _9], [_4, _8]);
  }
  function _d(a, b, c, d) {
    var e = 0, f = 0;
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
    } else {
      e = b.length;
      for (f = 0; f < e; ++f) {
        _c(a + \"[\" + f + \"]\", b[f], c + 1, d);
      }
    }
    return d;
  }
  function _e(a, b, c, d) {
    var e = 0, f = 0;
    if (!Array.isArray(b)) {
      d.push({ code: \"array\", args: { name: a }, depth: c });
    } else {
      e = b.length;
      for (f = 0; f < e; ++f) {
        _3(a + \"[\" + f + \"]\", b[f], c + 1, d);
      }
    }
    return d;
  }
  function _f(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    } else {
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
        d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _7(e) }, depth: c + 1 });
      }
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
    } else {
      e = b.length;
      for (f = 0; f < e; ++f) {
        _i(a + \"[\" + f + \"]\", b[f], c + 1, d);
      }
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
    } else {
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
        d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _7(e) }, depth: c + 1 });
      }
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
    } else {
      e = _0(b);
      if (e.delete(\"rules\") && (f = b[\"rules\"]) !== undefined) {
        _11(a + \".rules\", f, c + 1, d);
      }
      if (e.size > 0) {
        d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _7(e) }, depth: c + 1 });
      }
    }
    return d;
  }
  function _13(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    } else {
      e = _0(b);
      if (e.delete(\"alias\") && (f = b[\"alias\"]) !== undefined) {
        _6(a + \".alias\", f, c + 1, d);
      }
      if (e.size > 0) {
        d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _7(e) }, depth: c + 1 });
      }
    }
    return d;
  }
  function _14(a, b, c, d) {
    var e = null, f = null;
    if (typeof b !== \"object\" || b === null) {
      d.push({ code: \"object\", args: { name: a }, depth: c });
    } else {
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
        d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _7(e) }, depth: c + 1 });
      }
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
    } else {
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
        d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _7(e) }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _17(name, value, 0, []);
  };
})({});"
`.slice(1, -1)

exports["schemas.object({ include: schemas.anyOf(schemas.string(), schemas.array(schemas.string())), exclude: schemas.anyOf(schemas.string(), schemas.array(schemas.string())) }) should fail on { include: 3 } "] = String.raw`
[Error: "value.include" must be a string or an array.]
`.slice(1, -1)

exports["schemas.object({ include: schemas.anyOf(schemas.string(), schemas.array(schemas.string())), exclude: schemas.anyOf(schemas.string(), schemas.array(schemas.string())) }) should have good validation "] = String.raw`
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
    } else {
      e = b.length;
      for (f = 0; f < e; ++f) {
        _1(a + \"[\" + f + \"]\", b[f], c + 1, d);
      }
    }
    return d;
  }
  var _4 = $schema.properties[\"exclude\"].schemas[1];
  function _5(a, b) {
    return a <= b.depth ? a : b.depth;
  }
  function _6(a, b, c, d, e, f) {
    var g = null, h = null, i = -1, j = 0, k = 0;
    for (; k < f.length; ++k) {
      h = f[k](a, b, c, []);
      if (h.length === 0) {
        return d;
      }
      j = h.reduce(_5, 1073741823)
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
    } else {
      e = _0(b);
      if (e.delete(\"exclude\") && (f = b[\"exclude\"]) !== undefined) {
        _7(a + \".exclude\", f, c + 1, d);
      }
      if (e.delete(\"include\") && (f = b[\"include\"]) !== undefined) {
        _7(a + \".include\", f, c + 1, d);
      }
      if (e.size > 0) {
        d.push({ code: \"objectUnknownKeys\", args: { name: a, keys: _8(e) }, depth: c + 1 });
      }
    }
    return d;
  }
  return function validate(name, value) {
    return _9(name, value, 0, []);
  };
})({});"
`.slice(1, -1)