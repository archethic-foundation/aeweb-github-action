'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _objectSpread = _interopDefault(require('@babel/runtime/helpers/objectSpread'));
require('core-js/modules/es6.function.bind');
var _newArrowCheck = _interopDefault(require('@babel/runtime/helpers/newArrowCheck'));

var _this = undefined;

var reactivate = function reactivate(notifier) {
  _newArrowCheck(this, _this);

  return notifier.isActive ? notifier : _objectSpread({}, notifier, {
    isActive: true
  });
}.bind(undefined);

module.exports = reactivate;
//# sourceMappingURL=reactivate.js.map
