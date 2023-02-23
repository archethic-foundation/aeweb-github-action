'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('core-js/modules/es6.function.bind');
var _newArrowCheck = _interopDefault(require('@babel/runtime/helpers/newArrowCheck'));
var utilsGraphql = require('@jumpn/utils-graphql');

var requestStatuses = {
  canceled: "canceled",
  canceling: "canceling",
  pending: "pending",
  sent: "sent",
  sending: "sending"
};

var _this = undefined;

var createUsing = function createUsing(request, operationType) {
  _newArrowCheck(this, _this);

  return {
    operationType: operationType,
    request: request,
    activeObservers: [],
    canceledObservers: [],
    isActive: true,
    requestStatus: requestStatuses.pending,
    subscriptionId: undefined
  };
}.bind(undefined);

var create = function create(request) {
  _newArrowCheck(this, _this);

  return createUsing(request, utilsGraphql.getOperationType(request.operation));
}.bind(undefined);

module.exports = create;
//# sourceMappingURL=create.js.map
