import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';

var absintheEventNames = {
  doc: "doc",
  unsubscribe: "unsubscribe"
};

var _this = undefined;

var createAbsintheUnsubscribeEvent = function createAbsintheUnsubscribeEvent(payload) {
  _newArrowCheck(this, _this);

  return {
    payload: payload,
    name: absintheEventNames.unsubscribe
  };
}.bind(undefined);

var createAbsintheDocEvent = function createAbsintheDocEvent(payload) {
  _newArrowCheck(this, _this);

  return {
    payload: payload,
    name: absintheEventNames.doc
  };
}.bind(undefined);

export { createAbsintheDocEvent, createAbsintheUnsubscribeEvent };
//# sourceMappingURL=absintheEventCreators.js.map
