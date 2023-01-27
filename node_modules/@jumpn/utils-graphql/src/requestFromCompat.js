// @flow

import type {GqlRequest, GqlRequestCompat} from "./types";

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
const requestFromCompat = <Variables: void | Object>({
  query: operation,
  variables
}: GqlRequestCompat<Variables>): GqlRequest<Variables> =>
  variables ? {operation, variables} : {operation};

export default requestFromCompat;
