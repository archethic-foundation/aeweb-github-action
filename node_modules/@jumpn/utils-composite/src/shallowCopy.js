// @flow

import type {Composite} from "./types";

/**
 * Returns a new composite with the same own enumerable props of the one given.
 */
const shallowCopy = <C: Composite>(composite: C): C =>
  Array.isArray(composite) ? [...composite] : {...composite};

export default shallowCopy;
