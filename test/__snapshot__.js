exports["IsomochaCommonOptions should have good validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"boolean\") {
      errors.push({ code: \"boolean\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  function _1(str, end) {
    var count = 0, code = 0, i = 0, length = str.length;
    while (i < length) {
      count += 1;
      if (count >= end) {
        return count;
      }
      i += (code = str.charCodeAt(i)) >= 0xd800 && code <= 0xdbff ? 2 : 1;
    }
    return count
  }
  function _2(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
      return errors;
    }
    if (_1(value, 1) < 1) {
      errors.push({ code: \"stringMinLength\", args: { name: name, minLength: 1 }, depth: depth });
    }
    return errors;
  }
  function _3(name, value, depth, errors) {
    if (value !== \"clover\" && value !== \"cobertura\" && value !== \"html-spa\" && value !== \"html\" && value !== \"json-summary\" && value !== \"json\" && value !== \"lcov\" && value !== \"lcovonly\" && value !== \"teamcity\" && value !== \"text-lcov\" && value !== \"text-summary\" && value !== \"text\") {
      errors.push({ code: \"enum\", args: { name: name, values: [\"clover\", \"cobertura\", \"html-spa\", \"html\", \"json-summary\", \"json\", \"lcov\", \"lcovonly\", \"teamcity\", \"text-lcov\", \"text-summary\", \"text\"] }, depth: depth });
    }
    return errors;
  }
  var _4 = $schema.properties[\"coverageOptions\"].properties[\"reporters\"].elements.schemas[0];
  function _5(name, value, depth, errors) {
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  function _6(name, value, depth, errors) {
    var remainKeys = null, i = 0, missingKeys = null, propValue = null;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    remainKeys = Object.keys(value);
    missingKeys = [];
    i = remainKeys.indexOf(\"id\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      _3(name + \".id\", value[\"id\"], depth + 1, errors);
    } else {
      missingKeys.push(\"id\")
    }
    i = remainKeys.indexOf(\"options\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"options\"]
      if (propValue !== undefined) {
        _5(name + \".options\", propValue, depth + 1, errors);
      }
    }
    if (missingKeys.length > 0) {
      errors.push({ code: \"objectRequiredKeys\", args: { name: name, keys: missingKeys }, depth: depth });
    }
    if (remainKeys.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: remainKeys }, depth: depth });
    }
    return errors;
  }
  var _7 = $schema.properties[\"coverageOptions\"].properties[\"reporters\"].elements.schemas[1];
  function _8(minDepth, error) {
    return minDepth <= error.depth ? minDepth : error.depth;
  }
  function _9(name, value, depth, errors) {
    var varidations = [_3, _6], errorsOfMaxDepth = [], e = null, maxDepth = -1, d = 0, i = 0;
    for (i = 0; i < varidations.length; ++i) {
      e = varidations[i](name, value, depth, []);
      if (e.length === 0) {
        return errors;
      }
      d = e.reduce(_8, Number.MAX_SAFE_INTEGER)
      if (d > maxDepth) {
        errorsOfMaxDepth = [e]
        maxDepth = d;
      } else if (d === maxDepth) {
        errorsOfMaxDepth.push(e);
      }
    }
    if (errorsOfMaxDepth.length === 1) {
      errorsOfMaxDepth = errorsOfMaxDepth[0]
      for (d = 0; d < errorsOfMaxDepth.length; ++d) {
        errors.push(errorsOfMaxDepth[d])
      }
    } else if (errorsOfMaxDepth.length >= 2) {
      errors.push({ code: \"union\", args: { name: name, schemas: [_4, _7] }, depth: depth });
    }
    return errors;
  }
  function _a(name, value, depth, errors) {
    var length = 0, i = 0;
    if (!Array.isArray(value)) {
      errors.push({ code: \"array\", args: { name: name }, depth: depth });
      return errors;
    }
    length = value.length;
    for (i = 0; i < length; ++i) {
      _9(name + \"[\" + i + \"]\", value[i], depth + 1, errors);
    }
    return errors;
  }
  function _b(name, value, depth, errors) {
    var length = 0, i = 0;
    if (!Array.isArray(value)) {
      errors.push({ code: \"array\", args: { name: name }, depth: depth });
      return errors;
    }
    length = value.length;
    for (i = 0; i < length; ++i) {
      _2(name + \"[\" + i + \"]\", value[i], depth + 1, errors);
    }
    return errors;
  }
  function _c(name, value, depth, errors) {
    var remainKeys = null, i = 0, propValue = null;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    remainKeys = Object.keys(value);
    i = remainKeys.indexOf(\"outputDirectoryPath\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"outputDirectoryPath\"]
      if (propValue !== undefined) {
        _2(name + \".outputDirectoryPath\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"reporters\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"reporters\"]
      if (propValue !== undefined) {
        _a(name + \".reporters\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"sourceFilePatterns\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"sourceFilePatterns\"]
      if (propValue !== undefined) {
        _b(name + \".sourceFilePatterns\", propValue, depth + 1, errors);
      }
    }
    if (remainKeys.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: remainKeys }, depth: depth });
    }
    return errors;
  }
  var _d = $schema.properties[\"cwd\"].check;
  function _e(name, value, depth, errors) {
    if (!_d(value)) {
      errors.push({ code: \"custom\", args: { name: name, checkFunc: _d, checkName: \"an absolute path\" }, depth: depth });
    }
    return errors;
  }
  function _f(name, value, depth, errors) {
    if (value !== \"node\" && value !== \"chromium\" && value !== \"firefox\" && value !== \"webkit\") {
      errors.push({ code: \"enum\", args: { name: name, values: [\"node\", \"chromium\", \"firefox\", \"webkit\"] }, depth: depth });
    }
    return errors;
  }
  function _g(name, value, depth, errors) {
    var length = 0, i = 0;
    if (!Array.isArray(value)) {
      errors.push({ code: \"array\", args: { name: name }, depth: depth });
      return errors;
    }
    length = value.length;
    for (i = 0; i < length; ++i) {
      _f(name + \"[\" + i + \"]\", value[i], depth + 1, errors);
    }
    return errors;
  }
  var _h = $schema.properties[\"mochaOptions\"].properties[\"grep\"].schemas[0].constructor;
  function _i(name, value, depth, errors) {
    if (!(value instanceof _h)) {
      errors.push({ code: \"class\", args: { name: name, constructor: _h }, depth: depth });
    }
    return errors;
  }
  var _j = $schema.properties[\"mochaOptions\"].properties[\"grep\"].schemas[0];
  var _k = $schema.properties[\"mochaOptions\"].properties[\"grep\"].schemas[1];
  function _l(name, value, depth, errors) {
    var varidations = [_i, _2], errorsOfMaxDepth = [], e = null, maxDepth = -1, d = 0, i = 0;
    for (i = 0; i < varidations.length; ++i) {
      e = varidations[i](name, value, depth, []);
      if (e.length === 0) {
        return errors;
      }
      d = e.reduce(_8, Number.MAX_SAFE_INTEGER)
      if (d > maxDepth) {
        errorsOfMaxDepth = [e]
        maxDepth = d;
      } else if (d === maxDepth) {
        errorsOfMaxDepth.push(e);
      }
    }
    if (errorsOfMaxDepth.length === 1) {
      errorsOfMaxDepth = errorsOfMaxDepth[0]
      for (d = 0; d < errorsOfMaxDepth.length; ++d) {
        errors.push(errorsOfMaxDepth[d])
      }
    } else if (errorsOfMaxDepth.length >= 2) {
      errors.push({ code: \"union\", args: { name: name, schemas: [_j, _k] }, depth: depth });
    }
    return errors;
  }
  var _m = $schema.properties[\"mochaOptions\"].properties[\"isWorker\"].check;
  function _n(name, value, depth, errors) {
    if (!_m(value)) {
      errors.push({ code: \"custom\", args: { name: name, checkFunc: _m, checkName: \"never because unsupported\" }, depth: depth });
    }
    return errors;
  }
  function _o(name, value, depth, errors) {
    if (typeof value !== \"function\") {
      errors.push({ code: \"function\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  var _p = $schema.properties[\"mochaOptions\"].properties[\"reporter\"].schemas[1];
  function _q(name, value, depth, errors) {
    var varidations = [_2, _o], errorsOfMaxDepth = [], e = null, maxDepth = -1, d = 0, i = 0;
    for (i = 0; i < varidations.length; ++i) {
      e = varidations[i](name, value, depth, []);
      if (e.length === 0) {
        return errors;
      }
      d = e.reduce(_8, Number.MAX_SAFE_INTEGER)
      if (d > maxDepth) {
        errorsOfMaxDepth = [e]
        maxDepth = d;
      } else if (d === maxDepth) {
        errorsOfMaxDepth.push(e);
      }
    }
    if (errorsOfMaxDepth.length === 1) {
      errorsOfMaxDepth = errorsOfMaxDepth[0]
      for (d = 0; d < errorsOfMaxDepth.length; ++d) {
        errors.push(errorsOfMaxDepth[d])
      }
    } else if (errorsOfMaxDepth.length >= 2) {
      errors.push({ code: \"union\", args: { name: name, schemas: [_k, _p] }, depth: depth });
    }
    return errors;
  }
  function _r(name, value, depth, errors) {
    if (typeof value !== \"number\" || Number.isNaN(value)) {
      errors.push({ code: \"number\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  var _s = $schema.properties[\"mochaOptions\"].properties[\"slow\"].schemas[0];
  function _t(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  var _u = $schema.properties[\"mochaOptions\"].properties[\"slow\"].schemas[1];
  function _v(name, value, depth, errors) {
    var varidations = [_r, _t], errorsOfMaxDepth = [], e = null, maxDepth = -1, d = 0, i = 0;
    for (i = 0; i < varidations.length; ++i) {
      e = varidations[i](name, value, depth, []);
      if (e.length === 0) {
        return errors;
      }
      d = e.reduce(_8, Number.MAX_SAFE_INTEGER)
      if (d > maxDepth) {
        errorsOfMaxDepth = [e]
        maxDepth = d;
      } else if (d === maxDepth) {
        errorsOfMaxDepth.push(e);
      }
    }
    if (errorsOfMaxDepth.length === 1) {
      errorsOfMaxDepth = errorsOfMaxDepth[0]
      for (d = 0; d < errorsOfMaxDepth.length; ++d) {
        errors.push(errorsOfMaxDepth[d])
      }
    } else if (errorsOfMaxDepth.length >= 2) {
      errors.push({ code: \"union\", args: { name: name, schemas: [_s, _u] }, depth: depth });
    }
    return errors;
  }
  function _w(name, value, depth, errors) {
    if (value !== \"bdd\" && value !== \"tdd\") {
      errors.push({ code: \"enum\", args: { name: name, values: [\"bdd\", \"tdd\"] }, depth: depth });
    }
    return errors;
  }
  function _x(name, value, depth, errors) {
    var remainKeys = null, i = 0, propValue = null;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    remainKeys = Object.keys(value);
    i = remainKeys.indexOf(\"allowUncaught\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"allowUncaught\"]
      if (propValue !== undefined) {
        _0(name + \".allowUncaught\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"asyncOnly\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"asyncOnly\"]
      if (propValue !== undefined) {
        _0(name + \".asyncOnly\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"bail\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"bail\"]
      if (propValue !== undefined) {
        _0(name + \".bail\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"checkLeaks\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"checkLeaks\"]
      if (propValue !== undefined) {
        _0(name + \".checkLeaks\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"color\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"color\"]
      if (propValue !== undefined) {
        _0(name + \".color\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"delay\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"delay\"]
      if (propValue !== undefined) {
        _0(name + \".delay\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"diff\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"diff\"]
      if (propValue !== undefined) {
        _0(name + \".diff\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"fgrep\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"fgrep\"]
      if (propValue !== undefined) {
        _2(name + \".fgrep\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"forbidOnly\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"forbidOnly\"]
      if (propValue !== undefined) {
        _0(name + \".forbidOnly\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"forbidPending\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"forbidPending\"]
      if (propValue !== undefined) {
        _0(name + \".forbidPending\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"fullTrace\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"fullTrace\"]
      if (propValue !== undefined) {
        _0(name + \".fullTrace\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"global\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"global\"]
      if (propValue !== undefined) {
        _b(name + \".global\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"grep\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"grep\"]
      if (propValue !== undefined) {
        _l(name + \".grep\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"growl\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"growl\"]
      if (propValue !== undefined) {
        _0(name + \".growl\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"inlineDiffs\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"inlineDiffs\"]
      if (propValue !== undefined) {
        _0(name + \".inlineDiffs\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"invert\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"invert\"]
      if (propValue !== undefined) {
        _0(name + \".invert\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"isWorker\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"isWorker\"]
      if (propValue !== undefined) {
        _n(name + \".isWorker\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"jobs\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"jobs\"]
      if (propValue !== undefined) {
        _n(name + \".jobs\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"noHighlighting\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"noHighlighting\"]
      if (propValue !== undefined) {
        _n(name + \".noHighlighting\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"parallel\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"parallel\"]
      if (propValue !== undefined) {
        _n(name + \".parallel\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"reporter\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"reporter\"]
      if (propValue !== undefined) {
        _q(name + \".reporter\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"reporterOptions\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"reporterOptions\"]
      if (propValue !== undefined) {
        _5(name + \".reporterOptions\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"retries\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"retries\"]
      if (propValue !== undefined) {
        _r(name + \".retries\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"rootHooks\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"rootHooks\"]
      if (propValue !== undefined) {
        _n(name + \".rootHooks\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"slow\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"slow\"]
      if (propValue !== undefined) {
        _v(name + \".slow\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"timeout\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"timeout\"]
      if (propValue !== undefined) {
        _v(name + \".timeout\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"ui\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"ui\"]
      if (propValue !== undefined) {
        _w(name + \".ui\", propValue, depth + 1, errors);
      }
    }
    if (remainKeys.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: remainKeys }, depth: depth });
    }
    return errors;
  }
  function _y(name, value, depth, errors) {
    if (!Array.isArray(value)) {
      errors.push({ code: \"array\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  function _z(name, value, depth, errors) {
    var remainKeys = null, i = 0, propValue = null;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    remainKeys = Object.keys(value);
    i = remainKeys.indexOf(\"rules\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"rules\"]
      if (propValue !== undefined) {
        _y(name + \".rules\", propValue, depth + 1, errors);
      }
    }
    if (remainKeys.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: remainKeys }, depth: depth });
    }
    return errors;
  }
  function _10(name, value, depth, errors) {
    var remainKeys = null, i = 0, propValue = null;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    remainKeys = Object.keys(value);
    i = remainKeys.indexOf(\"alias\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"alias\"]
      if (propValue !== undefined) {
        _5(name + \".alias\", propValue, depth + 1, errors);
      }
    }
    if (remainKeys.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: remainKeys }, depth: depth });
    }
    return errors;
  }
  function _11(name, value, depth, errors) {
    var remainKeys = null, i = 0, propValue = null;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    remainKeys = Object.keys(value);
    i = remainKeys.indexOf(\"amd\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"amd\"]
      if (propValue !== undefined) {
        _n(name + \".amd\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"bail\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"bail\"]
      if (propValue !== undefined) {
        _n(name + \".bail\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"cache\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"cache\"]
      if (propValue !== undefined) {
        _n(name + \".cache\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"context\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"context\"]
      if (propValue !== undefined) {
        _n(name + \".context\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"devServer\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"devServer\"]
      if (propValue !== undefined) {
        _n(name + \".devServer\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"devtool\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"devtool\"]
      if (propValue !== undefined) {
        _n(name + \".devtool\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"entry\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"entry\"]
      if (propValue !== undefined) {
        _n(name + \".entry\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"experiments\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"experiments\"]
      if (propValue !== undefined) {
        _n(name + \".experiments\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"externals\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"externals\"]
      if (propValue !== undefined) {
        _n(name + \".externals\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"externalsPresets\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"externalsPresets\"]
      if (propValue !== undefined) {
        _n(name + \".externalsPresets\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"externalsType\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"externalsType\"]
      if (propValue !== undefined) {
        _n(name + \".externalsType\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"ignoreWarnings\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"ignoreWarnings\"]
      if (propValue !== undefined) {
        _n(name + \".ignoreWarnings\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"infrastructureLogging\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"infrastructureLogging\"]
      if (propValue !== undefined) {
        _n(name + \".infrastructureLogging\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"loader\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"loader\"]
      if (propValue !== undefined) {
        _n(name + \".loader\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"mode\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"mode\"]
      if (propValue !== undefined) {
        _n(name + \".mode\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"module\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"module\"]
      if (propValue !== undefined) {
        _z(name + \".module\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"name\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"name\"]
      if (propValue !== undefined) {
        _n(name + \".name\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"node\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"node\"]
      if (propValue !== undefined) {
        _n(name + \".node\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"optimization\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"optimization\"]
      if (propValue !== undefined) {
        _n(name + \".optimization\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"output\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"output\"]
      if (propValue !== undefined) {
        _n(name + \".output\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"parallelism\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"parallelism\"]
      if (propValue !== undefined) {
        _n(name + \".parallelism\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"performance\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"performance\"]
      if (propValue !== undefined) {
        _n(name + \".performance\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"plugins\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"plugins\"]
      if (propValue !== undefined) {
        _y(name + \".plugins\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"profile\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"profile\"]
      if (propValue !== undefined) {
        _n(name + \".profile\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"recordsInputPath\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"recordsInputPath\"]
      if (propValue !== undefined) {
        _n(name + \".recordsInputPath\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"recordsOutputPath\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"recordsOutputPath\"]
      if (propValue !== undefined) {
        _n(name + \".recordsOutputPath\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"recordsPath\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"recordsPath\"]
      if (propValue !== undefined) {
        _n(name + \".recordsPath\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"resolve\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"resolve\"]
      if (propValue !== undefined) {
        _10(name + \".resolve\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"resolveLoader\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"resolveLoader\"]
      if (propValue !== undefined) {
        _n(name + \".resolveLoader\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"snapshot\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"snapshot\"]
      if (propValue !== undefined) {
        _n(name + \".snapshot\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"stats\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"stats\"]
      if (propValue !== undefined) {
        _n(name + \".stats\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"target\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"target\"]
      if (propValue !== undefined) {
        _n(name + \".target\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"watch\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"watch\"]
      if (propValue !== undefined) {
        _n(name + \".watch\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"watchOptions\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"watchOptions\"]
      if (propValue !== undefined) {
        _n(name + \".watchOptions\", propValue, depth + 1, errors);
      }
    }
    if (remainKeys.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: remainKeys }, depth: depth });
    }
    return errors;
  }
  var _12 = $schema.properties[\"webpackOptions\"].schemas[0];
  function _13(name, value, depth, errors) {
    var varidations = [_11, _o], errorsOfMaxDepth = [], e = null, maxDepth = -1, d = 0, i = 0;
    for (i = 0; i < varidations.length; ++i) {
      e = varidations[i](name, value, depth, []);
      if (e.length === 0) {
        return errors;
      }
      d = e.reduce(_8, Number.MAX_SAFE_INTEGER)
      if (d > maxDepth) {
        errorsOfMaxDepth = [e]
        maxDepth = d;
      } else if (d === maxDepth) {
        errorsOfMaxDepth.push(e);
      }
    }
    if (errorsOfMaxDepth.length === 1) {
      errorsOfMaxDepth = errorsOfMaxDepth[0]
      for (d = 0; d < errorsOfMaxDepth.length; ++d) {
        errors.push(errorsOfMaxDepth[d])
      }
    } else if (errorsOfMaxDepth.length >= 2) {
      errors.push({ code: \"union\", args: { name: name, schemas: [_12, _p] }, depth: depth });
    }
    return errors;
  }
  function _14(name, value, depth, errors) {
    var remainKeys = null, i = 0, propValue = null;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    remainKeys = Object.keys(value);
    i = remainKeys.indexOf(\"assertShim\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"assertShim\"]
      if (propValue !== undefined) {
        _0(name + \".assertShim\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"coverageOptions\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"coverageOptions\"]
      if (propValue !== undefined) {
        _c(name + \".coverageOptions\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"cwd\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"cwd\"]
      if (propValue !== undefined) {
        _e(name + \".cwd\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"debug\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"debug\"]
      if (propValue !== undefined) {
        _0(name + \".debug\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"environments\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"environments\"]
      if (propValue !== undefined) {
        _g(name + \".environments\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"mochaOptions\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"mochaOptions\"]
      if (propValue !== undefined) {
        _x(name + \".mochaOptions\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"sortTestFiles\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"sortTestFiles\"]
      if (propValue !== undefined) {
        _0(name + \".sortTestFiles\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"webpackOptions\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"webpackOptions\"]
      if (propValue !== undefined) {
        _13(name + \".webpackOptions\", propValue, depth + 1, errors);
      }
    }
    if (remainKeys.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: remainKeys }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _14(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.any() should have no validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.anyOf(schemas.number(), schemas.enum(\"auto\", \"none\")) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"number\" || Number.isNaN(value)) {
      errors.push({ code: \"number\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  var _1 = $schema.schemas[0];
  function _2(name, value, depth, errors) {
    if (value !== \"auto\" && value !== \"none\") {
      errors.push({ code: \"enum\", args: { name: name, values: [\"auto\", \"none\"] }, depth: depth });
    }
    return errors;
  }
  var _3 = $schema.schemas[1];
  function _4(minDepth, error) {
    return minDepth <= error.depth ? minDepth : error.depth;
  }
  function _5(name, value, depth, errors) {
    var varidations = [_0, _2], errorsOfMaxDepth = [], e = null, maxDepth = -1, d = 0, i = 0;
    for (i = 0; i < varidations.length; ++i) {
      e = varidations[i](name, value, depth, []);
      if (e.length === 0) {
        return errors;
      }
      d = e.reduce(_4, Number.MAX_SAFE_INTEGER)
      if (d > maxDepth) {
        errorsOfMaxDepth = [e]
        maxDepth = d;
      } else if (d === maxDepth) {
        errorsOfMaxDepth.push(e);
      }
    }
    if (errorsOfMaxDepth.length === 1) {
      errorsOfMaxDepth = errorsOfMaxDepth[0]
      for (d = 0; d < errorsOfMaxDepth.length; ++d) {
        errors.push(errorsOfMaxDepth[d])
      }
    } else if (errorsOfMaxDepth.length >= 2) {
      errors.push({ code: \"union\", args: { name: name, schemas: [_1, _3] }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _5(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.anyOf(schemas.number(), schemas.string()) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"number\" || Number.isNaN(value)) {
      errors.push({ code: \"number\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  var _1 = $schema.schemas[0];
  function _2(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  var _3 = $schema.schemas[1];
  function _4(minDepth, error) {
    return minDepth <= error.depth ? minDepth : error.depth;
  }
  function _5(name, value, depth, errors) {
    var varidations = [_0, _2], errorsOfMaxDepth = [], e = null, maxDepth = -1, d = 0, i = 0;
    for (i = 0; i < varidations.length; ++i) {
      e = varidations[i](name, value, depth, []);
      if (e.length === 0) {
        return errors;
      }
      d = e.reduce(_4, Number.MAX_SAFE_INTEGER)
      if (d > maxDepth) {
        errorsOfMaxDepth = [e]
        maxDepth = d;
      } else if (d === maxDepth) {
        errorsOfMaxDepth.push(e);
      }
    }
    if (errorsOfMaxDepth.length === 1) {
      errorsOfMaxDepth = errorsOfMaxDepth[0]
      for (d = 0; d < errorsOfMaxDepth.length; ++d) {
        errors.push(errorsOfMaxDepth[d])
      }
    } else if (errorsOfMaxDepth.length >= 2) {
      errors.push({ code: \"union\", args: { name: name, schemas: [_1, _3] }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _5(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.anyOf(schemas.number(), schemas.string(), schemas.object({ value: schemas.number() })) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"number\" || Number.isNaN(value)) {
      errors.push({ code: \"number\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  var _1 = $schema.schemas[0];
  function _2(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  var _3 = $schema.schemas[1];
  function _4(name, value, depth, errors) {
    var remainKeys = null, i = 0, missingKeys = null;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    remainKeys = Object.keys(value);
    missingKeys = [];
    i = remainKeys.indexOf(\"value\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      _0(name + \".value\", value[\"value\"], depth + 1, errors);
    } else {
      missingKeys.push(\"value\")
    }
    if (missingKeys.length > 0) {
      errors.push({ code: \"objectRequiredKeys\", args: { name: name, keys: missingKeys }, depth: depth });
    }
    if (remainKeys.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: remainKeys }, depth: depth });
    }
    return errors;
  }
  var _5 = $schema.schemas[2];
  function _6(minDepth, error) {
    return minDepth <= error.depth ? minDepth : error.depth;
  }
  function _7(name, value, depth, errors) {
    var varidations = [_0, _2, _4], errorsOfMaxDepth = [], e = null, maxDepth = -1, d = 0, i = 0;
    for (i = 0; i < varidations.length; ++i) {
      e = varidations[i](name, value, depth, []);
      if (e.length === 0) {
        return errors;
      }
      d = e.reduce(_6, Number.MAX_SAFE_INTEGER)
      if (d > maxDepth) {
        errorsOfMaxDepth = [e]
        maxDepth = d;
      } else if (d === maxDepth) {
        errorsOfMaxDepth.push(e);
      }
    }
    if (errorsOfMaxDepth.length === 1) {
      errorsOfMaxDepth = errorsOfMaxDepth[0]
      for (d = 0; d < errorsOfMaxDepth.length; ++d) {
        errors.push(errorsOfMaxDepth[d])
      }
    } else if (errorsOfMaxDepth.length >= 2) {
      errors.push({ code: \"union\", args: { name: name, schemas: [_1, _3, _5] }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _7(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.array() should have no validation for elements #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (!Array.isArray(value)) {
      errors.push({ code: \"array\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.array(schemas.any(), { maxLength: 2 }) should have validation for maxLength #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    var length = 0;
    if (!Array.isArray(value)) {
      errors.push({ code: \"array\", args: { name: name }, depth: depth });
      return errors;
    }
    length = value.length;
    if (length > 2) {
      errors.push({ code: \"arrayMaxLength\", args: { name: name, maxLength: 2 }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.array(schemas.any(), { minLength: 2 }) should have validation for minLength #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    var length = 0;
    if (!Array.isArray(value)) {
      errors.push({ code: \"array\", args: { name: name }, depth: depth });
      return errors;
    }
    length = value.length;
    if (length < 2) {
      errors.push({ code: \"arrayMinLength\", args: { name: name, minLength: 2 }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.array(schemas.any(), { unique: true }) should have validation for unique #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(xs, length) {
    var i = 0, j = 0, x = null;
    for (i = 1; i < length; ++i) {
      x = xs[i];
      for (j = 0; j < i; ++j) {
        if (x === xs[j]) {
          return false;
        }
      }
    }
    return true;
  }
  function _1(name, value, depth, errors) {
    var length = 0;
    if (!Array.isArray(value)) {
      errors.push({ code: \"array\", args: { name: name }, depth: depth });
      return errors;
    }
    length = value.length;
    if (!_0(value, length)) {
      errors.push({ code: \"arrayUnique\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _1(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.array(schemas.string()) should have validation for elements #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  function _1(name, value, depth, errors) {
    var length = 0, i = 0;
    if (!Array.isArray(value)) {
      errors.push({ code: \"array\", args: { name: name }, depth: depth });
      return errors;
    }
    length = value.length;
    for (i = 0; i < length; ++i) {
      _0(name + \"[\" + i + \"]\", value[i], depth + 1, errors);
    }
    return errors;
  }
  return function validate(name, value) {
    return _1(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.array(schemas.string(), { maxLength: 2, minLength: 1, unique: true }) should have validation for all options #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(xs, length) {
    var i = 0, j = 0, x = null;
    for (i = 1; i < length; ++i) {
      x = xs[i];
      for (j = 0; j < i; ++j) {
        if (x === xs[j]) {
          return false;
        }
      }
    }
    return true;
  }
  function _1(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  function _2(name, value, depth, errors) {
    var length = 0, i = 0;
    if (!Array.isArray(value)) {
      errors.push({ code: \"array\", args: { name: name }, depth: depth });
      return errors;
    }
    length = value.length;
    if (length > 2) {
      errors.push({ code: \"arrayMaxLength\", args: { name: name, maxLength: 2 }, depth: depth });
    }
    if (length < 1) {
      errors.push({ code: \"arrayMinLength\", args: { name: name, minLength: 1 }, depth: depth });
    }
    if (!_0(value, length)) {
      errors.push({ code: \"arrayUnique\", args: { name: name }, depth: depth });
    }
    for (i = 0; i < length; ++i) {
      _1(name + \"[\" + i + \"]\", value[i], depth + 1, errors);
    }
    return errors;
  }
  return function validate(name, value) {
    return _2(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.bigInt() should have no validation for min/max #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"bigint\") {
      errors.push({ code: \"bigint\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.bigInt({ maxValue: 1n }) should have validation for maxValue #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"bigint\") {
      errors.push({ code: \"bigint\", args: { name: name }, depth: depth });
      return errors;
    }
    if (value > 1n) {
      errors.push({ code: \"bigintMaxValue\", args: { name: name, maxValue: 1n }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.bigInt({ maxValue: 1n, minValue: 0n }) should have validation for min/max #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"bigint\") {
      errors.push({ code: \"bigint\", args: { name: name }, depth: depth });
      return errors;
    }
    if (value > 1n) {
      errors.push({ code: \"bigintMaxValue\", args: { name: name, maxValue: 1n }, depth: depth });
    }
    if (value < 0n) {
      errors.push({ code: \"bigintMinValue\", args: { name: name, minValue: 0n }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.bigInt({ minValue: 1n }) should have validation for minValue #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"bigint\") {
      errors.push({ code: \"bigint\", args: { name: name }, depth: depth });
      return errors;
    }
    if (value < 1n) {
      errors.push({ code: \"bigintMinValue\", args: { name: name, minValue: 1n }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.boolean() should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"boolean\") {
      errors.push({ code: \"boolean\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.custom(\"an absolute path\", (x: unknown): x is string => ...) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  var _0 = $schema.check;
  function _1(name, value, depth, errors) {
    if (!_0(value)) {
      errors.push({ code: \"custom\", args: { name: name, checkFunc: _0, checkName: \"an absolute path\" }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _1(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.enum(1n, true, 0, null, \"foo\", undefined) should have validation; it uses symbol equality comparison #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (value !== 1n && value !== true && value !== 0 && value !== null && value !== \"foo\" && value !== undefined) {
      errors.push({ code: \"enum\", args: { name: name, values: [1n, true, 0, null, \"foo\", undefined] }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.enum(Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY) should have validation; it can handle NaN correctly #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (!Number.isNaN(value) && value !== Number.POSITIVE_INFINITY && value !== Number.NEGATIVE_INFINITY) {
      errors.push({ code: \"enum\", args: { name: name, values: [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY] }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.enum(Symbol.iterator) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  var _0 = $schema.values[0];
  function _1(name, value, depth, errors) {
    if (value !== _0) {
      errors.push({ code: \"enum\", args: { name: name, values: [_0] }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _1(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.enum(myObj, Number.NaN) should have validation; it can handle NaN correctly, along with reference values. #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  var _0 = $schema.values[0];
  function _1(name, value, depth, errors) {
    if (value !== _0 && !Number.isNaN(value)) {
      errors.push({ code: \"enum\", args: { name: name, values: [_0, Number.NaN] }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _1(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.enum(myObj, mySymbol, myFunc) should have validation; give 'values' as an argument because it contains references. #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  var _0 = $schema.values[0];
  var _1 = $schema.values[1];
  var _2 = $schema.values[2];
  function _3(name, value, depth, errors) {
    if (value !== _0 && value !== _1 && value !== _2) {
      errors.push({ code: \"enum\", args: { name: name, values: [_0, _1, _2] }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _3(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.enum(null) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (value !== null) {
      errors.push({ code: \"enum\", args: { name: name, values: [null] }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.function() should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"function\") {
      errors.push({ code: \"function\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.instanceOf(RegExp) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  var _0 = $schema.constructor;
  function _1(name, value, depth, errors) {
    if (!(value instanceof _0)) {
      errors.push({ code: \"class\", args: { name: name, constructor: _0 }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _1(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.number() should have no validation for min/max #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"number\" || Number.isNaN(value)) {
      errors.push({ code: \"number\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.number({ allowNaN: true }) should have not validation for NaN #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"number\") {
      errors.push({ code: \"number\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.number({ allowNaN: true, finiteOnly: true }) should allow NaN #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (!Number.isFinite(value) && !Number.isNaN(value)) {
      errors.push({ code: \"numberFiniteOnly\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.number({ allowNaN: true, intOnly: true }) should allow NaN #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (!Number.isInteger(value) && !Number.isNaN(value)) {
      errors.push({ code: \"numberIntOnly\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.number({ finiteOnly: true }) should have validation, but not have for min/max #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (!Number.isFinite(value)) {
      errors.push({ code: \"numberFiniteOnly\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.number({ intOnly: true }) should have validation, but not have for min/max #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (!Number.isInteger(value)) {
      errors.push({ code: \"numberIntOnly\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.number({ maxValue: 1 }) should have validation for maxValue #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"number\" || Number.isNaN(value)) {
      errors.push({ code: \"number\", args: { name: name }, depth: depth });
      return errors;
    }
    if (value > 1) {
      errors.push({ code: \"numberMaxValue\", args: { name: name, maxValue: 1 }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.number({ maxValue: 1, minValue: 0 }) should have validation for min/max #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"number\" || Number.isNaN(value)) {
      errors.push({ code: \"number\", args: { name: name }, depth: depth });
      return errors;
    }
    if (value > 1) {
      errors.push({ code: \"numberMaxValue\", args: { name: name, maxValue: 1 }, depth: depth });
    }
    if (value < 0) {
      errors.push({ code: \"numberMinValue\", args: { name: name, minValue: 0 }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.number({ minValue: 1 }) should have validation for minValue #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"number\" || Number.isNaN(value)) {
      errors.push({ code: \"number\", args: { name: name }, depth: depth });
      return errors;
    }
    if (value < 1) {
      errors.push({ code: \"numberMinValue\", args: { name: name, minValue: 1 }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.object() should have no validation for properties #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.object({ one: schemas.any(), two: schemas.any() }) should have validation, but not have validations for property values #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    var remainKeys = null, i = 0, missingKeys = null;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    remainKeys = Object.keys(value);
    missingKeys = [];
    i = remainKeys.indexOf(\"one\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
    } else {
      missingKeys.push(\"one\")
    }
    i = remainKeys.indexOf(\"two\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
    } else {
      missingKeys.push(\"two\")
    }
    if (missingKeys.length > 0) {
      errors.push({ code: \"objectRequiredKeys\", args: { name: name, keys: missingKeys }, depth: depth });
    }
    if (remainKeys.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: remainKeys }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.object({ one: schemas.string(), two: schemas.string() }) should have validation for property values #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  function _1(name, value, depth, errors) {
    var remainKeys = null, i = 0, missingKeys = null;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    remainKeys = Object.keys(value);
    missingKeys = [];
    i = remainKeys.indexOf(\"one\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      _0(name + \".one\", value[\"one\"], depth + 1, errors);
    } else {
      missingKeys.push(\"one\")
    }
    i = remainKeys.indexOf(\"two\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      _0(name + \".two\", value[\"two\"], depth + 1, errors);
    } else {
      missingKeys.push(\"two\")
    }
    if (missingKeys.length > 0) {
      errors.push({ code: \"objectRequiredKeys\", args: { name: name, keys: missingKeys }, depth: depth });
    }
    if (remainKeys.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: remainKeys }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _1(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.object({}) should have validation, only for unknown properties #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    var remainKeys = null;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    remainKeys = Object.keys(value);
    if (remainKeys.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: remainKeys }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.partialObject({ include: schemas.anyOf(schemas.string(), schemas.array(schemas.string())), exclude: schemas.anyOf(schemas.string(), schemas.array(schemas.string())) }) should have good validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  var _1 = $schema.properties[\"exclude\"].schemas[0];
  function _2(name, value, depth, errors) {
    var length = 0, i = 0;
    if (!Array.isArray(value)) {
      errors.push({ code: \"array\", args: { name: name }, depth: depth });
      return errors;
    }
    length = value.length;
    for (i = 0; i < length; ++i) {
      _0(name + \"[\" + i + \"]\", value[i], depth + 1, errors);
    }
    return errors;
  }
  var _3 = $schema.properties[\"exclude\"].schemas[1];
  function _4(minDepth, error) {
    return minDepth <= error.depth ? minDepth : error.depth;
  }
  function _5(name, value, depth, errors) {
    var varidations = [_0, _2], errorsOfMaxDepth = [], e = null, maxDepth = -1, d = 0, i = 0;
    for (i = 0; i < varidations.length; ++i) {
      e = varidations[i](name, value, depth, []);
      if (e.length === 0) {
        return errors;
      }
      d = e.reduce(_4, Number.MAX_SAFE_INTEGER)
      if (d > maxDepth) {
        errorsOfMaxDepth = [e]
        maxDepth = d;
      } else if (d === maxDepth) {
        errorsOfMaxDepth.push(e);
      }
    }
    if (errorsOfMaxDepth.length === 1) {
      errorsOfMaxDepth = errorsOfMaxDepth[0]
      for (d = 0; d < errorsOfMaxDepth.length; ++d) {
        errors.push(errorsOfMaxDepth[d])
      }
    } else if (errorsOfMaxDepth.length >= 2) {
      errors.push({ code: \"union\", args: { name: name, schemas: [_1, _3] }, depth: depth });
    }
    return errors;
  }
  function _6(name, value, depth, errors) {
    var remainKeys = null, i = 0, propValue = null;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    remainKeys = Object.keys(value);
    i = remainKeys.indexOf(\"exclude\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"exclude\"]
      if (propValue !== undefined) {
        _5(name + \".exclude\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"include\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"include\"]
      if (propValue !== undefined) {
        _5(name + \".include\", propValue, depth + 1, errors);
      }
    }
    if (remainKeys.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: remainKeys }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _6(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.partialObject({ one: schemas.any(), two: schemas.any() }) should have validation, but not have validations for property values #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    var remainKeys = null, i = 0, propValue = null;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    remainKeys = Object.keys(value);
    i = remainKeys.indexOf(\"one\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
    }
    i = remainKeys.indexOf(\"two\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
    }
    if (remainKeys.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: remainKeys }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.partialObject({ one: schemas.string(), two: schemas.string() }) should have validation for property values #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  function _1(name, value, depth, errors) {
    var remainKeys = null, i = 0, propValue = null;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    remainKeys = Object.keys(value);
    i = remainKeys.indexOf(\"one\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"one\"]
      if (propValue !== undefined) {
        _0(name + \".one\", propValue, depth + 1, errors);
      }
    }
    i = remainKeys.indexOf(\"two\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"two\"]
      if (propValue !== undefined) {
        _0(name + \".two\", propValue, depth + 1, errors);
      }
    }
    if (remainKeys.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: remainKeys }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _1(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.partialObject({ one: schemas.string(), two: schemas.string() }, [\"one\"]) should have validation for property values #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  function _1(name, value, depth, errors) {
    var remainKeys = null, i = 0, missingKeys = null, propValue = null;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    remainKeys = Object.keys(value);
    missingKeys = [];
    i = remainKeys.indexOf(\"one\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      _0(name + \".one\", value[\"one\"], depth + 1, errors);
    } else {
      missingKeys.push(\"one\")
    }
    i = remainKeys.indexOf(\"two\");
    if (i !== -1) {
      remainKeys.splice(i, 1);
      propValue = value[\"two\"]
      if (propValue !== undefined) {
        _0(name + \".two\", propValue, depth + 1, errors);
      }
    }
    if (missingKeys.length > 0) {
      errors.push({ code: \"objectRequiredKeys\", args: { name: name, keys: missingKeys }, depth: depth });
    }
    if (remainKeys.length > 0) {
      errors.push({ code: \"objectUnknownKeys\", args: { name: name, keys: remainKeys }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _1(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.record() should have no validation for properties #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.record(schemas.string()) should have validation for elements #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  function _1(name, value, depth, errors) {
    var keys = null, key = \"\", i = 0;
    if (typeof value !== \"object\" || value === null) {
      errors.push({ code: \"object\", args: { name: name }, depth: depth });
      return errors;
    }
    keys = Object.keys(value);
    for (i = 0; i < keys.length; ++i) {
      key = keys[i]
      _0(name + \".\" + key, value[key], depth + 1, errors);
    }
    return errors;
  }
  return function validate(name, value) {
    return _1(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.string() should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.string({ maxLength: 2 }) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(str, end) {
    var count = 0, code = 0, i = 0, length = str.length;
    while (i < length) {
      count += 1;
      if (count >= end) {
        return count;
      }
      i += (code = str.charCodeAt(i)) >= 0xd800 && code <= 0xdbff ? 2 : 1;
    }
    return count
  }
  function _1(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
      return errors;
    }
    if (_0(value, 3) > 2) {
      errors.push({ code: \"stringMaxLength\", args: { name: name, maxLength: 2 }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _1(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.string({ maxLength: 2, minLength: 1 }) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(str, end) {
    var count = 0, code = 0, i = 0, length = str.length;
    while (i < length) {
      count += 1;
      if (count >= end) {
        return count;
      }
      i += (code = str.charCodeAt(i)) >= 0xd800 && code <= 0xdbff ? 2 : 1;
    }
    return count
  }
  function _1(name, value, depth, errors) {
    var count = 0;
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
      return errors;
    }
    count = _0(value, 3);
    if (count > 2) {
      errors.push({ code: \"stringMaxLength\", args: { name: name, maxLength: 2 }, depth: depth });
    }
    if (count < 1) {
      errors.push({ code: \"stringMinLength\", args: { name: name, minLength: 1 }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _1(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.string({ minLength: 2 }) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(str, end) {
    var count = 0, code = 0, i = 0, length = str.length;
    while (i < length) {
      count += 1;
      if (count >= end) {
        return count;
      }
      i += (code = str.charCodeAt(i)) >= 0xd800 && code <= 0xdbff ? 2 : 1;
    }
    return count
  }
  function _1(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
      return errors;
    }
    if (_0(value, 2) < 2) {
      errors.push({ code: \"stringMinLength\", args: { name: name, minLength: 2 }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _1(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.string({ pattern: /^\\d+$/ }) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
      return errors;
    }
    if (!/^\\d+$/.test(value)) {
      errors.push({ code: \"stringPattern\", args: { name: name, pattern: /^\\d+$/ }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.symbol() should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"symbol\") {
      errors.push({ code: \"symbol\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.tuple() should have no validation for elements #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (!Array.isArray(value)) {
      errors.push({ code: \"tuple\", args: { name: name }, depth: depth });
      return errors;
    }
    if (value.length !== 0) {
      errors.push({ code: \"tupleLength\", args: { name: name, length: 0 }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.tuple(schemas.any()) should have no validation for elements #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (!Array.isArray(value)) {
      errors.push({ code: \"tuple\", args: { name: name }, depth: depth });
      return errors;
    }
    if (value.length !== 1) {
      errors.push({ code: \"tupleLength\", args: { name: name, length: 1 }, depth: depth });
    }
    return errors;
  }
  return function validate(name, value) {
    return _0(name, value, 0, [])
  };
})({});"
`.slice(1, -1)
exports["schemas.tuple(schemas.string(), schemas.string()) should have validation #[0]"] = String.raw`
"var validate = (function($schema) {
  \"use strict\";
  function _0(name, value, depth, errors) {
    if (typeof value !== \"string\") {
      errors.push({ code: \"string\", args: { name: name }, depth: depth });
    }
    return errors;
  }
  function _1(name, value, depth, errors) {
    if (!Array.isArray(value)) {
      errors.push({ code: \"tuple\", args: { name: name }, depth: depth });
      return errors;
    }
    if (value.length !== 2) {
      errors.push({ code: \"tupleLength\", args: { name: name, length: 2 }, depth: depth });
    }
    _0(name + \"[0]\", value[0], depth + 1, errors);
    _0(name + \"[1]\", value[1], depth + 1, errors);
    return errors;
  }
  return function validate(name, value) {
    return _1(name, value, 0, [])
  };
})({});"
`.slice(1, -1)