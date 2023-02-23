// @flow

import {curry} from "flow-static-land/lib/Fun";
import {isLastIndex} from "@jumpn/utils-array";

import get from "./get";
import hasKey from "./hasKey";
import remove from "./remove";
import shallowCopy from "./shallowCopy";

import type {Composite, Path} from "./types";

const createReduceContext = composite => {
  const origin = shallowCopy(composite);

  return {origin, current: origin, previous: undefined};
};

const set = (key, value, composite) => {
  // eslint-disable-next-line no-param-reassign
  composite[(key: any)] = value;

  return get(key, composite);
};

const updateSet = (path, index, value, context) => ({
  ...context,
  current: set(path[index], value, context.current),
  previous: context.current
});

const updateRemove = (path, index, context) => {
  const removed = remove(path[index], context.current);

  return index === 0
    ? {...context, current: removed, origin: removed}
    : {
        ...context,
        previous: set(path[index - 1], removed, (context.previous: any))
      };
};

const removeAction = Symbol("composite.updateIn.removeAction");

const update = (path, index, value, context) =>
  value === removeAction
    ? updateRemove(path, index, context)
    : updateSet(path, index, value, context);

const createSupporting = key => (typeof key === "number" ? [] : {});

const copyOrCreate = (key, nextKey, current) =>
  hasKey(key, current)
    ? shallowCopy(get(key, current))
    : createSupporting(nextKey);

const getNext = (path, updater, index, current) =>
  isLastIndex(path, index)
    ? updater(get(path[index], current))
    : copyOrCreate(path[index], path[index + 1], current);

const getReducer = (path, updater) => (context, key, index) =>
  update(path, index, getNext(path, updater, index, context.current), context);

/**
 * Returns a new composite with the result of having updated the property value
 * at the given path with the result of the call to updater function.
 * 
 * Entry removal is supported by returning `updateIn.remove` symbol on updater
 * function.
 */
const updateIn = (
  path: Path,
  updater: (prev: any) => any,
  composite: Composite
): Composite =>
  path.length === 0
    ? composite
    : path.reduce(getReducer(path, updater), createReduceContext(composite))
        .origin;

// we are doing this way and not returning an Object.assign construction, as
// that is not well typed (returns any)
const updateInCurried = curry(updateIn);

updateInCurried.remove = removeAction;

export default updateInCurried;
