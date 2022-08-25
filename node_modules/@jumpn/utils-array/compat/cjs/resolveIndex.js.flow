// @flow

import {curry} from "flow-static-land/lib/Fun";

/**
 * Returns an absolute index from a relative one.
 * 
 * Relative indexes differ from absolute ones in that they can be negative and
 * in those cases it would be as simple as substracting them from the length of
 * the array from where they belong to obtain their absolute counterparts.
 */
const resolveIndex = (array: Array<any>, relativeIndex: number): number =>
  relativeIndex < 0 ? array.length - relativeIndex : relativeIndex;

export default curry(resolveIndex);
