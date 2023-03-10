'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _toConsumableArray = _interopDefault(require('@babel/runtime/helpers/toConsumableArray'));
var _objectSpread = _interopDefault(require('@babel/runtime/helpers/objectSpread'));
var _objectWithoutProperties = _interopDefault(require('@babel/runtime/helpers/objectWithoutProperties'));
require('core-js/modules/es6.function.bind');
var _newArrowCheck = _interopDefault(require('@babel/runtime/helpers/newArrowCheck'));

var _this = undefined;

var cancel = function cancel(_ref) {
  var activeObservers = _ref.activeObservers,
      canceledObservers = _ref.canceledObservers,
      rest = _objectWithoutProperties(_ref, ["activeObservers", "canceledObservers"]);

  _newArrowCheck(this, _this);

  return _objectSpread({}, rest, {
    isActive: false,
    activeObservers: [],
    canceledObservers: _toConsumableArray(activeObservers).concat(_toConsumableArray(canceledObservers))
  });
}.bind(undefined);

module.exports = cancel;
//# sourceMappingURL=cancel.js.map
