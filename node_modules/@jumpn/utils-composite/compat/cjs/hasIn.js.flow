// @flow

import isDeepEqual from "fast-deep-equal";
import {curry} from "flow-static-land/lib/Fun";

import getIn from "./getIn";

import type {Composite, Path} from "./types";

/**
 * Returns true if value located at given path is deeply equal to the one
 * specified.
 */
const hasIn = (path: Path, value: mixed, composite: Composite): boolean =>
  isDeepEqual(getIn(path, composite), value);

export default curry(hasIn);
