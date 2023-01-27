import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';
import { getOperationType } from '@jumpn/utils-graphql';

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

  return createUsing(request, getOperationType(request.operation));
}.bind(undefined);

export default create;
//# sourceMappingURL=create.js.map
