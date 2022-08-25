import 'core-js/modules/web.dom.iterable';
import 'core-js/modules/es6.array.for-each';
import 'core-js/modules/es6.function.name';
import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';

var _this = undefined;

var getNotifier = function getNotifier(handlerName, payload) {
  var _this2 = this;

  _newArrowCheck(this, _this);

  return function (observer) {
    _newArrowCheck(this, _this2);

    return observer[handlerName] && observer[handlerName](payload);
  }.bind(this);
}.bind(undefined);

var getHandlerName = function getHandlerName(_ref) {
  var name = _ref.name;

  _newArrowCheck(this, _this);

  return "on".concat(name);
}.bind(undefined);

var notifyAll = function notifyAll(observers, event) {
  _newArrowCheck(this, _this);

  return observers.forEach(getNotifier(getHandlerName(event), event.payload));
}.bind(undefined);

var _this$1 = undefined;

var notifyActive = function notifyActive(notifier, event) {
  _newArrowCheck(this, _this$1);

  notifyAll(notifier.activeObservers, event);
  return notifier;
}.bind(undefined);

var eventNames = {
  abort: "Abort",
  cancel: "Cancel",
  error: "Error",
  result: "Result",
  start: "Start"
};

var _this$2 = undefined;

var createStartEvent = function createStartEvent(payload) {
  _newArrowCheck(this, _this$2);

  return {
    payload: payload,
    name: eventNames.start
  };
}.bind(undefined);

var createResultEvent = function createResultEvent(payload) {
  _newArrowCheck(this, _this$2);

  return {
    payload: payload,
    name: eventNames.result
  };
}.bind(undefined);

var createErrorEvent = function createErrorEvent(payload) {
  _newArrowCheck(this, _this$2);

  return {
    payload: payload,
    name: eventNames.error
  };
}.bind(undefined);

var createCancelEvent = function createCancelEvent() {
  _newArrowCheck(this, _this$2);

  return {
    name: eventNames.cancel,
    payload: undefined
  };
}.bind(undefined);

var createAbortEvent = function createAbortEvent(payload) {
  _newArrowCheck(this, _this$2);

  return {
    payload: payload,
    name: eventNames.abort
  };
}.bind(undefined);

var _this$3 = undefined;

var notifyResultEvent = function notifyResultEvent(notifier, result) {
  _newArrowCheck(this, _this$3);

  return notifyActive(notifier, createResultEvent(result));
}.bind(undefined);

export default notifyResultEvent;
//# sourceMappingURL=notifyResultEvent.js.map
