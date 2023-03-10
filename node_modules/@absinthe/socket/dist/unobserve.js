import 'core-js/modules/es7.array.includes';
import 'core-js/modules/es6.string.includes';
import 'core-js/modules/es6.array.find-index';
import { hasIn } from '@jumpn/utils-composite';
import _objectSpread from '@babel/runtime/helpers/objectSpread';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import 'core-js/modules/es6.array.index-of';
import { replace, remove } from '@jumpn/utils-array';
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

var removeObserver = function removeObserver(observers, observer) {
  _newArrowCheck(this, _this$2);

  return remove(observers.indexOf(observer), 1, observers);
}.bind(undefined);

var unobserve = function unobserve(_ref, observer) {
  var activeObservers = _ref.activeObservers,
      rest = _objectWithoutProperties(_ref, ["activeObservers"]);

  _newArrowCheck(this, _this$2);

  return _objectSpread({}, rest, {
    activeObservers: removeObserver(activeObservers, observer)
  });
}.bind(undefined);

var _this$3 = undefined;

var updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck(this, _this$3);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

var _this$4 = undefined;

var ensureHasActiveObserver = function ensureHasActiveObserver(notifier, observer) {
  _newArrowCheck(this, _this$4);

  if (notifier.activeObservers.includes(observer)) return notifier;
  throw new Error("Observer is not attached to notifier");
}.bind(undefined);
/**
 * Detaches observer from notifier
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket";
 *
 * withAbsintheSocket.unobserve(absintheSocket, notifier, observer);
 */


var unobserve$1 = function unobserve$$1(absintheSocket, notifier, observer) {
  _newArrowCheck(this, _this$4);

  return updateNotifiers(absintheSocket, refresh(unobserve(ensureHasActiveObserver(notifier, observer), observer)));
}.bind(undefined);

export default unobserve$1;
//# sourceMappingURL=unobserve.js.map
