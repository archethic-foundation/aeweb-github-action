// @flow

import isKey from "./isKey";

/**
 * Returns true if an Array can be created from the given Object, or in other
 * words, if it has or not a length property, and the rest of its keys are Array
 * ones.
 */
const isPossibleFromObject = ({length, ...rest}: Object): boolean =>
  Object.keys(rest).every(isKey);

export default isPossibleFromObject;
