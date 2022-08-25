'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('core-js/modules/es6.function.bind');
var _newArrowCheck = _interopDefault(require('@babel/runtime/helpers/newArrowCheck'));

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

exports.createAbsintheDocEvent = createAbsintheDocEvent;
exports.createAbsintheUnsubscribeEvent = createAbsintheUnsubscribeEvent;
//# sourceMappingURL=absintheEventCreators.js.map
