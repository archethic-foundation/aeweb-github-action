'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('core-js/modules/es6.function.bind');
var _newArrowCheck = _interopDefault(require('@babel/runtime/helpers/newArrowCheck'));

var _this = undefined;

var updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck(this, _this);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

module.exports = updateNotifiers;
//# sourceMappingURL=updateNotifiers.js.map
