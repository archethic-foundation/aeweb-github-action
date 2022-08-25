import { replace } from '@jumpn/utils-array';
import 'core-js/modules/es6.array.find-index';
import { hasIn } from '@jumpn/utils-composite';
import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';

var _this = undefined;

var findIndex = function findIndex(notifiers, key, value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this);

  return notifiers.findIndex(hasIn([key], value));
}.bind(undefined);

var _this$1 = undefined;

var refresh = function refresh(notifier) {
  var _this2 = this;

  _newArrowCheck(this, _this$1);

  return function (notifiers) {
    _newArrowCheck(this, _this2);

    return replace(findIndex(notifiers, "request", notifier.request), [notifier], notifiers);
  }.bind(this);
}.bind(undefined);

var _this$2 = undefined;

var updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck(this, _this$2);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

var _this$3 = undefined;

var refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
  _newArrowCheck(this, _this$3);

  updateNotifiers(absintheSocket, refresh(notifier));
  return notifier;
}.bind(undefined);

export default refreshNotifier;
//# sourceMappingURL=refreshNotifier.js.map
