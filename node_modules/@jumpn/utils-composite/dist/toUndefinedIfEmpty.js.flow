// @flow

import isEmpty from "./isEmpty";

import type {Composite} from "./types";

/**
 * Returns given composite if it has any own enumerable keys (is not empty) or
 * undefined otherwise
 *
 * @param {Composite} composite
 * 
 * @returns {Composite}
 */
const toUndefinedIfEmpty = <C: Composite>(composite: C): void | C =>
  isEmpty(composite) ? undefined : composite;

export default toUndefinedIfEmpty;
