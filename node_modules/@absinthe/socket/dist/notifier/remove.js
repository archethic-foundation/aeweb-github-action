import { remove } from '@jumpn/utils-array';
import 'core-js/modules/es6.array.find-index';
import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';
import { hasIn } from '@jumpn/utils-composite';

var _this = undefined;

var findIndex = function findIndex(notifiers, key, value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this);

  return notifiers.findIndex(hasIn([key], value));
}.bind(undefined);

var _this$1 = undefined;

var remove$1 = function remove$$1(notifier) {
  var _this2 = this;

  _newArrowCheck(this, _this$1);

  return function (notifiers) {
    _newArrowCheck(this, _this2);

    return remove(findIndex(notifiers, "request", notifier.request), 1, notifiers);
  }.bind(this);
}.bind(undefined);

export default remove$1;
//# sourceMappingURL=remove.js.map
