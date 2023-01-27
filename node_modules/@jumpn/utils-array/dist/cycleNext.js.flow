// @flow

import {curry} from "flow-static-land/lib/Fun";

import isLastIndex from "./isLastIndex";

/**
 * Returns 0 if current index is the last one, or returns next if it is not.
 */
const cycleNext = (array: Array<any>, currentIndex: number): number =>
  isLastIndex(array, currentIndex) ? 0 : currentIndex + 1;

export default curry(cycleNext);
