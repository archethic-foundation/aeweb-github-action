// @flow

import getKeys from "./getKeys";

import type {Composite} from "./types";

/**
 * Returns true if composite has no own enumerable keys (is empty) or false
 * otherwise
 */
const isEmpty = (composite: Composite): boolean =>
  getKeys(composite).length === 0;

export default isEmpty;
