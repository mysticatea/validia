import 'core-js/modules/es.array.concat.js';
import 'core-js/modules/es.array.from.js';
import 'core-js/modules/es.array.includes.js';
import 'core-js/modules/es.array.index-of.js';
import 'core-js/modules/es.array.iterator.js';
import 'core-js/modules/es.array.join.js';
import 'core-js/modules/es.array.map.js';
import 'core-js/modules/es.array.slice.js';
import 'core-js/modules/es.array.splice.js';
import 'core-js/modules/es.function.name.js';
import 'core-js/modules/es.map.js';
import 'core-js/modules/es.number.constructor.js';
import 'core-js/modules/es.number.is-nan.js';
import 'core-js/modules/es.object.freeze.js';
import 'core-js/modules/es.object.keys.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.regexp.to-string.js';
import 'core-js/modules/es.set.js';
import 'core-js/modules/es.string.iterator.js';
import 'core-js/modules/es.string.split.js';
import 'core-js/modules/es.string.trim.js';
import 'core-js/modules/es.weak-map.js';
import 'core-js/modules/web.dom-collections.iterator.js';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/esm/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/esm/getPrototypeOf';
import _wrapNativeSuper from '@babel/runtime/helpers/esm/wrapNativeSuper';
import _typeof from '@babel/runtime/helpers/esm/typeof';
import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import 'regenerator-runtime/runtime.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function addValidationOfAnySchema(ctx, _schemaKey, _schema) {
  return ctx.addValidation(function (_locals, _name, _value, _depth, errors) {
    return "return ".concat(errors, ";");
  });
}

var MaxInt8 = 127;
var MaxInt16 = 32767;
var MaxInt32 = 2147483647;
var MaxInt64 = BigInt("9223372036854775807");
var MaxUint8 = 255;
var MaxUint16 = 65535;
var MaxUint32 = 4294967295;
var MaxUint64 = BigInt("18446744073709551615");
var MinInt8 = -128;
var MinInt16 = -32768;
var MinInt32 = -2147483648;
var MinInt64 = BigInt("-9223372036854775808");
var MaxArrayLength = MaxUint32;
var MaxStringLength = 9007199254740991;

function addValidationOfArraySchema(ctx, schemaKey, _ref) {
  var elements = _ref.elements,
      _ref$maxLength = _ref.maxLength,
      maxLength = _ref$maxLength === void 0 ? MaxArrayLength : _ref$maxLength,
      _ref$minLength = _ref.minLength,
      minLength = _ref$minLength === void 0 ? 0 : _ref$minLength,
      _ref$unique = _ref.unique,
      unique = _ref$unique === void 0 ? false : _ref$unique;
  return ctx.addValidation( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(locals, name, value, depth, errors) {
    var shouldCheckElements, length, isUnique, _validate, i;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            shouldCheckElements = elements.type !== "any" || maxLength < MaxArrayLength || minLength > 0 || unique;
            _context.next = 3;
            return "\n            if (!Array.isArray(".concat(value, ")) {\n                ").concat(errors, ".push({ code: \"array\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n        ");

          case 3:
            if (shouldCheckElements) {
              _context.next = 8;
              break;
            }

            _context.next = 6;
            return "}";

          case 6:
            _context.next = 26;
            break;

          case 8:
            length = locals.add("0");
            _context.next = 11;
            return "\n                    return ".concat(errors, ";\n                }\n                ").concat(length, " = ").concat(value, ".length;\n            ");

          case 11:
            if (!(maxLength < MaxArrayLength)) {
              _context.next = 14;
              break;
            }

            _context.next = 14;
            return "\n                    if (".concat(length, " > ").concat(maxLength, ") {\n                        ").concat(errors, ".push({ code: \"arrayMaxLength\", args: { name: ").concat(name, ", maxLength: ").concat(maxLength, " }, depth: ").concat(depth, " });\n                    }\n                ");

          case 14:
            if (!(minLength > 0)) {
              _context.next = 17;
              break;
            }

            _context.next = 17;
            return "\n                    if (".concat(length, " < ").concat(minLength, ") {\n                        ").concat(errors, ".push({ code: \"arrayMinLength\", args: { name: ").concat(name, ", minLength: ").concat(minLength, " }, depth: ").concat(depth, " });\n                    }\n                ");

          case 17:
            if (!unique) {
              _context.next = 21;
              break;
            }

            isUnique = addIsUnique(ctx);
            _context.next = 21;
            return "\n                    if (!".concat(isUnique, "(").concat(value, ", ").concat(length, ")) {\n                        ").concat(errors, ".push({ code: \"arrayUnique\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n                    }\n                ");

          case 21:
            if (!(elements.type !== "any")) {
              _context.next = 26;
              break;
            }

            _validate = addValidation(ctx, "".concat(schemaKey, ".elements"), elements);
            i = locals.add("0");
            _context.next = 26;
            return "\n                    for (".concat(i, " = 0; ").concat(i, " < ").concat(length, "; ++").concat(i, ") {\n                        ").concat(_validate, "(").concat(name, " + \"[\" + ").concat(i, " + \"]\", ").concat(value, "[").concat(i, "], ").concat(depth, " + 1, ").concat(errors, ");\n                    }\n                ");

          case 26:
            _context.next = 28;
            return "return ".concat(errors, ";");

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}

function addIsUnique(ctx) {
  return ctx.addFunction(function (locals, xs, length) {
    var i = locals.add("0");
    var j = locals.add("0");
    var x = locals.add("null");
    return "\n            for (; ".concat(i, " < ").concat(length, "; ++").concat(i, ") {\n                ").concat(x, " = ").concat(xs, "[").concat(i, "];\n                for (").concat(j, " = 0; ").concat(j, " < ").concat(i, "; ++").concat(j, ") {\n                    if (").concat(x, " === ").concat(xs, "[").concat(j, "]) {\n                        return false;\n                    }\n                }\n            }\n            return true;\n        ");
  });
}

function addValidationOfBigIntSchema(ctx, _schemaKey, _ref2) {
  var maxValue = _ref2.maxValue,
      minValue = _ref2.minValue;
  return ctx.addValidation( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(_locals, name, value, depth, errors) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return "\n            if (typeof ".concat(value, " !== \"bigint\") {\n                ").concat(errors, ".push({ code: \"bigint\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n        ");

          case 2:
            if (!(maxValue === undefined && minValue === undefined)) {
              _context2.next = 7;
              break;
            }

            _context2.next = 5;
            return "}";

          case 5:
            _context2.next = 17;
            break;

          case 7:
            _context2.next = 9;
            return "\n                    return ".concat(errors, ";\n                }\n            ");

          case 9:
            if (!(maxValue !== undefined)) {
              _context2.next = 14;
              break;
            }

            if (!(minValue !== undefined && minValue > maxValue)) {
              _context2.next = 12;
              break;
            }

            throw new Error('"maxValue" must be "minValue" or greater than it.');

          case 12:
            _context2.next = 14;
            return "\n                    if (".concat(value, " > ").concat(maxValue, "n) {\n                        ").concat(errors, ".push({ code: \"bigintMaxValue\", args: { name: ").concat(name, ", maxValue: ").concat(maxValue, "n }, depth: ").concat(depth, " });\n                    }\n                ");

          case 14:
            if (!(minValue !== undefined)) {
              _context2.next = 17;
              break;
            }

            _context2.next = 17;
            return "\n                    if (".concat(value, " < ").concat(minValue, "n) {\n                        ").concat(errors, ".push({ code: \"bigintMinValue\", args: { name: ").concat(name, ", minValue: ").concat(minValue, "n }, depth: ").concat(depth, " });\n                    }\n                ");

          case 17:
            _context2.next = 19;
            return "return ".concat(errors, ";");

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
}

function addValidationOfBooleanSchema(ctx, _schemaKey, _schema) {
  return ctx.addValidation(function (_locals, name, value, depth, errors) {
    return "\n            if (typeof ".concat(value, " !== \"boolean\") {\n                ").concat(errors, ".push({ code: \"boolean\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n            }\n            return ").concat(errors, ";\n        ");
  });
}

function addValidationOfClassSchema(ctx, schemaKey, schema) {
  return ctx.addValidation(function (_locals, name, value, depth, errors) {
    // eslint-disable-next-line no-shadow
    var constructor = ctx.addConstant("".concat(schemaKey, ".constructor"), schema.constructor);
    return "\n            if (!(".concat(value, " instanceof ").concat(constructor, ")) {\n                ").concat(errors, ".push({ code: \"class\", args: { name: ").concat(name, ", constructor: ").concat(constructor, " }, depth: ").concat(depth, " });\n            }\n            return ").concat(errors, ";\n        ");
  });
}

var BuildContext = /*#__PURE__*/function () {
  function BuildContext() {
    _classCallCheck(this, BuildContext);

    this.constants = [];
    this.functionMap = new Map();
    this.flyweightMap = new Map();
    this.code = ['"use strict";'];
    this.indent = 0;
  }

  _createClass(BuildContext, [{
    key: "addValidation",
    value: function addValidation(createBody) {
      return this.addFunction(createBody);
    }
  }, {
    key: "addFunction",
    value: function addFunction(createBody) {
      var numArgs = Math.max(0, createBody.length - 1);
      var locals = new Locals();
      var params = Array.from({
        length: numArgs
      }, function () {
        return locals.addArgs();
      });
      var bodyGen = createBody.apply(void 0, [locals].concat(_toConsumableArray(params)));
      var body = typeof bodyGen === "string" ? bodyGen : _toConsumableArray(bodyGen).join("\n");
      var code = locals.getVariableDeclaration() + body;
      var id = this.functionMap.get(code);

      if (id === undefined) {
        id = constantId(this.constants.length);
        this.constants.push({});
        this.addCodeFragment("function ".concat(id, "(").concat(params.join(", "), ") {"));
        this.addCodeFragment(code);
        this.addCodeFragment("}");
        this.functionMap.set(code, id);
      }

      return id;
    }
  }, {
    key: "addCodeFragment",
    value: function addCodeFragment(code) {
      var _iterator = _createForOfIteratorHelper(code.split("\n")),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line0 = _step.value;
          var line = line0.trim();

          if (line.length === 0) {
            continue;
          } // eslint-disable-next-line multiline-comment-style
          // #IF PROD


          this.code.push(line); // */

          /* #IF !PROD
          if (line.startsWith("}")) {
              this.indent -= 2;
          }
          this.code.push(" ".repeat(this.indent) + line);
          if (line.endsWith("{")) {
              this.indent += 2;
          }
          // */
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "mapSchema",
    value: function mapSchema(validationId, schemaKey) {
      var ref = this.flyweightMap.get(validationId);

      if (!ref) {
        ref = {};
        this.flyweightMap.set(validationId, ref);
      }

      return this.addConstant(schemaKey, ref);
    }
  }, {
    key: "addConstant",
    value: function addConstant(valueExpr, valueRef) {
      var i = this.constants.indexOf(valueRef);

      if (i !== -1) {
        return constantId(i);
      }

      var id = constantId(this.constants.length);
      this.addCodeFragment("var ".concat(id, " = ").concat(valueExpr, ";"));
      this.constants.push(valueRef);
      return id;
    }
  }, {
    key: "build",
    value: function build(schema, validationId) {
      this.addCodeFragment("\n            return function validate(name, value) {\n                return ".concat(validationId, "(name, value, 0, []);\n            };\n        "));
      var code = this.code.join("\n");
      var func = new Function("$schema", code)(schema);
      /* #IF !PROD
      func.toString = () => {
          const bodyStr = code
              .split("\n")
              .map(line => `  ${line}`)
              .join("\n");
          return `var validate = (function($schema) {\n${bodyStr}\n})({});`;
      };
      // */

      return func;
    }
  }]);

  return BuildContext;
}();

var Chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

var Locals = /*#__PURE__*/function () {
  function Locals() {
    _classCallCheck(this, Locals);

    this.numArgs = 0;
    this.localInits = [];
  }

  _createClass(Locals, [{
    key: "addArgs",
    value: function addArgs() {
      return localId(this.numArgs++);
    }
  }, {
    key: "add",
    value: function add(initExpr) {
      var id = localId(this.numArgs + this.localInits.length);
      this.localInits.push("".concat(id, " = ").concat(initExpr));
      return id;
    }
  }, {
    key: "getVariableDeclaration",
    value: function getVariableDeclaration() {
      if (this.localInits.length > 0) {
        return "var ".concat(this.localInits.join(", "), ";\n");
      }

      return "";
    }
  }]);

  return Locals;
}();

function constantId(i) {
  return "_".concat(i.toString(36));
}

function localId(i) {
  if (i >= Chars.length) {
    throw new Error("Too many locals");
  }

  return Chars[i];
}

function addValidationOfCustomSchema(ctx, schemaKey, schema) {
  return ctx.addValidation(function (_locals, name, value, depth, errors) {
    var checkName = JSON.stringify(schema.name);
    var checkFunc = ctx.addConstant("".concat(schemaKey, ".check"), schema.check);
    return "\n            if (!".concat(checkFunc, "(").concat(value, ")) {\n                ").concat(errors, ".push({ code: \"custom\", args: { name: ").concat(name, ", checkFunc: ").concat(checkFunc, ", checkName: ").concat(checkName, " }, depth: ").concat(depth, " });\n            }\n            return ").concat(errors, ";\n        ");
  });
}

function addValidationOfEnumSchema(ctx, schemaKey, _ref3) {
  var values = _ref3.values;

  if (values.length === 0) {
    throw new Error("EnumSchema must have 1 or more values.");
  }

  return ctx.addValidation(function (_locals, name, value, depth, errors) {
    var valueStrs = values.map(valueToString(ctx, schemaKey));
    var conditionStr = valueStrs.map(stringToCondition(value)).join(" && ");
    var optionsStr = valueStrs.join(", ");
    return "\n            if (".concat(conditionStr, ") {\n                ").concat(errors, ".push({ code: \"enum\", args: { name: ").concat(name, ", values: [").concat(optionsStr, "] }, depth: ").concat(depth, " });\n            }\n            return ").concat(errors, ";\n        ");
  });
}

function valueToString(ctx, key) {
  return function (value, i) {
    switch (_typeof(value)) {
      case "bigint":
        return "".concat(value, "n");

      case "boolean":
        return String(value);

      case "function":
      case "symbol":
        return ctx.addConstant("".concat(key, ".values[").concat(i, "]"), value);

      case "number":
        return Number.isNaN(value) ? "Number.NaN" : value === Number.POSITIVE_INFINITY ? "Number.POSITIVE_INFINITY" : value === Number.NEGATIVE_INFINITY ? "Number.NEGATIVE_INFINITY" : String(value);

      case "object":
        return value === null ? "null" : ctx.addConstant("".concat(key, ".values[").concat(i, "]"), value);

      case "string":
        return JSON.stringify(value);

      case "undefined":
        return "undefined";
      //istanbul ignore next

      default:
        throw new Error("Unknown type: ".concat(_typeof(value)));
    }
  };
}

function stringToCondition(value) {
  return function (criteria) {
    return criteria === "Number.NaN" ? "!Number.isNaN(".concat(value, ")") : "".concat(value, " !== ").concat(criteria);
  };
}

function addValidationOfFunctionSchema(ctx, _schemaKey, _schema) {
  return ctx.addValidation(function (_locals, name, value, depth, errors) {
    return "\n            if (typeof ".concat(value, " !== \"function\") {\n                ").concat(errors, ".push({ code: \"function\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n            }\n            return ").concat(errors, ";\n        ");
  });
}

function addValidationOfNumberSchema(ctx, _schemaKey, _ref4) {
  var _ref4$allowInfinity = _ref4.allowInfinity,
      allowInfinity = _ref4$allowInfinity === void 0 ? false : _ref4$allowInfinity,
      _ref4$allowNaN = _ref4.allowNaN,
      allowNaN = _ref4$allowNaN === void 0 ? false : _ref4$allowNaN,
      _ref4$intOnly = _ref4.intOnly,
      intOnly = _ref4$intOnly === void 0 ? false : _ref4$intOnly,
      maxValue = _ref4.maxValue,
      minValue = _ref4.minValue;
  return ctx.addValidation( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(_locals, name, value, depth, errors) {
    var checker, code;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            checker = intOnly ? "isInteger" : "isFinite";
            code = intOnly ? "numberIntOnly" : "number";
            _context3.next = 4;
            return "\n            if (!Number.".concat(checker, "(").concat(value, ")) {\n                if (").concat(value, " === Number.POSITIVE_INFINITY || ").concat(value, " === Number.NEGATIVE_INFINITY) {\n        ");

          case 4:
            if (allowInfinity) {
              _context3.next = 7;
              break;
            }

            _context3.next = 7;
            return "".concat(errors, ".push({ code: \"numberDisallowInfinity\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });");

          case 7:
            _context3.next = 9;
            return "} else if (Number.isNaN(".concat(value, ")) {");

          case 9:
            if (allowNaN) {
              _context3.next = 12;
              break;
            }

            _context3.next = 12;
            return "".concat(errors, ".push({ code: \"numberDisallowNaN\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });");

          case 12:
            _context3.next = 14;
            return "\n            } else {\n                ".concat(errors, ".push({ code: \"").concat(code, "\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n            }\n        ");

          case 14:
            if (!(maxValue === undefined && minValue === undefined)) {
              _context3.next = 19;
              break;
            }

            _context3.next = 17;
            return "}";

          case 17:
            _context3.next = 29;
            break;

          case 19:
            _context3.next = 21;
            return "\n                    return ".concat(errors, ";\n                }\n            ");

          case 21:
            if (!(maxValue !== undefined)) {
              _context3.next = 26;
              break;
            }

            if (!(minValue !== undefined && minValue > maxValue)) {
              _context3.next = 24;
              break;
            }

            throw new Error('"maxValue" must be "minValue" or greater than it.');

          case 24:
            _context3.next = 26;
            return "\n                    if (".concat(value, " > ").concat(maxValue, ") {\n                        ").concat(errors, ".push({ code: \"numberMaxValue\", args: { name: ").concat(name, ", maxValue: ").concat(maxValue, " }, depth: ").concat(depth, " });\n                    }\n                ");

          case 26:
            if (!(minValue !== undefined)) {
              _context3.next = 29;
              break;
            }

            _context3.next = 29;
            return "\n                    if (".concat(value, " < ").concat(minValue, ") {\n                        ").concat(errors, ".push({ code: \"numberMinValue\", args: { name: ").concat(name, ", minValue: ").concat(minValue, " }, depth: ").concat(depth, " });\n                    }\n                ");

          case 29:
            _context3.next = 31;
            return "return ".concat(errors, ";");

          case 31:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
}

function addValidationOfObjectSchema(ctx, schemaKey, _ref5) {
  var _ref5$allowUnknown = _ref5.allowUnknown,
      allowUnknown = _ref5$allowUnknown === void 0 ? false : _ref5$allowUnknown,
      properties = _ref5.properties,
      _ref5$required = _ref5.required,
      required = _ref5$required === void 0 ? [] : _ref5$required;
  return ctx.addValidation( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(locals, name, value, depth, errors) {
    var requiredKeys, optionalKeys, collectKeys, remainKeys, missingKeys, _iterator2, _step2, propertyName, i, propertySchema, propertyNameStr, validationId, propValue, _iterator3, _step3, _propertyName, _propertySchema, _propertyNameStr, _validationId, setToArray;

    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            requiredKeys = Array.from(new Set(required)).sort(undefined);
            optionalKeys = Object.keys(properties).sort(undefined);
            _context4.next = 4;
            return "\n            if (typeof ".concat(value, " !== \"object\" || ").concat(value, " === null) {\n                ").concat(errors, ".push({ code: \"object\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n        ");

          case 4:
            if (!(allowUnknown && optionalKeys.length === 0)) {
              _context4.next = 9;
              break;
            }

            _context4.next = 7;
            return "}";

          case 7:
            _context4.next = 86;
            break;

          case 9:
            _context4.next = 11;
            return "\n                    return ".concat(errors, ";\n                }\n            ");

          case 11:
            collectKeys = addCollectKeys(ctx);
            remainKeys = locals.add("null");
            _context4.next = 15;
            return "".concat(remainKeys, " = ").concat(collectKeys, "(").concat(value, ");");

          case 15:
            missingKeys = "";

            if (!(requiredKeys.length > 0)) {
              _context4.next = 51;
              break;
            }

            missingKeys = locals.add("null");
            _context4.next = 20;
            return "".concat(missingKeys, " = [];");

          case 20:
            _iterator2 = _createForOfIteratorHelper(requiredKeys);
            _context4.prev = 21;

            _iterator2.s();

          case 23:
            if ((_step2 = _iterator2.n()).done) {
              _context4.next = 43;
              break;
            }

            propertyName = _step2.value;
            i = optionalKeys.indexOf(propertyName);

            if (!(i === -1)) {
              _context4.next = 30;
              break;
            }

            throw new Error("\"".concat(propertyName, "\" was in \"").concat(schemaKey, ".required\", so it must exist in \"").concat(schemaKey, ".properties\"."));

          case 30:
            optionalKeys.splice(i, 1);

          case 31:
            propertySchema = properties[propertyName];
            propertyNameStr = JSON.stringify(propertyName).slice(1, -1);

            if (!(propertySchema.type === "any")) {
              _context4.next = 38;
              break;
            }

            _context4.next = 36;
            return "\n                            if (!".concat(remainKeys, ".delete(\"").concat(propertyNameStr, "\")) {\n                                ").concat(missingKeys, ".push(\"").concat(propertyNameStr, "\");\n                            }\n                        ");

          case 36:
            _context4.next = 41;
            break;

          case 38:
            validationId = addValidation(ctx, "".concat(schemaKey, ".properties[\"").concat(propertyNameStr, "\"]"), propertySchema);
            _context4.next = 41;
            return "\n                            if (".concat(remainKeys, ".delete(\"").concat(propertyNameStr, "\")) {\n                                ").concat(validationId, "(").concat(name, " + \".").concat(propertyNameStr, "\", ").concat(value, "[\"").concat(propertyNameStr, "\"], ").concat(depth, " + 1, ").concat(errors, ");\n                            } else {\n                                ").concat(missingKeys, ".push(\"").concat(propertyNameStr, "\");\n                            }\n                        ");

          case 41:
            _context4.next = 23;
            break;

          case 43:
            _context4.next = 48;
            break;

          case 45:
            _context4.prev = 45;
            _context4.t0 = _context4["catch"](21);

            _iterator2.e(_context4.t0);

          case 48:
            _context4.prev = 48;

            _iterator2.f();

            return _context4.finish(48);

          case 51:
            if (!(optionalKeys.length > 0)) {
              _context4.next = 79;
              break;
            }

            propValue = locals.add("null");
            _iterator3 = _createForOfIteratorHelper(optionalKeys);
            _context4.prev = 54;

            _iterator3.s();

          case 56:
            if ((_step3 = _iterator3.n()).done) {
              _context4.next = 71;
              break;
            }

            _propertyName = _step3.value;
            _propertySchema = properties[_propertyName];
            _propertyNameStr = JSON.stringify(_propertyName).slice(1, -1);

            if (!(_propertySchema.type === "any")) {
              _context4.next = 66;
              break;
            }

            if (allowUnknown) {
              _context4.next = 64;
              break;
            }

            _context4.next = 64;
            return "".concat(remainKeys, ".delete(\"").concat(_propertyNameStr, "\");");

          case 64:
            _context4.next = 69;
            break;

          case 66:
            _validationId = addValidation(ctx, "".concat(schemaKey, ".properties[\"").concat(_propertyNameStr, "\"]"), _propertySchema);
            _context4.next = 69;
            return "\n                            if (".concat(remainKeys, ".delete(\"").concat(_propertyNameStr, "\") && (").concat(propValue, " = ").concat(value, "[\"").concat(_propertyNameStr, "\"]) !== undefined) {\n                                ").concat(_validationId, "(").concat(name, " + \".").concat(_propertyNameStr, "\", ").concat(propValue, ", ").concat(depth, " + 1, ").concat(errors, ");\n                            }\n                        ");

          case 69:
            _context4.next = 56;
            break;

          case 71:
            _context4.next = 76;
            break;

          case 73:
            _context4.prev = 73;
            _context4.t1 = _context4["catch"](54);

            _iterator3.e(_context4.t1);

          case 76:
            _context4.prev = 76;

            _iterator3.f();

            return _context4.finish(76);

          case 79:
            if (!missingKeys) {
              _context4.next = 82;
              break;
            }

            _context4.next = 82;
            return "\n                    if (".concat(missingKeys, ".length > 0) {\n                        ").concat(errors, ".push({ code: \"objectRequiredKeys\", args: { name: ").concat(name, ", keys: ").concat(missingKeys, " }, depth: ").concat(depth, " });\n                    }\n                ");

          case 82:
            if (allowUnknown) {
              _context4.next = 86;
              break;
            }

            setToArray = addSetToArray(ctx);
            _context4.next = 86;
            return "\n                    if (".concat(remainKeys, ".size > 0) {\n                        ").concat(errors, ".push({ code: \"objectUnknownKeys\", args: { name: ").concat(name, ", keys: ").concat(setToArray, "(").concat(remainKeys, ") }, depth: ").concat(depth, " });\n                    }\n                ");

          case 86:
            _context4.next = 88;
            return "return ".concat(errors, ";");

          case 88:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[21, 45, 48, 51], [54, 73, 76, 79]]);
  }));
}

function addCollectKeys(ctx) {
  return ctx.addFunction(function (locals, obj) {
    var keys = locals.add("new Set()");
    var key = locals.add('""');
    return "\n            for (".concat(key, " in ").concat(obj, ") ").concat(keys, ".add(").concat(key, ");\n            return ").concat(keys, ";\n        ");
  });
}

function addSetToArray(ctx) {
  return ctx.addFunction(function (locals, set) {
    var retv = locals.add("[]");
    return "\n            ".concat(set, ".forEach(function(x) { ").concat(retv, ".push(x) });\n            return ").concat(retv, ".sort(undefined);\n        ");
  });
}

function addValidationOfRecordSchema(ctx, schemaKey, _ref6) {
  var properties = _ref6.properties;
  return ctx.addValidation( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(locals, name, value, depth, errors) {
    var _validate2, keys, key, i;

    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return "\n            if (typeof ".concat(value, " !== \"object\" || ").concat(value, " === null) {\n                ").concat(errors, ".push({ code: \"object\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n        ");

          case 2:
            if (!(properties.type === "any")) {
              _context5.next = 7;
              break;
            }

            _context5.next = 5;
            return "}";

          case 5:
            _context5.next = 13;
            break;

          case 7:
            _validate2 = addValidation(ctx, "".concat(schemaKey, ".properties"), properties);
            keys = locals.add("null");
            key = locals.add('""');
            i = locals.add("0");
            _context5.next = 13;
            return "\n                    return ".concat(errors, ";\n                }\n                ").concat(keys, " = Object.keys(").concat(value, ").sort(undefined);\n                for (").concat(i, " = 0; ").concat(i, " < ").concat(keys, ".length; ++").concat(i, ") {\n                    ").concat(key, " = ").concat(keys, "[").concat(i, "]\n                    ").concat(_validate2, "(").concat(name, " + \".\" + ").concat(key, ", ").concat(value, "[").concat(key, "], ").concat(depth, " + 1, ").concat(errors, ");\n                }\n            ");

          case 13:
            _context5.next = 15;
            return "return ".concat(errors, ";");

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
}

function addValidationOfStringSchema(ctx, _schemaKey, _ref7) {
  var _ref7$maxLength = _ref7.maxLength,
      maxLength = _ref7$maxLength === void 0 ? MaxStringLength : _ref7$maxLength,
      _ref7$minLength = _ref7.minLength,
      minLength = _ref7$minLength === void 0 ? 0 : _ref7$minLength,
      pattern = _ref7.pattern;
  return ctx.addValidation( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(locals, name, value, depth, errors) {
    var shouldCheckContent, countChars, end, count;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            shouldCheckContent = maxLength < MaxStringLength || minLength > 0 || pattern !== undefined;
            _context6.next = 3;
            return "\n            if (typeof ".concat(value, " !== \"string\") {\n                ").concat(errors, ".push({ code: \"string\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n        ");

          case 3:
            if (shouldCheckContent) {
              _context6.next = 8;
              break;
            }

            _context6.next = 6;
            return "}";

          case 6:
            _context6.next = 32;
            break;

          case 8:
            _context6.next = 10;
            return "\n                    return ".concat(errors, ";\n                }\n            ");

          case 10:
            countChars = "";

            if (maxLength < MaxStringLength || minLength > 0) {
              countChars = addCountChars(ctx);
            }

            if (!(maxLength < MaxStringLength)) {
              _context6.next = 26;
              break;
            }

            end = maxLength + 1;

            if (!(minLength > 0)) {
              _context6.next = 22;
              break;
            }

            if (!(minLength > maxLength)) {
              _context6.next = 17;
              break;
            }

            throw new Error('"maxLength" must be "minLength" or greater than it.');

          case 17:
            count = locals.add("0");
            _context6.next = 20;
            return "\n                        ".concat(count, " = ").concat(countChars, "(").concat(value, ", ").concat(end, ");\n                        if (").concat(count, " > ").concat(maxLength, ") {\n                            ").concat(errors, ".push({ code: \"stringMaxLength\", args: { name: ").concat(name, ", maxLength: ").concat(maxLength, " }, depth: ").concat(depth, " });\n                        }\n                        if (").concat(count, " < ").concat(minLength, ") {\n                            ").concat(errors, ".push({ code: \"stringMinLength\", args: { name: ").concat(name, ", minLength: ").concat(minLength, " }, depth: ").concat(depth, " });\n                        }\n                    ");

          case 20:
            _context6.next = 24;
            break;

          case 22:
            _context6.next = 24;
            return "\n                        if (".concat(countChars, "(").concat(value, ", ").concat(end, ") > ").concat(maxLength, ") {\n                            ").concat(errors, ".push({ code: \"stringMaxLength\", args: { name: ").concat(name, ", maxLength: ").concat(maxLength, " }, depth: ").concat(depth, " });\n                        }\n                    ");

          case 24:
            _context6.next = 29;
            break;

          case 26:
            if (!(minLength > 0)) {
              _context6.next = 29;
              break;
            }

            _context6.next = 29;
            return "\n                    if (".concat(countChars, "(").concat(value, ", ").concat(minLength, ") < ").concat(minLength, ") {\n                        ").concat(errors, ".push({ code: \"stringMinLength\", args: { name: ").concat(name, ", minLength: ").concat(minLength, " }, depth: ").concat(depth, " });\n                    }\n                ");

          case 29:
            if (!(pattern !== undefined)) {
              _context6.next = 32;
              break;
            }

            _context6.next = 32;
            return "\n                    if (!".concat(pattern, ".test(").concat(value, ")) {\n                        ").concat(errors, ".push({ code: \"stringPattern\", args: { name: ").concat(name, ", pattern: ").concat(pattern, " }, depth: ").concat(depth, " });\n                    }\n                ");

          case 32:
            _context6.next = 34;
            return "return ".concat(errors, ";");

          case 34:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
}

function addCountChars(ctx) {
  return ctx.addFunction(function (locals, str, end) {
    var count = locals.add("0");
    var code = locals.add("0");
    var i = locals.add("0");
    var length = locals.add("".concat(str, ".length"));
    return "\n            while (".concat(i, " < ").concat(length, ") {\n                ").concat(count, " += 1;\n                if (").concat(count, " >= ").concat(end, ") {\n                    return ").concat(count, ";\n                }\n                ").concat(i, " += (").concat(code, " = ").concat(str, ".charCodeAt(").concat(i, ")) >= 0xd800 && ").concat(code, " <= 0xdbff ? 2 : 1;\n            }\n            return ").concat(count, "\n        ");
  });
}

function addValidationOfSymbolSchema(ctx, _schemaKey, _schema) {
  return ctx.addValidation(function (_locals, name, value, depth, errors) {
    return "\n            if (typeof ".concat(value, " !== \"symbol\") {\n                ").concat(errors, ".push({ code: \"symbol\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n            }\n            return ").concat(errors, ";\n        ");
  });
}

function addValidationOfTupleSchema(ctx, schemaKey, _ref8) {
  var elements = _ref8.elements;
  return ctx.addValidation( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(_locals, name, value, depth, errors) {
    var length, i, elementSchema, _validate3;

    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            length = elements.length;
            _context7.next = 3;
            return "\n            if (!Array.isArray(".concat(value, ")) {\n                ").concat(errors, ".push({ code: \"tuple\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n                return ").concat(errors, ";\n            }\n            if (").concat(value, ".length !== ").concat(length, ") {\n                ").concat(errors, ".push({ code: \"tupleLength\", args: { name: ").concat(name, ", length: ").concat(length, " }, depth: ").concat(depth, " });\n            }\n        ");

          case 3:
            i = 0;

          case 4:
            if (!(i < length)) {
              _context7.next = 14;
              break;
            }

            elementSchema = elements[i];

            if (!(elementSchema.type === "any")) {
              _context7.next = 8;
              break;
            }

            return _context7.abrupt("continue", 11);

          case 8:
            _validate3 = addValidation(ctx, "".concat(schemaKey, ".elements[").concat(i, "]"), elementSchema);
            _context7.next = 11;
            return "\n                ".concat(_validate3, "(").concat(name, " + \"[").concat(i, "]\", ").concat(value, "[").concat(i, "], ").concat(depth, " + 1, ").concat(errors, ");\n            ");

          case 11:
            ++i;
            _context7.next = 4;
            break;

          case 14:
            _context7.next = 16;
            return "return ".concat(errors, ";");

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
}

function addValidationOfUnionSchema(ctx, schemaKey, _ref9) {
  var schemas = _ref9.schemas;
  var flattened = flatten("".concat(schemaKey, ".schemas"), schemas);

  if (flattened.length === 0) {
    throw new Error("UnionSchema must have 1 or more schemas.");
  }

  if (flattened.length === 1) {
    return addValidation(ctx, flattened[0].childSchemaKey, flattened[0].childSchema);
  }

  var validationIds = [];
  var schemaIds = [];

  var _iterator4 = _createForOfIteratorHelper(flattened),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var _step4$value = _step4.value,
          childSchemaKey = _step4$value.childSchemaKey,
          childSchema = _step4$value.childSchema;
      var validationId = addValidation(ctx, childSchemaKey, childSchema);

      if (validationIds.includes(validationId)) {
        continue;
      }

      var schemaId = ctx.mapSchema(validationId, childSchemaKey);
      validationIds.push(validationId);
      schemaIds.push(schemaId);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  var validateUnion = addValidateUnion(ctx);
  var validationsStr = validationIds.join(", ");
  var schemasStr = schemaIds.join(", ");
  return ctx.addValidation(function (_locals, name, value, depth, errors) {
    return "return ".concat(validateUnion, "(").concat(name, ", ").concat(value, ", ").concat(depth, ", ").concat(errors, ", [").concat(schemasStr, "], [").concat(validationsStr, "]);");
  });
}

function flatten(key, schemas) {
  var flattened = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  for (var i = 0; i < schemas.length; ++i) {
    var childSchema = schemas[i];
    var childSchemaKey = "".concat(key, "[").concat(i, "]");

    if (childSchema.type === "any") {
      return [{
        childSchemaKey: childSchemaKey,
        childSchema: childSchema
      }];
    }

    if (childSchema.type === "union") {
      var retv = flatten("".concat(childSchemaKey, ".schemas"), childSchema.schemas, flattened);

      if (retv !== flattened) {
        return retv;
      }
    } else {
      flattened.push({
        childSchemaKey: childSchemaKey,
        childSchema: childSchema
      });
    }
  }

  return flattened;
}

function addValidateUnion(ctx) {
  return ctx.addFunction(function (locals, name, value, depth, errors, schemas, validates) {
    var maxDepth = MaxInt32 >> 1;
    var reduceMinDepthVar = addReduceMinDepth(ctx);
    var currentErrorsList = locals.add("[]");
    var thisErrors = locals.add("null");
    var currentMaxDepth = locals.add("-1");
    var thisDepth = locals.add("0");
    var i = locals.add("0");
    return "\n                for (".concat(i, " = 0; ").concat(i, " < ").concat(validates, ".length; ++").concat(i, ") {\n                    ").concat(thisErrors, " = ").concat(validates, "[").concat(i, "](").concat(name, ", ").concat(value, ", ").concat(depth, ", []);\n                    if (").concat(thisErrors, ".length === 0) {\n                        return ").concat(errors, ";\n                    }\n                    ").concat(thisDepth, " = ").concat(thisErrors, ".reduce(").concat(reduceMinDepthVar, ", ").concat(maxDepth, ")\n                    if (").concat(thisDepth, " > ").concat(currentMaxDepth, ") {\n                        ").concat(currentErrorsList, " = [").concat(thisErrors, "];\n                        ").concat(currentMaxDepth, " = ").concat(thisDepth, ";\n                    } else if (").concat(thisDepth, " === ").concat(currentMaxDepth, ") {\n                        ").concat(currentErrorsList, ".push(").concat(thisErrors, ");\n                    }\n                }\n                if (").concat(currentErrorsList, ".length === 1) {\n                    ").concat(currentErrorsList, " = ").concat(currentErrorsList, "[0];\n                    for (").concat(i, " = 0; ").concat(i, " < ").concat(currentErrorsList, ".length; ++").concat(i, ") {\n                        ").concat(errors, ".push(").concat(currentErrorsList, "[").concat(i, "]);\n                    }\n                } else if (").concat(currentErrorsList, ".length >= 2) {\n                    ").concat(errors, ".push({ code: \"union\", args: { name: ").concat(name, ", schemas: ").concat(schemas, " }, depth: ").concat(depth, " });\n                }\n                return ").concat(errors, ";\n            ");
  });
}

function addReduceMinDepth(ctx) {
  return ctx.addFunction(function (_locals, minDepth, error) {
    return "\n            return ".concat(minDepth, " <= ").concat(error, ".depth ? ").concat(minDepth, " : ").concat(error, ".depth;\n        ");
  });
}

var cache = new WeakMap();

function createValidationOfSchema(schema) {
  var validation = cache.get(schema);

  if (!validation) {
    var ctx = new BuildContext();
    var id = addValidation(ctx, "$schema", schema);
    validation = ctx.build(schema, id);
    cache.set(schema, validation);
  }

  return validation;
}

function addValidation(ctx, key, schema) {
  switch (schema.type) {
    case "any":
      return addValidationOfAnySchema(ctx);

    case "array":
      return addValidationOfArraySchema(ctx, key, schema);

    case "bigint":
      return addValidationOfBigIntSchema(ctx, key, schema);

    case "boolean":
      return addValidationOfBooleanSchema(ctx);

    case "class":
      return addValidationOfClassSchema(ctx, key, schema);

    case "custom":
      return addValidationOfCustomSchema(ctx, key, schema);

    case "enum":
      return addValidationOfEnumSchema(ctx, key, schema);

    case "function":
      return addValidationOfFunctionSchema(ctx);

    case "number":
      return addValidationOfNumberSchema(ctx, key, schema);

    case "object":
      return addValidationOfObjectSchema(ctx, key, schema);

    case "record":
      return addValidationOfRecordSchema(ctx, key, schema);

    case "string":
      return addValidationOfStringSchema(ctx, key, schema);

    case "symbol":
      return addValidationOfSymbolSchema(ctx);

    case "tuple":
      return addValidationOfTupleSchema(ctx, key, schema);

    case "union":
      return addValidationOfUnionSchema(ctx, key, schema);
    //istanbul ignore next

    default:
      throw new Error("Unknown Schema: ".concat(schema));
  }
}

var DefaultMessage = {
  array: function array(_ref10) {
    var name = _ref10.name;
    return "\"".concat(name, "\" must be an array.");
  },
  arrayMaxLength: function arrayMaxLength(_ref11) {
    var name = _ref11.name,
        maxLength = _ref11.maxLength;
    return "The length of \"".concat(name, "\" must be ").concat(maxLength, " or less than it.");
  },
  arrayMinLength: function arrayMinLength(_ref12) {
    var name = _ref12.name,
        minLength = _ref12.minLength;
    return "The length of \"".concat(name, "\" must be ").concat(minLength, " or greater than it.");
  },
  arrayUnique: function arrayUnique(_ref13) {
    var name = _ref13.name;
    return "\"".concat(name, "\" must not contain duplicate values.");
  },
  bigint: function bigint(_ref14) {
    var name = _ref14.name;
    return "\"".concat(name, "\" must be a bigint value.");
  },
  bigintMaxValue: function bigintMaxValue(_ref15) {
    var name = _ref15.name,
        maxValue = _ref15.maxValue;
    return "\"".concat(name, "\" must be ").concat(maxValue, "n or less than it.");
  },
  bigintMinValue: function bigintMinValue(_ref16) {
    var name = _ref16.name,
        minValue = _ref16.minValue;
    return "\"".concat(name, "\" must be ").concat(minValue, "n or greater than it.");
  },
  boolean: function boolean(_ref17) {
    var name = _ref17.name;
    return "\"".concat(name, "\" must be a boolean value.");
  },
  class: function _class(_ref18) {
    var name = _ref18.name,
        ctor = _ref18.constructor;
    return "\"".concat(name, "\" must be an instance of ").concat(ctor.name, ".");
  },
  custom: function custom(_ref19) {
    var name = _ref19.name,
        checkName = _ref19.checkName;
    return "\"".concat(name, "\" must be ").concat(checkName, ".");
  },
  enum: function _enum(_ref20) {
    var name = _ref20.name,
        values = _ref20.values;
    return values.length === 1 ? "\"".concat(name, "\" must be ").concat(valueToString$1(values[0]), ".") : "\"".concat(name, "\" must be any of ").concat(listToString(values, "and", valueToString$1), ".");
  },
  function: function _function(_ref21) {
    var name = _ref21.name;
    return "\"".concat(name, "\" must be a function.");
  },
  number: function number(_ref22) {
    var name = _ref22.name;
    return "\"".concat(name, "\" must be a number.");
  },
  numberDisallowInfinity: function numberDisallowInfinity(_ref23) {
    var name = _ref23.name;
    return "\"".concat(name, "\" must not be Infinity.");
  },
  numberDisallowNaN: function numberDisallowNaN(_ref24) {
    var name = _ref24.name;
    return "\"".concat(name, "\" must not be NaN.");
  },
  numberIntOnly: function numberIntOnly(_ref25) {
    var name = _ref25.name;
    return "\"".concat(name, "\" must be an integer.");
  },
  numberMaxValue: function numberMaxValue(_ref26) {
    var name = _ref26.name,
        maxValue = _ref26.maxValue;
    return "\"".concat(name, "\" must be ").concat(maxValue, " or less than it.");
  },
  numberMinValue: function numberMinValue(_ref27) {
    var name = _ref27.name,
        minValue = _ref27.minValue;
    return "\"".concat(name, "\" must be ").concat(minValue, " or greater than it.");
  },
  object: function object(_ref28) {
    var name = _ref28.name;
    return "\"".concat(name, "\" must be an object.");
  },
  objectRequiredKeys: function objectRequiredKeys(_ref29) {
    var name = _ref29.name,
        keys = _ref29.keys;
    return keys.length === 1 ? "\"".concat(name, "\" must have the required property: ").concat(keys[0], ".") : "\"".concat(name, "\" must have the required properties: ").concat(keys.join(","), ".");
  },
  objectUnknownKeys: function objectUnknownKeys(_ref30) {
    var name = _ref30.name,
        keys = _ref30.keys;
    return keys.length === 1 ? "\"".concat(name, "\" must not have unknown property: ").concat(keys[0], ".") : "\"".concat(name, "\" must not have unknown properties: ").concat(keys.join(","), ".");
  },
  string: function string(_ref31) {
    var name = _ref31.name;
    return "\"".concat(name, "\" must be a string.");
  },
  stringMaxLength: function stringMaxLength(_ref32) {
    var name = _ref32.name,
        maxLength = _ref32.maxLength;
    return "The cheracters of \"".concat(name, "\" must be ").concat(maxLength, " or less than it.");
  },
  stringMinLength: function stringMinLength(_ref33) {
    var name = _ref33.name,
        minLength = _ref33.minLength;
    return "The cheracters of \"".concat(name, "\" must be ").concat(minLength, " or more than it.");
  },
  stringPattern: function stringPattern(_ref34) {
    var name = _ref34.name,
        pattern = _ref34.pattern;
    return "\"".concat(name, "\" must match the pattern ").concat(pattern, ".");
  },
  symbol: function symbol(_ref35) {
    var name = _ref35.name;
    return "\"".concat(name, "\" must be a symbol.");
  },
  tuple: function tuple(_ref36) {
    var name = _ref36.name;
    return "\"".concat(name, "\" must be a tuple.");
  },
  tupleLength: function tupleLength(_ref37) {
    var name = _ref37.name,
        length = _ref37.length;
    return "The length of \"".concat(name, "\" must be ").concat(length, ".");
  },
  union: function union(_ref38) {
    var _ref39;

    var name = _ref38.name,
        schemas = _ref38.schemas;

    var options = (_ref39 = []).concat.apply(_ref39, _toConsumableArray(schemas.map(schemaToString)));

    return options.length === 2 ? "\"".concat(name, "\" must be ").concat(listToString(options, "or"), ".") : "\"".concat(name, "\" must be any of ").concat(listToString(options, "and"), ".");
  },
  validation: function validation(_ref40) {
    var name = _ref40.name,
        errors = _ref40.errors;

    if (errors.length === 1) {
      return errors[0];
    }

    return "\"".concat(name, "\" has multiple validation errors:\n").concat(errors.map(function (e) {
      return "- ".concat(e);
    }).join("\n"));
  }
};

function valueToString$1(value) {
  switch (_typeof(value)) {
    case "bigint":
      return "".concat(value, "n");

    case "function":
      return "[function ".concat(value.name || "(anonymous)", "]");

    case "string":
      return JSON.stringify(value);

    default:
      return String(value);
  }
}

function schemaToString(schema) {
  switch (schema.type) {
    case "array":
      return "an array";

    case "bigint":
      return "a bigint value";

    case "boolean":
      return "a boolean value";

    case "class":
      return "a ".concat(schema.constructor.name, " instance");

    case "custom":
      return schema.name;

    case "enum":
      return schema.values.map(valueToString$1);

    case "function":
      return "a function";

    case "number":
      return "a number";

    case "object":
    case "record":
      return "an object";

    case "string":
      return "a string";

    case "symbol":
      return "a symbol";

    case "tuple":
      return "a tuple";
    //istanbul ignore next

    default:
      return "an unknown value";
  }
}

function listToString(xs, kind) {
  var select = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : String;

  switch (xs.length) {
    case 0:
      return "";

    case 1:
      return select(xs[0]);

    case 2:
      return "".concat(select(xs[0]), " ").concat(kind, " ").concat(select(xs[1]));

    default:
      {
        var ys = xs.map(select);
        var last = ys.pop();
        return "".concat(ys.join(", "), ", ").concat(kind, " ").concat(last);
      }
  }
}

var ValidationError = /*#__PURE__*/function (_Error) {
  _inherits(ValidationError, _Error);

  var _super = _createSuper(ValidationError);

  function ValidationError(message, name, errors) {
    var _this;

    _classCallCheck(this, ValidationError);

    var _a, _b;

    _this = _super.call(this, toMessage(message, name, errors));
    _this.errors = errors;
    (_b = (_a = Error).captureStackTrace) === null || _b === void 0 ? void 0 : _b.call(_a, _assertThisInitialized(_this), ValidationError);
    return _this;
  }

  return ValidationError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

function toMessage(message, name, errors) {
  return message.validation({
    name: name,
    errors: errors.map(function (e) {
      return message[e.code](e.args);
    })
  });
}

function createValidation(schema) {
  var _ref41 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref41$messages = _ref41.messages,
      messages = _ref41$messages === void 0 ? DefaultMessage : _ref41$messages;

  var validate = createValidationOfSchema(schema);
  return function (name, value) {
    var errors = validate(name, value);

    if (errors.length > 0) {
      throw new ValidationError(messages, name, errors);
    }
  };
}
/* eslint-disable class-methods-use-this */


var SchemaFactories = /*#__PURE__*/function () {
  function SchemaFactories() {
    _classCallCheck(this, SchemaFactories);

    /**
     * The schema for 64 bits signed integers.
     */
    this.bigInt64 = {
      type: "bigint",
      minValue: MinInt64,
      maxValue: MaxInt64
    };
    /**
     * The schema for 64 bits unsigned integers.
     */

    this.bigUint64 = {
      type: "bigint",
      minValue: BigInt("0"),
      maxValue: MaxUint64
    };
    /**
     * The schema for null.
     * Equivalent to `schemas.enum(null)`.
     */

    this.null = {
      type: "enum",
      values: [null]
    };
    /**
     * The schema for 8 bits signed integers.
     */

    this.int8 = {
      type: "number",
      allowInfinity: false,
      allowNaN: false,
      intOnly: true,
      maxValue: MaxInt8,
      minValue: MinInt8
    };
    /**
     * The schema for 16 bits signed integers.
     */

    this.int16 = {
      type: "number",
      allowInfinity: false,
      allowNaN: false,
      intOnly: true,
      maxValue: MaxInt16,
      minValue: MinInt16
    };
    /**
     * The schema for 32 bits signed integers.
     */

    this.int32 = {
      type: "number",
      allowInfinity: false,
      allowNaN: false,
      intOnly: true,
      maxValue: MaxInt32,
      minValue: MinInt32
    };
    /**
     * The schema for 8 bits unsigned integers.
     */

    this.uint8 = {
      type: "number",
      allowInfinity: false,
      allowNaN: false,
      intOnly: true,
      maxValue: MaxUint8,
      minValue: 0
    };
    /**
     * The schema for 16 bits unsigned integers.
     */

    this.uint16 = {
      type: "number",
      allowInfinity: false,
      allowNaN: false,
      intOnly: true,
      maxValue: MaxUint16,
      minValue: 0
    };
    /**
     * The schema for 32 bits unsigned integers.
     */

    this.uint32 = {
      type: "number",
      allowInfinity: false,
      allowNaN: false,
      intOnly: true,
      maxValue: MaxUint32,
      minValue: 0
    };
  }
  /**
   * The schema for any values.
   */


  _createClass(SchemaFactories, [{
    key: "any",
    value: function any() {
      return {
        type: "any"
      };
    } // Implementation

  }, {
    key: "array",
    value: function array() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        type: "any"
      };

      var _ref42 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref42$maxLength = _ref42.maxLength,
          maxLength = _ref42$maxLength === void 0 ? MaxArrayLength : _ref42$maxLength,
          _ref42$minLength = _ref42.minLength,
          minLength = _ref42$minLength === void 0 ? 0 : _ref42$minLength,
          _ref42$unique = _ref42.unique,
          unique = _ref42$unique === void 0 ? false : _ref42$unique;

      return {
        type: "array",
        elements: elements,
        maxLength: maxLength,
        minLength: minLength,
        unique: unique
      };
    }
    /**
     * The schema for bigint values.
     * @param options The options.
     */

  }, {
    key: "bigInt",
    value: function bigInt() {
      var _ref43 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          maxValue = _ref43.maxValue,
          minValue = _ref43.minValue;

      return {
        type: "bigint",
        maxValue: maxValue,
        minValue: minValue
      };
    }
    /**
     * The schema for true or false.
     */

  }, {
    key: "boolean",
    value: function boolean() {
      return {
        type: "boolean"
      };
    }
    /**
     * The schema for specific class instances.
     * @param constructor The constructor to use `instanceof` operations.
     */

  }, {
    key: "instanceOf",
    value: function instanceOf( // eslint-disable-next-line no-shadow
    constructor) {
      return {
        type: "class",
        constructor: constructor
      };
    }
    /**
     * The schema for user-defined checks.
     * @param name The name of the valid values. This name will be shown in error messages.
     * @param check The check.
     */

  }, {
    key: "custom",
    value: function custom(name, check) {
      return {
        type: "custom",
        check: check,
        name: name
      };
    } // Implementation

  }, {
    key: "enum",
    value: function _enum() {
      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      return {
        type: "enum",
        values: values
      };
    }
    /**
     * The schema for any functions.
     */

  }, {
    key: "function",
    value: function _function() {
      return {
        type: "function"
      };
    }
    /**
     * The schema for numbers.
     * @param options The options.
     */

  }, {
    key: "number",
    value: function number() {
      var _ref44 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref44$allowInfinity = _ref44.allowInfinity,
          allowInfinity = _ref44$allowInfinity === void 0 ? false : _ref44$allowInfinity,
          _ref44$allowNaN = _ref44.allowNaN,
          allowNaN = _ref44$allowNaN === void 0 ? false : _ref44$allowNaN,
          _ref44$intOnly = _ref44.intOnly,
          intOnly = _ref44$intOnly === void 0 ? false : _ref44$intOnly,
          maxValue = _ref44.maxValue,
          minValue = _ref44.minValue;

      return {
        type: "number",
        allowInfinity: allowInfinity,
        allowNaN: allowNaN,
        intOnly: intOnly,
        maxValue: maxValue,
        minValue: minValue
      };
    } // Implementation

  }, {
    key: "object",
    value: function object(properties) {
      var _ref45 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref45$allowUnknown = _ref45.allowUnknown,
          allowUnknown = _ref45$allowUnknown === void 0 ? false : _ref45$allowUnknown,
          _ref45$required = _ref45.required,
          required = _ref45$required === void 0 ? [] : _ref45$required;

      if (properties === undefined) {
        return {
          type: "object",
          allowUnknown: true,
          properties: {},
          required: []
        };
      }

      return {
        type: "object",
        allowUnknown: allowUnknown,
        properties: properties,
        required: required === true ? Object.keys(properties) : required
      };
    } // Implementation

  }, {
    key: "record",
    value: function record() {
      var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        type: "any"
      };
      return {
        type: "record",
        properties: properties
      };
    }
    /**
     * The schema for strings.
     * @param options The options.
     */

  }, {
    key: "string",
    value: function string() {
      var _ref46 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref46$maxLength = _ref46.maxLength,
          maxLength = _ref46$maxLength === void 0 ? MaxStringLength : _ref46$maxLength,
          _ref46$minLength = _ref46.minLength,
          minLength = _ref46$minLength === void 0 ? 0 : _ref46$minLength,
          pattern = _ref46.pattern;

      return {
        type: "string",
        maxLength: maxLength,
        minLength: minLength,
        pattern: pattern
      };
    }
    /**
     * The schema for any symbols.
     */

  }, {
    key: "symbol",
    value: function symbol() {
      return {
        type: "symbol"
      };
    }
    /**
     * The schema for tuples.
     * @param elements The schema of elements.
     */

  }, {
    key: "tuple",
    value: function tuple() {
      for (var _len2 = arguments.length, elements = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        elements[_key2] = arguments[_key2];
      }

      return {
        type: "tuple",
        elements: elements
      };
    } // Implementation

  }, {
    key: "anyOf",
    value: function anyOf() {
      for (var _len3 = arguments.length, schemas = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        schemas[_key3] = arguments[_key3];
      }

      return {
        type: "union",
        schemas: schemas
      };
    }
  }]);

  return SchemaFactories;
}();
/* eslint-enable class-methods-use-this */

/**
 * The schema factories.
 */


var schemas = Object.freeze(new SchemaFactories());

function validate(schema, name, value) {
  var _ref47 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref47$messages = _ref47.messages,
      messages = _ref47$messages === void 0 ? DefaultMessage : _ref47$messages;

  var errors = createValidationOfSchema(schema)(name, value);

  if (errors.length > 0) {
    throw new ValidationError(messages, name, errors);
  }
}

export { DefaultMessage, ValidationError, createValidation, schemas, validate };
