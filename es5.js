'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.array.concat.js');
require('core-js/modules/es.array.filter.js');
require('core-js/modules/es.array.from.js');
require('core-js/modules/es.array.includes.js');
require('core-js/modules/es.array.index-of.js');
require('core-js/modules/es.array.iterator.js');
require('core-js/modules/es.array.join.js');
require('core-js/modules/es.array.map.js');
require('core-js/modules/es.array.slice.js');
require('core-js/modules/es.array.some.js');
require('core-js/modules/es.array.splice.js');
require('core-js/modules/es.function.name.js');
require('core-js/modules/es.map.js');
require('core-js/modules/es.number.constructor.js');
require('core-js/modules/es.number.is-nan.js');
require('core-js/modules/es.object.freeze.js');
require('core-js/modules/es.object.keys.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.regexp.to-string.js');
require('core-js/modules/es.set.js');
require('core-js/modules/es.string.iterator.js');
require('core-js/modules/es.string.split.js');
require('core-js/modules/es.string.trim.js');
require('core-js/modules/es.weak-map.js');
require('core-js/modules/web.dom-collections.iterator.js');
var _assertThisInitialized = require('@babel/runtime/helpers/assertThisInitialized');
var _inherits = require('@babel/runtime/helpers/inherits');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var _wrapNativeSuper = require('@babel/runtime/helpers/wrapNativeSuper');
var _typeof = require('@babel/runtime/helpers/typeof');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
require('regenerator-runtime/runtime.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _wrapNativeSuper__default = /*#__PURE__*/_interopDefaultLegacy(_wrapNativeSuper);
var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default['default'](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default['default'](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default['default'](this, result); }; }

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
  return ctx.addValidation( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee(locals, name, value, depth, errors) {
    var shouldCheckElements, length, isUnique, _validate, i;

    return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            shouldCheckElements = elements.type !== "any" || maxLength < MaxArrayLength || minLength > 0 || unique;
            _context.next = 3;
            return "\n            if (!Array.isArray(".concat(value, ")) {\n                ").concat(errors, ".push({ code: \"array\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n        ");

          case 3:
            if (!shouldCheckElements) {
              _context.next = 33;
              break;
            }

            _context.next = 6;
            return "} else {";

          case 6:
            length = locals.add("0");
            _context.next = 9;
            return "".concat(length, " = ").concat(value, ".length;");

          case 9:
            if (!(maxLength < MaxArrayLength)) {
              _context.next = 21;
              break;
            }

            if (!(maxLength < minLength)) {
              _context.next = 12;
              break;
            }

            throw new Error('"maxLength" must be "minLength" or greater than it.');

          case 12:
            if (!(minLength > 0)) {
              _context.next = 17;
              break;
            }

            _context.next = 15;
            return "\n                        if (".concat(length, " > ").concat(maxLength, ") {\n                            ").concat(errors, ".push({ code: \"arrayMaxLength\", args: { name: ").concat(name, ", maxLength: ").concat(maxLength, " }, depth: ").concat(depth, " + 1 });\n                        } else if (").concat(length, " < ").concat(minLength, ") {\n                            ").concat(errors, ".push({ code: \"arrayMinLength\", args: { name: ").concat(name, ", minLength: ").concat(minLength, " }, depth: ").concat(depth, " + 1 });\n                        }\n                    ");

          case 15:
            _context.next = 19;
            break;

          case 17:
            _context.next = 19;
            return "\n                        if (".concat(length, " > ").concat(maxLength, ") {\n                            ").concat(errors, ".push({ code: \"arrayMaxLength\", args: { name: ").concat(name, ", maxLength: ").concat(maxLength, " }, depth: ").concat(depth, " + 1 });\n                        }\n                    ");

          case 19:
            _context.next = 24;
            break;

          case 21:
            if (!(minLength > 0)) {
              _context.next = 24;
              break;
            }

            _context.next = 24;
            return "\n                    if (".concat(length, " < ").concat(minLength, ") {\n                        ").concat(errors, ".push({ code: \"arrayMinLength\", args: { name: ").concat(name, ", minLength: ").concat(minLength, " }, depth: ").concat(depth, " + 1 });\n                    }\n                ");

          case 24:
            if (!unique) {
              _context.next = 28;
              break;
            }

            isUnique = addIsUnique(ctx);
            _context.next = 28;
            return "\n                    if (!".concat(isUnique, "(").concat(value, ", ").concat(length, ")) {\n                        ").concat(errors, ".push({ code: \"arrayUnique\", args: { name: ").concat(name, " }, depth: ").concat(depth, " + 1 });\n                    }\n                ");

          case 28:
            if (!(elements.type !== "any")) {
              _context.next = 33;
              break;
            }

            _validate = addValidation(ctx, "".concat(schemaKey, ".elements"), elements);
            i = locals.add("0");
            _context.next = 33;
            return "\n                    for (".concat(i, " = 0; ").concat(i, " < ").concat(length, "; ++").concat(i, ") {\n                        ").concat(_validate, "(").concat(name, " + \"[\" + ").concat(i, " + \"]\", ").concat(value, "[").concat(i, "], ").concat(depth, " + 1, ").concat(errors, ");\n                    }\n                ");

          case 33:
            _context.next = 35;
            return "\n            }\n            return ".concat(errors, ";\n        ");

          case 35:
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
  return ctx.addValidation( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee2(_locals, name, value, depth, errors) {
    return _regeneratorRuntime__default['default'].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return "\n            if (typeof ".concat(value, " !== \"bigint\") {\n                ").concat(errors, ".push({ code: \"bigint\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n        ");

          case 2:
            if (!(maxValue !== undefined || minValue !== undefined)) {
              _context2.next = 20;
              break;
            }

            _context2.next = 5;
            return "} else {";

          case 5:
            if (!(maxValue !== undefined)) {
              _context2.next = 17;
              break;
            }

            if (!(minValue !== undefined)) {
              _context2.next = 13;
              break;
            }

            if (!(minValue > maxValue)) {
              _context2.next = 9;
              break;
            }

            throw new Error('"maxValue" must be "minValue" or greater than it.');

          case 9:
            _context2.next = 11;
            return "\n                        if (".concat(value, " > ").concat(maxValue, "n) {\n                            ").concat(errors, ".push({ code: \"bigintMaxValue\", args: { name: ").concat(name, ", maxValue: ").concat(maxValue, "n }, depth: ").concat(depth, " + 1 });\n                        } else if (").concat(value, " < ").concat(minValue, "n) {\n                            ").concat(errors, ".push({ code: \"bigintMinValue\", args: { name: ").concat(name, ", minValue: ").concat(minValue, "n }, depth: ").concat(depth, " + 1 });\n                        }\n                    ");

          case 11:
            _context2.next = 15;
            break;

          case 13:
            _context2.next = 15;
            return "\n                        if (".concat(value, " > ").concat(maxValue, "n) {\n                            ").concat(errors, ".push({ code: \"bigintMaxValue\", args: { name: ").concat(name, ", maxValue: ").concat(maxValue, "n }, depth: ").concat(depth, " + 1 });\n                        }\n                    ");

          case 15:
            _context2.next = 20;
            break;

          case 17:
            if (!(minValue !== undefined)) {
              _context2.next = 20;
              break;
            }

            _context2.next = 20;
            return "\n                    if (".concat(value, " < ").concat(minValue, "n) {\n                        ").concat(errors, ".push({ code: \"bigintMinValue\", args: { name: ").concat(name, ", minValue: ").concat(minValue, "n }, depth: ").concat(depth, " + 1 });\n                    }\n                ");

          case 20:
            _context2.next = 22;
            return "\n            }\n            return ".concat(errors, ";\n        ");

          case 22:
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
    _classCallCheck__default['default'](this, BuildContext);

    this.constants = [];
    this.functionMap = new Map();
    this.flyweightMap = new Map();
    this.code = ['"use strict";'];
    this.indent = 0;
  }

  _createClass__default['default'](BuildContext, [{
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
      var bodyGen = createBody.apply(void 0, [locals].concat(_toConsumableArray__default['default'](params)));
      var body = typeof bodyGen === "string" ? bodyGen : _toConsumableArray__default['default'](bodyGen).join("\n");
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

      try {
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
      } catch (error) {
        //istanbul ignore next
        if (error instanceof SyntaxError) {
          error.message += " in the code:\n".concat(code);
        } //istanbul ignore next


        throw error;
      }
    }
  }]);

  return BuildContext;
}();

var Chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

var Locals = /*#__PURE__*/function () {
  function Locals() {
    _classCallCheck__default['default'](this, Locals);

    this.numArgs = 0;
    this.localInits = [];
  }

  _createClass__default['default'](Locals, [{
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
  //istanbul ignore if
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
    switch (_typeof__default['default'](value)) {
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
        throw new Error("Unknown type: ".concat(_typeof__default['default'](value)));
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
  // eslint-disable-next-line complexity
  return ctx.addValidation( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee3(_locals, name, value, depth, errors) {
    var checker, code;
    return _regeneratorRuntime__default['default'].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(allowInfinity && allowNaN && !intOnly && maxValue === undefined && minValue === undefined)) {
              _context3.next = 5;
              break;
            }

            _context3.next = 3;
            return "\n                if (typeof ".concat(value, " !== \"number\") {\n                    ").concat(errors, ".push({ code: \"number\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n            ");

          case 3:
            _context3.next = 46;
            break;

          case 5:
            checker = intOnly ? "isInteger" : "isFinite";
            code = intOnly ? "numberIntOnly" : "number";
            _context3.next = 9;
            return "if (!Number.".concat(checker, "(").concat(value, ")) {");

          case 9:
            if (!allowInfinity) {
              _context3.next = 19;
              break;
            }

            if (!allowNaN) {
              _context3.next = 15;
              break;
            }

            _context3.next = 13;
            return "if (".concat(value, " !== Number.POSITIVE_INFINITY && ").concat(value, " !== Number.NEGATIVE_INFINITY && !Number.isNaN(").concat(value, ")) {");

          case 13:
            _context3.next = 17;
            break;

          case 15:
            _context3.next = 17;
            return "\n                        if (Number.isNaN(".concat(value, ")) {\n                            ").concat(errors, ".push({ code: \"numberDisallowNaN\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n                        } else if (").concat(value, " !== Number.POSITIVE_INFINITY && ").concat(value, " !== Number.NEGATIVE_INFINITY) {\n                    ");

          case 17:
            _context3.next = 26;
            break;

          case 19:
            if (!allowNaN) {
              _context3.next = 24;
              break;
            }

            _context3.next = 22;
            return "\n                    if (".concat(value, " === Number.POSITIVE_INFINITY || ").concat(value, " === Number.NEGATIVE_INFINITY) {\n                        ").concat(errors, ".push({ code: \"numberDisallowInfinity\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n                    } else if (!Number.isNaN(").concat(value, ")) {\n                ");

          case 22:
            _context3.next = 26;
            break;

          case 24:
            _context3.next = 26;
            return "\n                    if (".concat(value, " === Number.POSITIVE_INFINITY || ").concat(value, " === Number.NEGATIVE_INFINITY) {\n                        ").concat(errors, ".push({ code: \"numberDisallowInfinity\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n                    } else if (Number.isNaN(").concat(value, ")) {\n                        ").concat(errors, ".push({ code: \"numberDisallowNaN\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n                    } else {\n                ");

          case 26:
            _context3.next = 28;
            return "\n                    ".concat(errors, ".push({ code: \"").concat(code, "\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n                }\n            ");

          case 28:
            if (!(maxValue !== undefined || minValue !== undefined)) {
              _context3.next = 46;
              break;
            }

            _context3.next = 31;
            return "} else {";

          case 31:
            if (!(maxValue !== undefined)) {
              _context3.next = 43;
              break;
            }

            if (!(minValue !== undefined)) {
              _context3.next = 39;
              break;
            }

            if (!(minValue > maxValue)) {
              _context3.next = 35;
              break;
            }

            throw new Error('"maxValue" must be "minValue" or greater than it.');

          case 35:
            _context3.next = 37;
            return "\n                            if (".concat(value, " > ").concat(maxValue, ") {\n                                ").concat(errors, ".push({ code: \"numberMaxValue\", args: { name: ").concat(name, ", maxValue: ").concat(maxValue, " }, depth: ").concat(depth, " + 1 });\n                            } else if (").concat(value, " < ").concat(minValue, ") {\n                                ").concat(errors, ".push({ code: \"numberMinValue\", args: { name: ").concat(name, ", minValue: ").concat(minValue, " }, depth: ").concat(depth, " + 1 });\n                            }\n                        ");

          case 37:
            _context3.next = 41;
            break;

          case 39:
            _context3.next = 41;
            return "\n                            if (".concat(value, " > ").concat(maxValue, ") {\n                                ").concat(errors, ".push({ code: \"numberMaxValue\", args: { name: ").concat(name, ", maxValue: ").concat(maxValue, " }, depth: ").concat(depth, " + 1 });\n                            }\n                        ");

          case 41:
            _context3.next = 46;
            break;

          case 43:
            if (!(minValue !== undefined)) {
              _context3.next = 46;
              break;
            }

            _context3.next = 46;
            return "\n                        if (".concat(value, " < ").concat(minValue, ") {\n                            ").concat(errors, ".push({ code: \"numberMinValue\", args: { name: ").concat(name, ", minValue: ").concat(minValue, " }, depth: ").concat(depth, " + 1 });\n                        }\n                    ");

          case 46:
            _context3.next = 48;
            return "\n            }\n            return ".concat(errors, ";\n        ");

          case 48:
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
  return ctx.addValidation( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee4(locals, name, value, depth, errors) {
    var requiredKeys, optionalKeys, shouldCheckProperties, collectKeys, remainKeys, missingKeys, _iterator2, _step2, propertyName, i, propertySchema, propertyNameStr, validationId, propValue, _iterator3, _step3, _propertyName, _propertySchema, _propertyNameStr, _validationId, setToArray;

    return _regeneratorRuntime__default['default'].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            requiredKeys = Array.from(new Set(required)).sort(undefined);
            optionalKeys = Object.keys(properties).sort(undefined);
            shouldCheckProperties = !allowUnknown || optionalKeys.some(function (k) {
              return properties[k].type !== "any";
            });
            _context4.next = 5;
            return "\n            if (typeof ".concat(value, " !== \"object\" || ").concat(value, " === null) {\n                ").concat(errors, ".push({ code: \"object\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n        ");

          case 5:
            if (!shouldCheckProperties) {
              _context4.next = 83;
              break;
            }

            _context4.next = 8;
            return "} else {";

          case 8:
            collectKeys = addCollectKeys(ctx);
            remainKeys = locals.add("null");
            _context4.next = 12;
            return "".concat(remainKeys, " = ").concat(collectKeys, "(").concat(value, ");");

          case 12:
            missingKeys = "";

            if (!(requiredKeys.length > 0)) {
              _context4.next = 48;
              break;
            }

            missingKeys = locals.add("null");
            _context4.next = 17;
            return "".concat(missingKeys, " = [];");

          case 17:
            _iterator2 = _createForOfIteratorHelper(requiredKeys);
            _context4.prev = 18;

            _iterator2.s();

          case 20:
            if ((_step2 = _iterator2.n()).done) {
              _context4.next = 40;
              break;
            }

            propertyName = _step2.value;
            i = optionalKeys.indexOf(propertyName);

            if (!(i === -1)) {
              _context4.next = 27;
              break;
            }

            throw new Error("\"".concat(propertyName, "\" was in \"").concat(schemaKey, ".required\", so it must exist in \"").concat(schemaKey, ".properties\"."));

          case 27:
            optionalKeys.splice(i, 1);

          case 28:
            propertySchema = properties[propertyName];
            propertyNameStr = JSON.stringify(propertyName).slice(1, -1);

            if (!(propertySchema.type === "any")) {
              _context4.next = 35;
              break;
            }

            _context4.next = 33;
            return "\n                            if (!".concat(remainKeys, ".delete(\"").concat(propertyNameStr, "\")) {\n                                ").concat(missingKeys, ".push(\"").concat(propertyNameStr, "\");\n                            }\n                        ");

          case 33:
            _context4.next = 38;
            break;

          case 35:
            validationId = addValidation(ctx, "".concat(schemaKey, ".properties[\"").concat(propertyNameStr, "\"]"), propertySchema);
            _context4.next = 38;
            return "\n                            if (".concat(remainKeys, ".delete(\"").concat(propertyNameStr, "\")) {\n                                ").concat(validationId, "(").concat(name, " + \".").concat(propertyNameStr, "\", ").concat(value, "[\"").concat(propertyNameStr, "\"], ").concat(depth, " + 1, ").concat(errors, ");\n                            } else {\n                                ").concat(missingKeys, ".push(\"").concat(propertyNameStr, "\");\n                            }\n                        ");

          case 38:
            _context4.next = 20;
            break;

          case 40:
            _context4.next = 45;
            break;

          case 42:
            _context4.prev = 42;
            _context4.t0 = _context4["catch"](18);

            _iterator2.e(_context4.t0);

          case 45:
            _context4.prev = 45;

            _iterator2.f();

            return _context4.finish(45);

          case 48:
            if (!(optionalKeys.length > 0)) {
              _context4.next = 76;
              break;
            }

            propValue = locals.add("null");
            _iterator3 = _createForOfIteratorHelper(optionalKeys);
            _context4.prev = 51;

            _iterator3.s();

          case 53:
            if ((_step3 = _iterator3.n()).done) {
              _context4.next = 68;
              break;
            }

            _propertyName = _step3.value;
            _propertySchema = properties[_propertyName];
            _propertyNameStr = JSON.stringify(_propertyName).slice(1, -1);

            if (!(_propertySchema.type === "any")) {
              _context4.next = 63;
              break;
            }

            if (allowUnknown) {
              _context4.next = 61;
              break;
            }

            _context4.next = 61;
            return "".concat(remainKeys, ".delete(\"").concat(_propertyNameStr, "\");");

          case 61:
            _context4.next = 66;
            break;

          case 63:
            _validationId = addValidation(ctx, "".concat(schemaKey, ".properties[\"").concat(_propertyNameStr, "\"]"), _propertySchema);
            _context4.next = 66;
            return "\n                            if (".concat(remainKeys, ".delete(\"").concat(_propertyNameStr, "\") && (").concat(propValue, " = ").concat(value, "[\"").concat(_propertyNameStr, "\"]) !== undefined) {\n                                ").concat(_validationId, "(").concat(name, " + \".").concat(_propertyNameStr, "\", ").concat(propValue, ", ").concat(depth, " + 1, ").concat(errors, ");\n                            }\n                        ");

          case 66:
            _context4.next = 53;
            break;

          case 68:
            _context4.next = 73;
            break;

          case 70:
            _context4.prev = 70;
            _context4.t1 = _context4["catch"](51);

            _iterator3.e(_context4.t1);

          case 73:
            _context4.prev = 73;

            _iterator3.f();

            return _context4.finish(73);

          case 76:
            if (!missingKeys) {
              _context4.next = 79;
              break;
            }

            _context4.next = 79;
            return "\n                    if (".concat(missingKeys, ".length > 0) {\n                        ").concat(errors, ".push({ code: \"objectRequiredKeys\", args: { name: ").concat(name, ", keys: ").concat(missingKeys, " }, depth: ").concat(depth, " + 1 });\n                    }\n                ");

          case 79:
            if (allowUnknown) {
              _context4.next = 83;
              break;
            }

            setToArray = addSetToArray(ctx);
            _context4.next = 83;
            return "\n                    if (".concat(remainKeys, ".size > 0) {\n                        ").concat(errors, ".push({ code: \"objectUnknownKeys\", args: { name: ").concat(name, ", keys: ").concat(setToArray, "(").concat(remainKeys, ") }, depth: ").concat(depth, " + 1 });\n                    }\n                ");

          case 83:
            _context4.next = 85;
            return "\n            }\n            return ".concat(errors, ";\n        ");

          case 85:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[18, 42, 45, 48], [51, 70, 73, 76]]);
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
  return ctx.addValidation( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee5(locals, name, value, depth, errors) {
    var _validate2, keys, key, i;

    return _regeneratorRuntime__default['default'].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return "\n            if (typeof ".concat(value, " !== \"object\" || ").concat(value, " === null) {\n                ").concat(errors, ".push({ code: \"object\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n        ");

          case 2:
            if (!(properties.type !== "any")) {
              _context5.next = 11;
              break;
            }

            _context5.next = 5;
            return "} else {";

          case 5:
            _validate2 = addValidation(ctx, "".concat(schemaKey, ".properties"), properties);
            keys = locals.add("null");
            key = locals.add('""');
            i = locals.add("0");
            _context5.next = 11;
            return "\n                ".concat(keys, " = Object.keys(").concat(value, ").sort(undefined);\n                for (; ").concat(i, " < ").concat(keys, ".length; ++").concat(i, ") {\n                    ").concat(key, " = ").concat(keys, "[").concat(i, "]\n                    ").concat(_validate2, "(").concat(name, " + \".\" + ").concat(key, ", ").concat(value, "[").concat(key, "], ").concat(depth, " + 1, ").concat(errors, ");\n                }\n            ");

          case 11:
            _context5.next = 13;
            return "\n            }\n            return ".concat(errors, ";\n        ");

          case 13:
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
  return ctx.addValidation( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee6(locals, name, value, depth, errors) {
    var shouldCheckContent, countChars, end, count;
    return _regeneratorRuntime__default['default'].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            shouldCheckContent = maxLength < MaxStringLength || minLength > 0 || pattern !== undefined;
            _context6.next = 3;
            return "\n            if (typeof ".concat(value, " !== \"string\") {\n                ").concat(errors, ".push({ code: \"string\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n        ");

          case 3:
            if (!shouldCheckContent) {
              _context6.next = 28;
              break;
            }

            _context6.next = 6;
            return "} else {";

          case 6:
            countChars = "";

            if (maxLength < MaxStringLength || minLength > 0) {
              countChars = addCountChars(ctx);
            }

            if (!(maxLength < MaxStringLength)) {
              _context6.next = 22;
              break;
            }

            end = maxLength + 1;

            if (!(minLength > 0)) {
              _context6.next = 18;
              break;
            }

            if (!(minLength > maxLength)) {
              _context6.next = 13;
              break;
            }

            throw new Error('"maxLength" must be "minLength" or greater than it.');

          case 13:
            count = locals.add("0");
            _context6.next = 16;
            return "\n                        ".concat(count, " = ").concat(countChars, "(").concat(value, ", ").concat(end, ");\n                        if (").concat(count, " > ").concat(maxLength, ") {\n                            ").concat(errors, ".push({ code: \"stringMaxLength\", args: { name: ").concat(name, ", maxLength: ").concat(maxLength, " }, depth: ").concat(depth, " + 1 });\n                        } else if (").concat(count, " < ").concat(minLength, ") {\n                            ").concat(errors, ".push({ code: \"stringMinLength\", args: { name: ").concat(name, ", minLength: ").concat(minLength, " }, depth: ").concat(depth, " + 1 });\n                        }\n                    ");

          case 16:
            _context6.next = 20;
            break;

          case 18:
            _context6.next = 20;
            return "\n                        if (".concat(countChars, "(").concat(value, ", ").concat(end, ") > ").concat(maxLength, ") {\n                            ").concat(errors, ".push({ code: \"stringMaxLength\", args: { name: ").concat(name, ", maxLength: ").concat(maxLength, " }, depth: ").concat(depth, " + 1 });\n                        }\n                    ");

          case 20:
            _context6.next = 25;
            break;

          case 22:
            if (!(minLength > 0)) {
              _context6.next = 25;
              break;
            }

            _context6.next = 25;
            return "\n                    if (".concat(countChars, "(").concat(value, ", ").concat(minLength, ") < ").concat(minLength, ") {\n                        ").concat(errors, ".push({ code: \"stringMinLength\", args: { name: ").concat(name, ", minLength: ").concat(minLength, " }, depth: ").concat(depth, " + 1 });\n                    }\n                ");

          case 25:
            if (!(pattern !== undefined)) {
              _context6.next = 28;
              break;
            }

            _context6.next = 28;
            return "\n                    if (!".concat(pattern, ".test(").concat(value, ")) {\n                        ").concat(errors, ".push({ code: \"stringPattern\", args: { name: ").concat(name, ", pattern: ").concat(pattern, " }, depth: ").concat(depth, " + 1 });\n                    }\n                ");

          case 28:
            _context6.next = 30;
            return "\n            }\n            return ".concat(errors, ";\n        ");

          case 30:
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
  return ctx.addValidation( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee7(_locals, name, value, depth, errors) {
    var length, i, elementSchema, _validate3;

    return _regeneratorRuntime__default['default'].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            length = elements.length;
            _context7.next = 3;
            return "\n            if (!Array.isArray(".concat(value, ")) {\n                ").concat(errors, ".push({ code: \"tuple\", args: { name: ").concat(name, " }, depth: ").concat(depth, " });\n            } else {\n                if (").concat(value, ".length !== ").concat(length, ") {\n                    ").concat(errors, ".push({ code: \"tupleLength\", args: { name: ").concat(name, ", length: ").concat(length, " }, depth: ").concat(depth, " });\n                }\n        ");

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
            return "\n            }\n            return ".concat(errors, ";\n        ");

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
    var currentErrors = locals.add("null");
    var thisErrors = locals.add("null");
    var currentMaxDepth = locals.add("-1");
    var thisDepth = locals.add("0");
    var i = locals.add("0");
    return "\n                for (; ".concat(i, " < ").concat(validates, ".length; ++").concat(i, ") {\n                    ").concat(thisErrors, " = ").concat(validates, "[").concat(i, "](").concat(name, ", ").concat(value, ", ").concat(depth, ", []);\n                    if (").concat(thisErrors, ".length === 0) {\n                        return ").concat(errors, ";\n                    }\n                    ").concat(thisDepth, " = ").concat(thisErrors, ".reduce(").concat(reduceMinDepthVar, ", ").concat(maxDepth, ")\n                    if (").concat(thisDepth, " > ").concat(currentMaxDepth, ") {\n                        ").concat(currentErrors, " = ").concat(thisErrors, ";\n                        ").concat(currentMaxDepth, " = ").concat(thisDepth, ";\n                    } else if (").concat(thisDepth, " === ").concat(currentMaxDepth, ") {\n                        ").concat(currentErrors, " = null;\n                    }\n                }\n                if (").concat(currentErrors, " !== null) {\n                    for (").concat(i, " = 0; ").concat(i, " < ").concat(currentErrors, ".length; ++").concat(i, ") {\n                        ").concat(errors, ".push(").concat(currentErrors, "[").concat(i, "]);\n                    }\n                } else {\n                    ").concat(errors, ".push({ code: \"union\", args: { name: ").concat(name, ", schemas: ").concat(schemas, " }, depth: ").concat(depth, " });\n                }\n                return ").concat(errors, ";\n            ");
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
/**
 * The default error message generator.
 */


var DefaultMessage = {
  array: function array(_ref10) {
    var name = _ref10.name;
    return "\"".concat(name, "\" must be an array.");
  },
  arrayMaxLength: function arrayMaxLength(_ref11) {
    var name = _ref11.name,
        maxLength = _ref11.maxLength;
    var length = plural(maxLength, "item");
    return "\"".concat(name, "\" must contain less than or equal to ").concat(length, ".");
  },
  arrayMinLength: function arrayMinLength(_ref12) {
    var name = _ref12.name,
        minLength = _ref12.minLength;
    return minLength === 1 ? "\"".concat(name, "\" must not be empty.") : "\"".concat(name, "\" must contain more than or equal to ").concat(minLength, " items.");
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
    return "\"".concat(name, "\" must be less than or equal to ").concat(maxValue, "n.");
  },
  bigintMinValue: function bigintMinValue(_ref16) {
    var name = _ref16.name,
        minValue = _ref16.minValue;
    return "\"".concat(name, "\" must be greater than or equal to ").concat(minValue, "n.");
  },
  boolean: function boolean(_ref17) {
    var name = _ref17.name;
    return "\"".concat(name, "\" must be a boolean value.");
  },
  class: function _class(_ref18) {
    var name = _ref18.name,
        ctor = _ref18.constructor;
    return "\"".concat(name, "\" must be an instance of ").concat(ctor.name || "Anonymous class", ".");
  },
  custom: function custom(_ref19) {
    var name = _ref19.name,
        checkName = _ref19.checkName;
    return "\"".concat(name, "\" must be ").concat(checkName, ".");
  },
  enum: function _enum(_ref20) {
    var name = _ref20.name,
        values = _ref20.values;
    var options = values.map(valueToString$1).filter(isNotDuplicateValue);

    if (options.length <= 2) {
      return "\"".concat(name, "\" must be ").concat(listToString(options, "or"), ".");
    }

    return "\"".concat(name, "\" must be any of ").concat(listToString(options, "and"), ".");
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
    return "\"".concat(name, "\" must be less than or equal to ").concat(maxValue, ".");
  },
  numberMinValue: function numberMinValue(_ref27) {
    var name = _ref27.name,
        minValue = _ref27.minValue;
    return "\"".concat(name, "\" must be greater than or equal to ").concat(minValue, ".");
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
    var length = plural(maxLength, "character");
    return "\"".concat(name, "\" must be less than or equal to ").concat(length, ".");
  },
  stringMinLength: function stringMinLength(_ref33) {
    var name = _ref33.name,
        minLength = _ref33.minLength;
    return minLength === 1 ? "\"".concat(name, "\" must not be empty.") : "\"".concat(name, "\" must be more than or equal to ").concat(minLength, " characters.");
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
    return "\"".concat(name, "\" must contain exactly ").concat(plural(length, "item"), ".");
  },
  union: function union(_ref38) {
    var _ref39;

    var name = _ref38.name,
        schemas = _ref38.schemas;

    var options = (_ref39 = []).concat.apply(_ref39, _toConsumableArray__default['default'](schemas.map(schemaToString))).filter(isNotDuplicateValue);

    return options.length === 2 ? "\"".concat(name, "\" must be ").concat(listToString(options, "or"), ".") : "\"".concat(name, "\" must be any of ").concat(listToString(options, "and"), ".");
  },
  validation: function validation(_ref40) {
    var name = _ref40.name,
        errors = _ref40.errors;

    if (errors.length === 1) {
      return errors[0];
    }

    return "\"".concat(name, "\" has ").concat(errors.length, " validation errors:\n").concat(errors.map(function (e) {
      return "- ".concat(e);
    }).join("\n"));
  }
};

function valueToString$1(value) {
  switch (_typeof__default['default'](value)) {
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
  if (xs.length <= 2) {
    return xs.join(" ".concat(kind, " "));
  }

  var ys = _toConsumableArray__default['default'](xs);

  var last = ys.pop();
  return "".concat(ys.join(", "), ", ").concat(kind, " ").concat(last);
}

function plural(n, unit) {
  return "".concat(n, " ").concat(unit).concat(n === 1 ? "" : "s");
}

function isNotDuplicateValue(x, i, xs) {
  for (var j = 0; j < i; ++j) {
    if (x === xs[j]) {
      return false;
    }
  }

  return true;
}
/**
 * Validation errors.
 */


var ValidationError = /*#__PURE__*/function (_Error) {
  _inherits__default['default'](ValidationError, _Error);

  var _super = _createSuper(ValidationError);

  /**
   * Initialize this instance.
   * @param message The message generator.
   * @param name The target name.
   * @param errors The errors.
   */
  function ValidationError(message, name, errors) {
    var _this;

    _classCallCheck__default['default'](this, ValidationError);

    var _a, _b;

    _this = _super.call(this, toMessage(message, name, errors));
    _this.errors = errors;
    (_b = (_a = Error).captureStackTrace) === null || _b === void 0 ? void 0 : _b.call(_a, _assertThisInitialized__default['default'](_this), ValidationError);
    return _this;
  }

  return ValidationError;
}( /*#__PURE__*/_wrapNativeSuper__default['default'](Error));

function toMessage(message, name, errors) {
  return message.validation({
    name: name,
    errors: errors.map(function (e) {
      return message[e.code](e.args);
    })
  });
}
/**
 * Compile the validation function of a schema object.
 *
 * Once compiled, it validates values efficiently.
 *
 * The validation code is cached for each schema object into a `WeakMap` object.
 * When GC collected the schema object, the validation code of that is abandoned
 * together.
 *
 * @param schema The schema of the validation.
 * @param options The options.
 * @returns The validation function of the schema.
 */


function createValidation(schema) {
  var _ref41 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref41$defaultMessage = _ref41.defaultMessages,
      defaultMessages = _ref41$defaultMessage === void 0 ? DefaultMessage : _ref41$defaultMessage;

  var validateFn = createValidationOfSchema(schema);
  return function validate(value) {
    var _ref42 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref42$messages = _ref42.messages,
        messages = _ref42$messages === void 0 ? defaultMessages : _ref42$messages,
        _ref42$name = _ref42.name,
        name = _ref42$name === void 0 ? "value" : _ref42$name;

    var errors = validateFn(name, value);

    if (errors.length > 0) {
      throw new ValidationError(messages, name, errors);
    }
  };
}
/* eslint-disable class-methods-use-this */


var SchemaFactories = /*#__PURE__*/function () {
  function SchemaFactories() {
    _classCallCheck__default['default'](this, SchemaFactories);

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


  _createClass__default['default'](SchemaFactories, [{
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

      var _ref43 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref43$maxLength = _ref43.maxLength,
          maxLength = _ref43$maxLength === void 0 ? MaxArrayLength : _ref43$maxLength,
          _ref43$minLength = _ref43.minLength,
          minLength = _ref43$minLength === void 0 ? 0 : _ref43$minLength,
          _ref43$unique = _ref43.unique,
          unique = _ref43$unique === void 0 ? false : _ref43$unique;

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
      var _ref44 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          maxValue = _ref44.maxValue,
          minValue = _ref44.minValue;

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
      var _ref45 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref45$allowInfinity = _ref45.allowInfinity,
          allowInfinity = _ref45$allowInfinity === void 0 ? false : _ref45$allowInfinity,
          _ref45$allowNaN = _ref45.allowNaN,
          allowNaN = _ref45$allowNaN === void 0 ? false : _ref45$allowNaN,
          _ref45$intOnly = _ref45.intOnly,
          intOnly = _ref45$intOnly === void 0 ? false : _ref45$intOnly,
          maxValue = _ref45.maxValue,
          minValue = _ref45.minValue;

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
      var _ref46 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref46$allowUnknown = _ref46.allowUnknown,
          allowUnknown = _ref46$allowUnknown === void 0 ? false : _ref46$allowUnknown,
          _ref46$required = _ref46.required,
          required = _ref46$required === void 0 ? [] : _ref46$required;

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
      var _ref47 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref47$maxLength = _ref47.maxLength,
          maxLength = _ref47$maxLength === void 0 ? MaxStringLength : _ref47$maxLength,
          _ref47$minLength = _ref47.minLength,
          minLength = _ref47$minLength === void 0 ? 0 : _ref47$minLength,
          pattern = _ref47.pattern;

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
/**
 * Validate a value by a given schema.
 *
 * If the `value` passed the validation, the `value` gets the specific type that
 * is computed from the schema type `T`. Otherwise, the validation function
 * throws a validation error.
 *
 * The validation code is cached for each schema object into a `WeakMap` object.
 * When GC collected the schema object, the validation code of that is abandoned
 * together.
 *
 * The {@link createValidation} function creates the validation function of
 * schemas to validate values efficiently. Consider using that if you planned to
 * validate values many times.
 *
 * @param schema The schema of the validation.
 * @param value The value to validate.
 * @param options Optional. The options.
 * @throws {@link ValidationError} Thrown if the `value` didn't pass the
 * validation.
 */

function validate(schema, value) {
  var _ref48 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref48$messages = _ref48.messages,
      messages = _ref48$messages === void 0 ? DefaultMessage : _ref48$messages,
      _ref48$name = _ref48.name,
      name = _ref48$name === void 0 ? "value" : _ref48$name;

  var errors = createValidationOfSchema(schema)(name, value);

  if (errors.length > 0) {
    throw new ValidationError(messages, name, errors);
  }
}

exports.DefaultMessage = DefaultMessage;
exports.ValidationError = ValidationError;
exports.createValidation = createValidation;
exports.schemas = schemas;
exports.validate = validate;
