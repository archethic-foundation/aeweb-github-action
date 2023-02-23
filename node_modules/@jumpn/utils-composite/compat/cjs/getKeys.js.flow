// @flow

import type {Composite, Key} from "./types";

/**
 * Get own enumerable keys.
 */
const getKeys = (composite: Composite): Array<Key> =>
  Array.isArray(composite) ? [...composite.keys()] : Object.keys(composite);

export default getKeys;
