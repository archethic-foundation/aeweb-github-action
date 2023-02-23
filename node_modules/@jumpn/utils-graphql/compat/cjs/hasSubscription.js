'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('core-js/modules/es6.array.some');
require('core-js/modules/es6.function.bind');
var _newArrowCheck = _interopDefault(require('@babel/runtime/helpers/newArrowCheck'));

var _this = undefined;

var isSubscription = function isSubscription(definition) {
  _newArrowCheck(this, _this);

  return definition.kind === "OperationDefinition" && definition.operation === "subscription";
}.bind(undefined);
/**
 * Returns true if documentNode has a subscription or false otherwise
 */


var hasSubscription = function hasSubscription(documentNode) {
  _newArrowCheck(this, _this);

  return documentNode.definitions.some(isSubscription);
}.bind(undefined);

module.exports = hasSubscription;
//# sourceMappingURL=hasSubscription.js.map
