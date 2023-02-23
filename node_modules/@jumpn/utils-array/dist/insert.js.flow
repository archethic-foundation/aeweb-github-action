// @flow

import {curry} from "flow-static-land/lib/Fun";

/**
 * Returns a new Array with the result of having inserted the given elements at
 * the specified index.
 */
const insert = <Element>(
  index: number,
  elements: Array<Element>,
  array: Array<Element>
): Array<Element> => [
  ...array.slice(0, index),
  ...elements,
  ...array.slice(index + 1)
];

export default curry(insert);
