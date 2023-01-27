import _objectSpread from '@babel/runtime/helpers/objectSpread';
import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';

var _this = undefined;

var reactivate = function reactivate(notifier) {
  _newArrowCheck(this, _this);

  return notifier.isActive ? notifier : _objectSpread({}, notifier, {
    isActive: true
  });
}.bind(undefined);

export default reactivate;
//# sourceMappingURL=reactivate.js.map
