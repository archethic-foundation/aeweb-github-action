import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';

var _this = undefined;

/**
 * Creates a GqlRequest using given GqlRequestCompat
 *
 * @param {GqlRequestCompat<Variables>} gqlRequestCompat
 *
 * @return {GqlRequest<Variables>} 
 *
 * @example
 * const query = `
 *   query userQuery($userId: ID!) {
 *     user(userId: $userId) {
 *       id
 *       email
 *     }
 *   }
 * `;
 * 
 * console.log(requestFromCompat({query, variables: {userId: 10}}));
 * // {operation: "...", variables: {userId: 10}}
 */
var requestFromCompat = function requestFromCompat(_ref) {
  var operation = _ref.query,
      variables = _ref.variables;

  _newArrowCheck(this, _this);

  return variables ? {
    operation: operation,
    variables: variables
  } : {
    operation: operation
  };
}.bind(undefined);

export default requestFromCompat;
//# sourceMappingURL=requestFromCompat.js.map
