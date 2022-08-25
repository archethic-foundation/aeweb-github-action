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

export default notifyAll;
//# sourceMappingURL=notifyAll.js.map
