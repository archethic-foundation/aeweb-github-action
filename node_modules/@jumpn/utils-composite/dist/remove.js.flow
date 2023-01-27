// @flow

import {curry} from "flow-static-land/lib/Fun";
import {remove as arrayRemove} from "@jumpn/utils-array";

import type {Composite, Key} from "./types";

// $FlowFixMe: flow does not understand the following construction
const objectRemove = (key, {[key]: removed, ...rest}) => rest;

/**
 * Returns a new composite with the result of having removed the property with
 * the given key.
 */
const remove = (key: Key, composite: Composite): Composite =>
  Array.isArray(composite)
    ? arrayRemove((key: any), 1, composite)
    : objectRemove(key, composite);

export default curry(remove);
