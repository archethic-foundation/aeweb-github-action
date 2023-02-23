// @flow

import {curry} from "flow-static-land/lib/Fun";

import updateIn from "./updateIn";

import type {Composite, Path} from "./types";

/**
 * Returns a new composite with the result of having updated the property
 * located at the given path with the specified value.
 * 
 * (This does the same as calling **updateIn** with updater: `() => value`)
 */
const setIn = (path: Path, value: mixed, composite: Composite): Composite =>
  updateIn(path, () => value, composite);

export default curry(setIn);
