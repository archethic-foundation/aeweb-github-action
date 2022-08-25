'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _objectSpread = _interopDefault(require('@babel/runtime/helpers/objectSpread'));
var _objectWithoutProperties = _interopDefault(require('@babel/runtime/helpers/objectWithoutProperties'));
require('core-js/modules/es6.array.index-of');
require('core-js/modules/es6.function.bind');
var _newArrowCheck = _interopDefault(require('@babel/runtime/helpers/newArrowCheck'));
var utilsArray = require('@jumpn/utils-array');

var _this = undefined;

var removeObserver = function removeObserver(observers, observer) {
  _newArrowCheck(this, _this);

  return utilsArray.remove(observers.indexOf(observer), 1, observers);
}.bind(undefined);

var unobserve = function unobserve(_ref, observer) {
  var activeObservers = _ref.activeObservers,
      rest = _objectWithoutProperties(_ref, ["activeObservers"]);

  _newArrowCheck(this, _this);

  return _objectSpread({}, rest, {
    activeObservers: removeObserver(activeObservers, observer)
  });
}.bind(undefined);

module.exports = unobserve;
//# sourceMappingURL=unobserve.js.map
