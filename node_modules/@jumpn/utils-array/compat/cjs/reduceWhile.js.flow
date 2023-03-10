// @flow

import {curry} from "flow-static-land/lib/Fun";

type ShouldProceed<Element, Result> = (
  element: Element,
  index: number,
  result: Result
) => boolean;

type Reduce<Element, Result> = (
  result: Result,
  element: Element,
  index: number
) => Result;

/**
 * Reduce the given array applying reduce function while shouldProceed function
 * returns true.
 */
const reduceWhile = <Element, Result>(
  shouldProceed: ShouldProceed<Element, Result>,
  reduce: Reduce<Element, Result>,
  resultInitial: Result,
  array: Array<Element>
): Result => {
  let result = resultInitial;

  array.every((element, index) => {
    const proceed = shouldProceed(element, index, result);

    if (proceed) {
      result = reduce(result, element, index);
    }

    return proceed;
  });

  return result;
};

export default curry(reduceWhile);
