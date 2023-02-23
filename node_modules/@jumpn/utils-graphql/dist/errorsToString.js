import 'core-js/modules/es6.array.map';
import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';

var _this = undefined;

var locationsToString = function locationsToString(locations) {
  var _this2 = this;

  _newArrowCheck(this, _this);

  return locations.map(function (_ref) {
    var column = _ref.column,
        line = _ref.line;

    _newArrowCheck(this, _this2);

    return "".concat(line, ":").concat(column);
  }.bind(this)).join("; ");
}.bind(undefined);

var errorToString = function errorToString(_ref2) {
  var message = _ref2.message,
      locations = _ref2.locations;

  _newArrowCheck(this, _this);

  return message + (locations ? " (".concat(locationsToString(locations), ")") : "");
}.bind(undefined);
/**
 * Transforms an array of GqlError into a string.
 *
 * @example
 *
 * const gqlRespose = {
 *   errors: [
 *     {message: "First Error", locations: [{column: 10, line: 2}]},
 *     {message: "Second Error", locations: [{column: 2, line: 4}]}
 *   ]
 * }
 *
 * const error = errorsToString(gqlRespose.errors);
 * // string with the following:
 * // First Error (2:10)
 * // Second Error (4:2)
 */


var errorsToString = function errorsToString(gqlErrors) {
  _newArrowCheck(this, _this);

  return gqlErrors.map(errorToString).join("\n");
}.bind(undefined);

export default errorsToString;
//# sourceMappingURL=errorsToString.js.map
