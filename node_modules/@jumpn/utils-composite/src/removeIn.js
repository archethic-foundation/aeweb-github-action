// @flow

import {curry} from "flow-static-land/lib/Fun";

import updateIn from "./updateIn";

import type {Composite, Path} from "./types";

const remove = () => updateIn.remove;

/**
 * Returns a new composite with the result of having removed the property
 * located at the given path.
 * 
 * (This does the same as calling **updateIn** with updater:
 * `() => updateIn.remove`)
 */
const removeIn = (path: Path, composite: Composite): Composite =>
  updateIn(path, remove, composite);

export default curry(removeIn);
