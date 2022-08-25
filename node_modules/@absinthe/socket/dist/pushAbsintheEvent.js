import 'core-js/modules/es6.function.name';
import 'phoenix';
import 'core-js/modules/es6.array.find';
import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';
import { hasIn, map } from '@jumpn/utils-composite';

var _this = undefined;

var handlePush = function handlePush(push, handler) {
  _newArrowCheck(this, _this);

  return push.receive("ok", handler.onSucceed).receive("error", handler.onError).receive("timeout", handler.onTimeout);
}.bind(undefined);

var _this$1 = undefined;

var find = function find(notifiers, key, value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this$1);

  return notifiers.find(hasIn([key], value));
}.bind(undefined);

var _this$2 = undefined;

var getPushHandlerMethodGetter = function getPushHandlerMethodGetter(absintheSocket, request) {
  var _this2 = this;

  _newArrowCheck(this, _this$2);

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
  _newArrowCheck(this, _this$2);

  return map(getPushHandlerMethodGetter(absintheSocket, request), notifierPushHandler);
}.bind(undefined);

var pushAbsintheEvent = function pushAbsintheEvent(absintheSocket, request, notifierPushHandler, absintheEvent) {
  _newArrowCheck(this, _this$2);

  handlePush(absintheSocket.channel.push(absintheEvent.name, absintheEvent.payload), getPushHandler(absintheSocket, request, notifierPushHandler));
  return absintheSocket;
}.bind(undefined);

export default pushAbsintheEvent;
//# sourceMappingURL=pushAbsintheEvent.js.map
