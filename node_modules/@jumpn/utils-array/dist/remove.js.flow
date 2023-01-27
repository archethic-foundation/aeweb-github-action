// @flow

import {curry} from "flow-static-land/lib/Fun";

/**
 * Returns a new Array with the result of having removed the specified amount
 * (count) of elements at the given index.
 */
const remove = <Element>(
  index: number,
  count: number,
  array: Array<Element>
): Array<Element> => [...array.slice(0, index), ...array.slice(index + count)];

export default curry(remove);
