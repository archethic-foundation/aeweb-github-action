import 'core-js/modules/es6.array.some';
import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';

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

export default hasSubscription;
//# sourceMappingURL=hasSubscription.js.map
