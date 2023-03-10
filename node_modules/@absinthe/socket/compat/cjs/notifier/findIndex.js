'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

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

module.exports = findIndex;
//# sourceMappingURL=findIndex.js.map
