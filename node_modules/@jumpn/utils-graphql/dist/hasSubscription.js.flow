// @flow

import type {DocumentNode} from "graphql/language/ast";

const isSubscription = definition =>
  definition.kind === "OperationDefinition" &&
  definition.operation === "subscription";

/**
 * Returns true if documentNode has a subscription or false otherwise
 */
const hasSubscription = (documentNode: DocumentNode): boolean =>
  documentNode.definitions.some(isSubscription);

export default hasSubscription;
