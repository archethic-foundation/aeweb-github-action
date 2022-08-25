'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var utilsArray = require('@jumpn/utils-array');
require('core-js/modules/es6.array.find-index');
require('core-js/modules/es6.function.bind');
var _newArrowCheck = _interopDefault(require('@babel/runtime/helpers/newArrowCheck'));
var utilsComposite = require('@jumpn/utils-composite');

var _this = undefined;

var findIndex = function findIndex(notifiers, key, value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this);

  return notifiers.findIndex(utilsComposite.hasIn([key], value));
}.bind(undefined);

var _this$1 = undefined;

var remove = function remove(notifier) {
  var _this2 = this;

  _newArrowCheck(this, _this$1);

  return function (notifiers) {
    _newArrowCheck(this, _this2);

    return utilsArray.remove(findIndex(notifiers, "request", notifier.request), 1, notifiers);
  }.bind(this);
}.bind(undefined);

module.exports = remove;
//# sourceMappingURL=remove.js.map
