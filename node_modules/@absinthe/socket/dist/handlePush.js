import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';
import 'phoenix';

var _this = undefined;

var handlePush = function handlePush(push, handler) {
  _newArrowCheck(this, _this);

  return push.receive("ok", handler.onSucceed).receive("error", handler.onError).receive("timeout", handler.onTimeout);
}.bind(undefined);

export default handlePush;
//# sourceMappingURL=handlePush.js.map
