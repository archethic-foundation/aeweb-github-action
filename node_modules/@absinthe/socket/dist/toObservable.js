import Observable from 'zen-observable';
import 'core-js/modules/es6.array.find';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _objectSpread from '@babel/runtime/helpers/objectSpread';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import { replace } from '@jumpn/utils-array';
import 'core-js/modules/es6.array.find-index';
import { hasIn } from '@jumpn/utils-composite';
import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';

var _this = undefined;

var find = function find(notifiers, key, value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this);

  return notifiers.find(hasIn([key], value));
}.bind(undefined);

var _this$1 = undefined;

var observe = function observe(_ref, observer) {
  var activeObservers = _ref.activeObservers,
      rest = _objectWithoutProperties(_ref, ["activeObservers"]);

  _newArrowCheck(this, _this$1);

  return _objectSpread({}, rest, {
    activeObservers: _toConsumableArray(activeObservers).concat([observer]),
    isActive: true
  });
}.bind(undefined);

var _this$2 = undefined;

var findIndex = function findIndex(notifiers, key, value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this$2);

  return notifiers.findIndex(hasIn([key], value));
}.bind(undefined);

var _this$3 = undefined;

var refresh = function refresh(notifier) {
  var _this2 = this;

  _newArrowCheck(this, _this$3);

  return function (notifiers) {
    _newArrowCheck(this, _this2);

    return replace(findIndex(notifiers, "request", notifier.request), [notifier], notifiers);
  }.bind(this);
}.bind(undefined);

var _this$4 = undefined;

var updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck(this, _this$4);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

var _this$5 = undefined;

var refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
  _newArrowCheck(this, _this$5);

  updateNotifiers(absintheSocket, refresh(notifier));
  return notifier;
}.bind(undefined);

var _this$6 = undefined;

/**
 * Observes given notifier using the provided observer
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket"
 *
 * const logEvent = eventName => (...args) => console.log(eventName, ...args);
 *
 * const updatedNotifier = withAbsintheSocket.observe(absintheSocket, notifier, {
 *   onAbort: logEvent("abort"),
 *   onError: logEvent("error"),
 *   onStart: logEvent("open"),
 *   onResult: logEvent("result")
 * });
 */
var observe$1 = function observe$$1(absintheSocket, notifier, observer) {
  _newArrowCheck(this, _this$6);

  return refreshNotifier(absintheSocket, observe(notifier, observer));
}.bind(undefined);

var _this$7 = undefined;

// prettier-ignore
var getUnsubscriber = function getUnsubscriber(absintheSocket, _ref, observer, unsubscribe) {
  var _this2 = this;

  var request = _ref.request;

  _newArrowCheck(this, _this$7);

  return function () {
    _newArrowCheck(this, _this2);

    var notifier = find(absintheSocket.notifiers, "request", request);
    unsubscribe(absintheSocket, notifier, notifier ? observer : undefined);
  }.bind(this);
}.bind(undefined);

var onResult = function onResult(_ref2, observableObserver) {
  var _this3 = this;

  var operationType = _ref2.operationType;

  _newArrowCheck(this, _this$7);

  return function (result) {
    _newArrowCheck(this, _this3);

    observableObserver.next(result);

    if (operationType !== "subscription") {
      observableObserver.complete();
    }
  }.bind(this);
}.bind(undefined);

var createObserver = function createObserver(notifier, handlers, observableObserver) {
  _newArrowCheck(this, _this$7);

  return _objectSpread({}, handlers, {
    onAbort: observableObserver.error.bind(observableObserver),
    onResult: onResult(notifier, observableObserver)
  });
}.bind(undefined);
/**
 * Creates an Observable that will follow the given notifier
 *
 * @param {AbsintheSocket} absintheSocket
 * @param {Notifier<Result, Variables>} notifier
 * @param {Object} [options]
 * @param {function(error: Error): undefined} [options.onError]
 * @param {function(notifier: Notifier<Result, Variables>): undefined} [options.onStart]
 * @param {function(): undefined} [options.unsubscribe]
 *
 * @return {Observable}
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket";
 *
 * const unobserveOrCancelIfNeeded = (absintheSocket, notifier, observer) => {
 *   if (notifier && observer) {
 *     withAbsintheSocket.unobserveOrCancel(absintheSocket, notifier, observer);
 *   }
 * };
 *
 * const logEvent = eventName => (...args) => console.log(eventName, ...args);
 *
 * const observable = withAbsintheSocket.toObservable(absintheSocket, notifier, {
 *   onError: logEvent("error"),
 *   onStart: logEvent("open"),
 *   unsubscribe: unobserveOrCancelIfNeeded
 * });
 */


var toObservable = function toObservable(absintheSocket, notifier) {
  var _this4 = this;

  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      unsubscribe = _ref3.unsubscribe,
      handlers = _objectWithoutProperties(_ref3, ["unsubscribe"]);

  _newArrowCheck(this, _this$7);

  return new Observable(function (observableObserver) {
    _newArrowCheck(this, _this4);

    var observer = createObserver(notifier, handlers, observableObserver);
    observe$1(absintheSocket, notifier, observer);
    return unsubscribe && getUnsubscriber(absintheSocket, notifier, observer, unsubscribe);
  }.bind(this));
}.bind(undefined);

export default toObservable;
//# sourceMappingURL=toObservable.js.map
