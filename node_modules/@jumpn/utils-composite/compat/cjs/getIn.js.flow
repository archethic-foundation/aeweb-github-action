// @flow

import {curry} from "flow-static-land/lib/Fun";
import {isLastIndex} from "@jumpn/utils-array";

import get from "./get";
import isComposite from "./is";

import type {Composite, Path} from "./types";

const getInIfNeeded = (index, path, value) =>
  isLastIndex(path, index) ? value : getInRecur(index + 1, path, value);

const getNotCompositeErrorMessage = (index, path, maybeComposite) =>
  `Expected to find a composite at [${path.join(", ")}][${index}], ` +
  `but instead got: ${typeof maybeComposite}`;

const ensureIsComposite = (index, path, maybeComposite) => {
  if (isComposite(maybeComposite)) return maybeComposite;

  throw new Error(getNotCompositeErrorMessage(index, path, maybeComposite));
};

const getInRecur = (index, path, maybeComposite) =>
  maybeComposite === undefined
    ? undefined
    : getInIfNeeded(
        index,
        path,
        get(path[index], ensureIsComposite(index, path, maybeComposite))
      );

/**
 * Returns value located at the given path or undefined otherwise.
 */
const getIn = (path: Path, composite: Composite): any =>
  path.length === 0 ? undefined : getInRecur(0, path, composite);

export default curry(getIn);
