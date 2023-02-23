import 'core-js/modules/es6.array.find-index';
import 'core-js/modules/es6.array.find';
import 'core-js/modules/es6.function.name';
import { hasIn, map } from '@jumpn/utils-composite';
import 'phoenix';
import 'core-js/modules/web.dom.iterable';
import 'core-js/modules/es6.array.for-each';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import { requestToCompat, errorsToString, getOperationType } from '@jumpn/utils-graphql';
import Observable from 'zen-observable';
import 'core-js/modules/es7.array.includes';
import 'core-js/modules/es6.string.includes';
import _objectSpread from '@babel/runtime/helpers/objectSpread';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import 'core-js/modules/es6.array.index-of';
import { replace, remove, append } from '@jumpn/utils-array';
import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';

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

var _this$1 = undefined;

var getNotifier = function getNotifier(handlerName, payload) {
  var _this2 = this;

  _newArrowCheck(this, _this$1);

  return function (observer) {
    _newArrowCheck(this, _this2);

    return observer[handlerName] && observer[handlerName](payload);
  }.bind(this);
}.bind(undefined);

var getHandlerName = function getHandlerName(_ref) {
  var name = _ref.name;

  _newArrowCheck(this, _this$1);

  return "on".concat(name);
}.bind(undefined);

var notifyAll = function notifyAll(observers, event) {
  _newArrowCheck(this, _this$1);

  return observers.forEach(getNotifier(getHandlerName(event), event.payload));
}.bind(undefined);

var _this$2 = undefined;

var notifyCanceled = function notifyCanceled(notifier, event) {
  _newArrowCheck(this, _this$2);

  notifyAll(notifier.canceledObservers, event);
  return notifier;
}.bind(undefined);

var eventNames = {
  abort: "Abort",
  cancel: "Cancel",
  error: "Error",
  result: "Result",
  start: "Start"
};

var _this$3 = undefined;

var createStartEvent = function createStartEvent(payload) {
  _newArrowCheck(this, _this$3);

  return {
    payload: payload,
    name: eventNames.start
  };
}.bind(undefined);

var createResultEvent = function createResultEvent(payload) {
  _newArrowCheck(this, _this$3);

  return {
    payload: payload,
    name: eventNames.result
  };
}.bind(undefined);

var createErrorEvent = function createErrorEvent(payload) {
  _newArrowCheck(this, _this$3);

  return {
    payload: payload,
    name: eventNames.error
  };
}.bind(undefined);

var createCancelEvent = function createCancelEvent() {
  _newArrowCheck(this, _this$3);

  return {
    name: eventNames.cancel,
    payload: undefined
  };
}.bind(undefined);

var createAbortEvent = function createAbortEvent(payload) {
  _newArrowCheck(this, _this$3);

  return {
    payload: payload,
    name: eventNames.abort
  };
}.bind(undefined);

var _this$4 = undefined;

var clearCanceled = function clearCanceled(notifier) {
  _newArrowCheck(this, _this$4);

  return _objectSpread({}, notifier, {
    canceledObservers: []
  });
}.bind(undefined);

var flushCanceled = function flushCanceled(notifier) {
  _newArrowCheck(this, _this$4);

  return notifier.canceledObservers.length > 0 ? clearCanceled(notifyCanceled(notifier, createCancelEvent())) : notifier;
}.bind(undefined);

var _this$5 = undefined;

var findIndex = function findIndex(notifiers, key, value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this$5);

  return notifiers.findIndex(hasIn([key], value));
}.bind(undefined);

var _this$6 = undefined;

var refresh = function refresh(notifier) {
  var _this2 = this;

  _newArrowCheck(this, _this$6);

  return function (notifiers) {
    _newArrowCheck(this, _this2);

    return replace(findIndex(notifiers, "request", notifier.request), [notifier], notifiers);
  }.bind(this);
}.bind(undefined);

var _this$7 = undefined;

var remove$1 = function remove$$1(notifier) {
  var _this2 = this;

  _newArrowCheck(this, _this$7);

  return function (notifiers) {
    _newArrowCheck(this, _this2);

    return remove(findIndex(notifiers, "request", notifier.request), 1, notifiers);
  }.bind(this);
}.bind(undefined);

var _this$8 = undefined;

var updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck(this, _this$8);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

var _this$9 = undefined;

var refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
  _newArrowCheck(this, _this$9);

  updateNotifiers(absintheSocket, refresh(notifier));
  return notifier;
}.bind(undefined);

var requestStatuses = {
  canceled: "canceled",
  canceling: "canceling",
  pending: "pending",
  sent: "sent",
  sending: "sending"
};

var _this$a = undefined;

var getObservers = function getObservers(_ref) {
  var activeObservers = _ref.activeObservers,
      canceledObservers = _ref.canceledObservers;

  _newArrowCheck(this, _this$a);

  return _toConsumableArray(activeObservers).concat(_toConsumableArray(canceledObservers));
}.bind(undefined);

var notify = function notify(notifier, event) {
  _newArrowCheck(this, _this$a);

  notifyAll(getObservers(notifier), event);
  return notifier;
}.bind(undefined);

var _this$b = undefined;

var abortNotifier = function abortNotifier(absintheSocket, notifier, error) {
  _newArrowCheck(this, _this$b);

  return updateNotifiers(absintheSocket, remove$1(notify(notifier, createAbortEvent(error))));
}.bind(undefined);

var _this$c = undefined;

var find = function find(notifiers, key, value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this$c);

  return notifiers.find(hasIn([key], value));
}.bind(undefined);

var _this$d = undefined;

var notifyActive = function notifyActive(notifier, event) {
  _newArrowCheck(this, _this$d);

  notifyAll(notifier.activeObservers, event);
  return notifier;
}.bind(undefined);

var _this$e = undefined;

var notifyResultEvent = function notifyResultEvent(notifier, result) {
  _newArrowCheck(this, _this$e);

  return notifyActive(notifier, createResultEvent(result));
}.bind(undefined);

var _this$f = undefined;

var notifyStartEvent = function notifyStartEvent(notifier) {
  _newArrowCheck(this, _this$f);

  return notifyActive(notifier, createStartEvent(notifier));
}.bind(undefined);

var _this$g = undefined;

var reset = function reset(notifier) {
  _newArrowCheck(this, _this$g);

  return flushCanceled(_objectSpread({}, notifier, {
    isActive: true,
    requestStatus: requestStatuses.pending,
    subscriptionId: undefined
  }));
}.bind(undefined);

var _this$h = undefined;

var handlePush = function handlePush(push, handler) {
  _newArrowCheck(this, _this$h);

  return push.receive("ok", handler.onSucceed).receive("error", handler.onError).receive("timeout", handler.onTimeout);
}.bind(undefined);

var _this$i = undefined;

var getPushHandlerMethodGetter = function getPushHandlerMethodGetter(absintheSocket, request) {
  var _this2 = this;

  _newArrowCheck(this, _this$i);

  return function (handle) {
    var _this3 = this;

    _newArrowCheck(this, _this2);

    return function () {
      _newArrowCheck(this, _this3);

      var notifier = find(absintheSocket.notifiers, "request", request);

      if (notifier) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        handle.apply(void 0, [absintheSocket, notifier].concat(args));
      }
    }.bind(this);
  }.bind(this);
}.bind(undefined);

var getPushHandler = function getPushHandler(absintheSocket, request, notifierPushHandler) {
  _newArrowCheck(this, _this$i);

  return map(getPushHandlerMethodGetter(absintheSocket, request), notifierPushHandler);
}.bind(undefined);

var pushAbsintheEvent = function pushAbsintheEvent(absintheSocket, request, notifierPushHandler, absintheEvent) {
  _newArrowCheck(this, _this$i);

  handlePush(absintheSocket.channel.push(absintheEvent.name, absintheEvent.payload), getPushHandler(absintheSocket, request, notifierPushHandler));
  return absintheSocket;
}.bind(undefined);

var absintheEventNames = {
  doc: "doc",
  unsubscribe: "unsubscribe"
};

var _this$j = undefined;

var createAbsintheUnsubscribeEvent = function createAbsintheUnsubscribeEvent(payload) {
  _newArrowCheck(this, _this$j);

  return {
    payload: payload,
    name: absintheEventNames.unsubscribe
  };
}.bind(undefined);

var createAbsintheDocEvent = function createAbsintheDocEvent(payload) {
  _newArrowCheck(this, _this$j);

  return {
    payload: payload,
    name: absintheEventNames.doc
  };
}.bind(undefined);

var _this$k = undefined;

var pushAbsintheDocEvent = function pushAbsintheDocEvent(absintheSocket, _ref, notifierPushHandler) {
  var request = _ref.request;

  _newArrowCheck(this, _this$k);

  return pushAbsintheEvent(absintheSocket, request, notifierPushHandler, createAbsintheDocEvent(requestToCompat(request)));
}.bind(undefined);

var setNotifierRequestStatusSending = function setNotifierRequestStatusSending(absintheSocket, notifier) {
  _newArrowCheck(this, _this$k);

  return refreshNotifier(absintheSocket, _objectSpread({}, notifier, {
    requestStatus: requestStatuses.sending
  }));
}.bind(undefined);

var createRequestError = function createRequestError(message) {
  _newArrowCheck(this, _this$k);

  return new Error("request: ".concat(message));
}.bind(undefined);

var onTimeout = function onTimeout(absintheSocket, notifier) {
  _newArrowCheck(this, _this$k);

  return notifyActive(notifier, createErrorEvent(createRequestError("timeout")));
}.bind(undefined);

var onError = function onError(absintheSocket, notifier, errorMessage) {
  _newArrowCheck(this, _this$k);

  return abortNotifier(absintheSocket, notifier, createRequestError(errorMessage));
}.bind(undefined);

var getNotifierPushHandler = function getNotifierPushHandler(onSucceed) {
  _newArrowCheck(this, _this$k);

  return {
    onError: onError,
    onSucceed: onSucceed,
    onTimeout: onTimeout
  };
}.bind(undefined);

var pushRequestUsing = function pushRequestUsing(absintheSocket, notifier, onSucceed) {
  _newArrowCheck(this, _this$k);

  return pushAbsintheDocEvent(absintheSocket, setNotifierRequestStatusSending(absintheSocket, notifier), getNotifierPushHandler(onSucceed));
}.bind(undefined);

var _this$l = undefined;

var onUnsubscribeSucceedCanceled = function onUnsubscribeSucceedCanceled(absintheSocket, notifier) {
  _newArrowCheck(this, _this$l);

  return updateNotifiers(absintheSocket, remove$1(flushCanceled(notifier)));
}.bind(undefined);

var onUnsubscribeSucceedActive = function onUnsubscribeSucceedActive(absintheSocket, notifier) {
  _newArrowCheck(this, _this$l);

  return subscribe(absintheSocket, refreshNotifier(absintheSocket, reset(notifier)));
}.bind(undefined);

var createUnsubscribeError = function createUnsubscribeError(message) {
  _newArrowCheck(this, _this$l);

  return new Error("unsubscribe: ".concat(message));
}.bind(undefined);

var unsubscribeHandler = {
  onError: function onError$$1(absintheSocket, notifier, errorMessage) {
    _newArrowCheck(this, _this$l);

    return abortNotifier(absintheSocket, notifier, createUnsubscribeError(errorMessage));
  }.bind(undefined),
  onTimeout: function onTimeout(absintheSocket, notifier) {
    _newArrowCheck(this, _this$l);

    return notifyCanceled(notifier, createErrorEvent(createUnsubscribeError("timeout")));
  }.bind(undefined),
  onSucceed: function onSucceed(absintheSocket, notifier) {
    _newArrowCheck(this, _this$l);

    if (notifier.isActive) {
      onUnsubscribeSucceedActive(absintheSocket, notifier);
    } else {
      onUnsubscribeSucceedCanceled(absintheSocket, notifier);
    }
  }.bind(undefined)
};

var pushAbsintheUnsubscribeEvent = function pushAbsintheUnsubscribeEvent(absintheSocket, _ref) {
  var request = _ref.request,
      subscriptionId = _ref.subscriptionId;

  _newArrowCheck(this, _this$l);

  return pushAbsintheEvent(absintheSocket, request, unsubscribeHandler, createAbsintheUnsubscribeEvent({
    subscriptionId: subscriptionId
  }));
}.bind(undefined);

var unsubscribe = function unsubscribe(absintheSocket, notifier) {
  _newArrowCheck(this, _this$l);

  return pushAbsintheUnsubscribeEvent(absintheSocket, refreshNotifier(absintheSocket, _objectSpread({}, notifier, {
    requestStatus: requestStatuses.canceling
  })));
}.bind(undefined);

var onSubscribeSucceed = function onSubscribeSucceed(absintheSocket, notifier, _ref2) {
  var subscriptionId = _ref2.subscriptionId;

  _newArrowCheck(this, _this$l);

  var subscribedNotifier = refreshNotifier(absintheSocket, _objectSpread({}, notifier, {
    subscriptionId: subscriptionId,
    requestStatus: requestStatuses.sent
  }));

  if (subscribedNotifier.isActive) {
    notifyStartEvent(subscribedNotifier);
  } else {
    unsubscribe(absintheSocket, subscribedNotifier);
  }
}.bind(undefined);

var onSubscribe = function onSubscribe(absintheSocket, notifier, response) {
  _newArrowCheck(this, _this$l);

  if (response.errors) {
    onError(absintheSocket, notifier, errorsToString(response.errors));
  } else {
    onSubscribeSucceed(absintheSocket, notifier, response);
  }
}.bind(undefined);

var subscribe = function subscribe(absintheSocket, notifier) {
  _newArrowCheck(this, _this$l);

  return pushRequestUsing(absintheSocket, notifier, onSubscribe);
}.bind(undefined);

var onDataMessage = function onDataMessage(absintheSocket, _ref3) {
  var payload = _ref3.payload;

  _newArrowCheck(this, _this$l);

  var notifier = find(absintheSocket.notifiers, "subscriptionId", payload.subscriptionId);

  if (notifier) {
    notifyResultEvent(notifier, payload.result);
  }
}.bind(undefined);

var dataMessageEventName = "subscription:data";

var isDataMessage = function isDataMessage(message) {
  _newArrowCheck(this, _this$l);

  return message.event === dataMessageEventName;
}.bind(undefined);

var _this$m = undefined;

var cancelQueryOrMutationSending = function cancelQueryOrMutationSending(absintheSocket, notifier) {
  _newArrowCheck(this, _this$m);

  return updateNotifiers(absintheSocket, refresh(flushCanceled(cancel(notifier))));
}.bind(undefined);

var cancelQueryOrMutationIfSending = function cancelQueryOrMutationIfSending(absintheSocket, notifier) {
  _newArrowCheck(this, _this$m);

  return notifier.requestStatus === requestStatuses.sending ? cancelQueryOrMutationSending(absintheSocket, notifier) : absintheSocket;
}.bind(undefined);

var cancelPending = function cancelPending(absintheSocket, notifier) {
  _newArrowCheck(this, _this$m);

  return updateNotifiers(absintheSocket, remove$1(flushCanceled(cancel(notifier))));
}.bind(undefined);

var cancelQueryOrMutation = function cancelQueryOrMutation(absintheSocket, notifier) {
  _newArrowCheck(this, _this$m);

  return notifier.requestStatus === requestStatuses.pending ? cancelPending(absintheSocket, notifier) : cancelQueryOrMutationIfSending(absintheSocket, notifier);
}.bind(undefined);

var unsubscribeIfNeeded = function unsubscribeIfNeeded(absintheSocket, notifier) {
  _newArrowCheck(this, _this$m);

  return notifier.requestStatus === requestStatuses.sent ? unsubscribe(absintheSocket, notifier) : absintheSocket;
}.bind(undefined);

var cancelNonPendingSubscription = function cancelNonPendingSubscription(absintheSocket, notifier) {
  _newArrowCheck(this, _this$m);

  return unsubscribeIfNeeded(absintheSocket, refreshNotifier(absintheSocket, cancel(notifier)));
}.bind(undefined);

var cancelSubscription = function cancelSubscription(absintheSocket, notifier) {
  _newArrowCheck(this, _this$m);

  return notifier.requestStatus === requestStatuses.pending ? cancelPending(absintheSocket, notifier) : cancelNonPendingSubscription(absintheSocket, notifier);
}.bind(undefined);

var cancelActive = function cancelActive(absintheSocket, notifier) {
  _newArrowCheck(this, _this$m);

  return notifier.operationType === "subscription" ? cancelSubscription(absintheSocket, notifier) : cancelQueryOrMutation(absintheSocket, notifier);
}.bind(undefined);
/**
 * Cancels a notifier sending a Cancel event to all its observers and
 * unsubscribing in case it holds a subscription request
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket";
 *
 * withAbsintheSocket.cancel(absintheSocket, notifier);
 */


var cancel$1 = function cancel$$1(absintheSocket, notifier) {
  _newArrowCheck(this, _this$m);

  return notifier.isActive ? cancelActive(absintheSocket, notifier) : absintheSocket;
}.bind(undefined);

var _this$n = undefined;

var setNotifierRequestStatusSent = function setNotifierRequestStatusSent(absintheSocket, notifier) {
  _newArrowCheck(this, _this$n);

  return refreshNotifier(absintheSocket, _objectSpread({}, notifier, {
    requestStatus: requestStatuses.sent
  }));
}.bind(undefined);

var onQueryOrMutationSucceed = function onQueryOrMutationSucceed(absintheSocket, notifier, response) {
  _newArrowCheck(this, _this$n);

  return updateNotifiers(absintheSocket, remove$1(notifyResultEvent(setNotifierRequestStatusSent(absintheSocket, notifier), response)));
}.bind(undefined);

var pushQueryOrMutation = function pushQueryOrMutation(absintheSocket, notifier) {
  _newArrowCheck(this, _this$n);

  return pushRequestUsing(absintheSocket, notifyStartEvent(notifier), onQueryOrMutationSucceed);
}.bind(undefined);

var pushRequest = function pushRequest(absintheSocket, notifier) {
  _newArrowCheck(this, _this$n);

  if (notifier.operationType === "subscription") {
    subscribe(absintheSocket, notifier);
  } else {
    pushQueryOrMutation(absintheSocket, notifier);
  }
}.bind(undefined);

var _this$o = undefined;

var createChannelJoinError = function createChannelJoinError(message) {
  _newArrowCheck(this, _this$o);

  return new Error("channel join: ".concat(message));
}.bind(undefined);

var notifyErrorToAllActive = function notifyErrorToAllActive(absintheSocket, errorMessage) {
  var _this2 = this;

  _newArrowCheck(this, _this$o);

  return absintheSocket.notifiers.forEach(function (notifier) {
    _newArrowCheck(this, _this2);

    return notifyActive(notifier, createErrorEvent(createChannelJoinError(errorMessage)));
  }.bind(this));
}.bind(undefined); // join Push is reused and so the handler
// https://github.com/phoenixframework/phoenix/blob/master/assets/js/phoenix.js#L356


var createChannelJoinHandler = function createChannelJoinHandler(absintheSocket) {
  var _this3 = this;

  _newArrowCheck(this, _this$o);

  return {
    onError: function onError(errorMessage) {
      _newArrowCheck(this, _this3);

      return notifyErrorToAllActive(absintheSocket, errorMessage);
    }.bind(this),
    onSucceed: function onSucceed() {
      var _this4 = this;

      _newArrowCheck(this, _this3);

      return absintheSocket.notifiers.forEach(function (notifier) {
        _newArrowCheck(this, _this4);

        return pushRequest(absintheSocket, notifier);
      }.bind(this));
    }.bind(this),
    onTimeout: function onTimeout() {
      _newArrowCheck(this, _this3);

      return notifyErrorToAllActive(absintheSocket, "timeout");
    }.bind(this)
  };
}.bind(undefined);

var joinChannel = function joinChannel(absintheSocket) {
  _newArrowCheck(this, _this$o);

  handlePush(absintheSocket.channel.join(), createChannelJoinHandler(absintheSocket));
  absintheSocket.channelJoinCreated = true;
  return absintheSocket;
}.bind(undefined);

var _this$p = undefined;

var onMessage = function onMessage(absintheSocket) {
  var _this2 = this;

  _newArrowCheck(this, _this$p);

  return function (message) {
    _newArrowCheck(this, _this2);

    if (isDataMessage(message)) {
      onDataMessage(absintheSocket, message);
    }
  }.bind(this);
}.bind(undefined);

var createConnectionCloseError = function createConnectionCloseError() {
  _newArrowCheck(this, _this$p);

  return new Error("connection: close");
}.bind(undefined);

var notifyConnectionCloseError = function notifyConnectionCloseError(notifier) {
  _newArrowCheck(this, _this$p);

  return notify(notifier, createErrorEvent(createConnectionCloseError()));
}.bind(undefined);

var notifierOnConnectionCloseCanceled = function notifierOnConnectionCloseCanceled(absintheSocket, notifier) {
  _newArrowCheck(this, _this$p);

  return updateNotifiers(absintheSocket, remove$1(notifyConnectionCloseError(notifier)));
}.bind(undefined);

var notifierOnConnectionCloseActive = function notifierOnConnectionCloseActive(absintheSocket, notifier) {
  _newArrowCheck(this, _this$p);

  if (notifier.operationType === "mutation") {
    abortNotifier(absintheSocket, notifier, createConnectionCloseError());
  } else {
    refreshNotifier(absintheSocket, reset(notifyConnectionCloseError(notifier)));
  }
}.bind(undefined);

var notifierOnConnectionClose = function notifierOnConnectionClose(absintheSocket) {
  var _this3 = this;

  _newArrowCheck(this, _this$p);

  return function (notifier) {
    _newArrowCheck(this, _this3);

    if (notifier.isActive) {
      notifierOnConnectionCloseActive(absintheSocket, notifier);
    } else {
      notifierOnConnectionCloseCanceled(absintheSocket, notifier);
    }
  }.bind(this);
}.bind(undefined);

var onConnectionClose = function onConnectionClose(absintheSocket) {
  var _this4 = this;

  _newArrowCheck(this, _this$p);

  return function () {
    _newArrowCheck(this, _this4);

    return absintheSocket.notifiers.forEach(notifierOnConnectionClose(absintheSocket));
  }.bind(this);
}.bind(undefined);

var shouldJoinChannel = function shouldJoinChannel(absintheSocket) {
  _newArrowCheck(this, _this$p);

  return !absintheSocket.channelJoinCreated && absintheSocket.notifiers.length > 0;
}.bind(undefined);

var onConnectionOpen = function onConnectionOpen(absintheSocket) {
  var _this5 = this;

  _newArrowCheck(this, _this$p);

  return function () {
    _newArrowCheck(this, _this5);

    if (shouldJoinChannel(absintheSocket)) {
      joinChannel(absintheSocket);
    }
  }.bind(this);
}.bind(undefined);

var absintheChannelName = "__absinthe__:control";
/**
 * Creates an Absinthe Socket using the given Phoenix Socket instance
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket";
 * import {Socket as PhoenixSocket} from "phoenix";

 * const absintheSocket = withAbsintheSocket.create(
 *   new PhoenixSocket("ws://localhost:4000/socket")
 * );
 */

var create = function create(phoenixSocket) {
  _newArrowCheck(this, _this$p);

  var absintheSocket = {
    phoenixSocket: phoenixSocket,
    channel: phoenixSocket.channel(absintheChannelName),
    channelJoinCreated: false,
    notifiers: []
  };
  phoenixSocket.onOpen(onConnectionOpen(absintheSocket));
  phoenixSocket.onClose(onConnectionClose(absintheSocket));
  phoenixSocket.onMessage(onMessage(absintheSocket));
  return absintheSocket;
}.bind(undefined);

var _this$q = undefined;

var observe = function observe(_ref, observer) {
  var activeObservers = _ref.activeObservers,
      rest = _objectWithoutProperties(_ref, ["activeObservers"]);

  _newArrowCheck(this, _this$q);

  return _objectSpread({}, rest, {
    activeObservers: _toConsumableArray(activeObservers).concat([observer]),
    isActive: true
  });
}.bind(undefined);

var _this$r = undefined;

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
  _newArrowCheck(this, _this$r);

  return refreshNotifier(absintheSocket, observe(notifier, observer));
}.bind(undefined);

var _this$s = undefined;

var createUsing = function createUsing(request, operationType) {
  _newArrowCheck(this, _this$s);

  return {
    operationType: operationType,
    request: request,
    activeObservers: [],
    canceledObservers: [],
    isActive: true,
    requestStatus: requestStatuses.pending,
    subscriptionId: undefined
  };
}.bind(undefined);

var create$1 = function create(request) {
  _newArrowCheck(this, _this$s);

  return createUsing(request, getOperationType(request.operation));
}.bind(undefined);

var _this$t = undefined;

var reactivate = function reactivate(notifier) {
  _newArrowCheck(this, _this$t);

  return notifier.isActive ? notifier : _objectSpread({}, notifier, {
    isActive: true
  });
}.bind(undefined);

var _this$u = undefined;

var connectOrJoinChannel = function connectOrJoinChannel(absintheSocket) {
  _newArrowCheck(this, _this$u);

  if (absintheSocket.phoenixSocket.isConnected()) {
    joinChannel(absintheSocket);
  } else {
    // socket ignores connect calls if a connection has already been created
    absintheSocket.phoenixSocket.connect();
  }
}.bind(undefined);

var sendNew = function sendNew(absintheSocket, request) {
  _newArrowCheck(this, _this$u);

  var notifier = create$1(request);
  updateNotifiers(absintheSocket, append([notifier]));

  if (absintheSocket.channelJoinCreated) {
    pushRequest(absintheSocket, notifier);
  } else {
    connectOrJoinChannel(absintheSocket);
  }

  return notifier;
}.bind(undefined);

var updateCanceledReactivate = function updateCanceledReactivate(absintheSocket, notifier) {
  _newArrowCheck(this, _this$u);

  return refreshNotifier(absintheSocket, reactivate(notifier));
}.bind(undefined);

var updateCanceled = function updateCanceled(absintheSocket, notifier) {
  _newArrowCheck(this, _this$u);

  return notifier.requestStatus === requestStatuses.sending ? updateCanceledReactivate(absintheSocket, flushCanceled(notifier)) : updateCanceledReactivate(absintheSocket, notifier);
}.bind(undefined);

var updateIfCanceled = function updateIfCanceled(absintheSocket, notifier) {
  _newArrowCheck(this, _this$u);

  return notifier.isActive ? notifier : updateCanceled(absintheSocket, notifier);
}.bind(undefined);

var getExistentIfAny = function getExistentIfAny(absintheSocket, request) {
  _newArrowCheck(this, _this$u);

  var notifier = find(absintheSocket.notifiers, "request", request);
  return notifier && updateIfCanceled(absintheSocket, notifier);
}.bind(undefined);
/**
 * Sends given request and returns an object (notifier) to track its progress
 * (see observe function)
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket";
 *
 * const operation = `
 *   subscription userSubscription($userId: ID!) {
 *     user(userId: $userId) {
 *       id
 *       name
 *     }
 *   }
 * `;
 *
 * // This example uses a subscription, but the functionallity is the same for
 * // all operation types (queries, mutations and subscriptions)
 *
 * const notifier = withAbsintheSocket.send(absintheSocket, {
 *   operation,
 *   variables: {userId: 10}
 * });
 */


var send = function send(absintheSocket, request) {
  _newArrowCheck(this, _this$u);

  return getExistentIfAny(absintheSocket, request) || sendNew(absintheSocket, request);
}.bind(undefined);

var _this$v = undefined;

// prettier-ignore
var getUnsubscriber = function getUnsubscriber(absintheSocket, _ref, observer, unsubscribe) {
  var _this2 = this;

  var request = _ref.request;

  _newArrowCheck(this, _this$v);

  return function () {
    _newArrowCheck(this, _this2);

    var notifier = find(absintheSocket.notifiers, "request", request);
    unsubscribe(absintheSocket, notifier, notifier ? observer : undefined);
  }.bind(this);
}.bind(undefined);

var onResult = function onResult(_ref2, observableObserver) {
  var _this3 = this;

  var operationType = _ref2.operationType;

  _newArrowCheck(this, _this$v);

  return function (result) {
    _newArrowCheck(this, _this3);

    observableObserver.next(result);

    if (operationType !== "subscription") {
      observableObserver.complete();
    }
  }.bind(this);
}.bind(undefined);

var createObserver = function createObserver(notifier, handlers, observableObserver) {
  _newArrowCheck(this, _this$v);

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

  _newArrowCheck(this, _this$v);

  return new Observable(function (observableObserver) {
    _newArrowCheck(this, _this4);

    var observer = createObserver(notifier, handlers, observableObserver);
    observe$1(absintheSocket, notifier, observer);
    return unsubscribe && getUnsubscriber(absintheSocket, notifier, observer, unsubscribe);
  }.bind(this));
}.bind(undefined);

var _this$w = undefined;

var removeObserver = function removeObserver(observers, observer) {
  _newArrowCheck(this, _this$w);

  return remove(observers.indexOf(observer), 1, observers);
}.bind(undefined);

var unobserve = function unobserve(_ref, observer) {
  var activeObservers = _ref.activeObservers,
      rest = _objectWithoutProperties(_ref, ["activeObservers"]);

  _newArrowCheck(this, _this$w);

  return _objectSpread({}, rest, {
    activeObservers: removeObserver(activeObservers, observer)
  });
}.bind(undefined);

var _this$x = undefined;

var ensureHasActiveObserver = function ensureHasActiveObserver(notifier, observer) {
  _newArrowCheck(this, _this$x);

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
  _newArrowCheck(this, _this$x);

  return updateNotifiers(absintheSocket, refresh(unobserve(ensureHasActiveObserver(notifier, observer), observer)));
}.bind(undefined);

var _this$y = undefined;

var doUnobserveOrCancel = function doUnobserveOrCancel(absintheSocket, notifier, observer) {
  _newArrowCheck(this, _this$y);

  return notifier.activeObservers.length === 1 ? cancel$1(absintheSocket, notifier) : unobserve$1(absintheSocket, notifier, observer);
}.bind(undefined);
/**
 * Cancels notifier if there are no more observers apart from the one given, or
 * detaches given observer from notifier otherwise
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket";
 *
 * withAbsintheSocket.unobserve(absintheSocket, notifier, observer);
 */


var unobserveOrCancel = function unobserveOrCancel(absintheSocket, notifier, observer) {
  _newArrowCheck(this, _this$y);

  return notifier.isActive ? doUnobserveOrCancel(absintheSocket, notifier, observer) : absintheSocket;
}.bind(undefined);

export { cancel$1 as cancel, create, observe$1 as observe, send, toObservable, unobserve$1 as unobserve, unobserveOrCancel };
//# sourceMappingURL=index.js.map
