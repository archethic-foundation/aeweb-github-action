// @flow

import type {GqlOperationType} from "./types";

const operationTypeRe = /^\s*(query|mutation|subscription|\{)/;

const getOperationTypeFromMatched = (matched: string): GqlOperationType =>
  matched === "{" ? "query" : (matched: any);

/**
 * Returns the type (query, mutation, or subscription) of the given operation
 *
 * @example
 *
 * const operation = `
 *   subscription userSubscription($userId: ID!) {
 *     user(userId: $userId) {
 *       id
 *       name
 *     }
 *   }
 * `;
 *
 * const operationType = getOperationType(operation);
 *
 * console.log(operationType); // "subscription"
 */
const getOperationType = (operation: string): GqlOperationType => {
  const result = operation.match(operationTypeRe);

  if (!result) {
    throw new TypeError(`Invalid operation:\n${operation}`);
  }

  return getOperationTypeFromMatched(result[1]);
};

export default getOperationType;
