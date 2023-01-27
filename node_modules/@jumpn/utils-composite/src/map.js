// @flow

import {curry} from "flow-static-land/lib/Fun";

import type {Composite, Key} from "./types";

const mapObject = (mapper, object) =>
  Object.entries(object).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: mapper(value, key, object)
    }),
    {}
  );

/**
 * Maps values of the given composite using mapper
 */
const map = <C: Composite>(
  mapper: (value: any, key: Key, composite: $Supertype<C>) => any,
  composite: C
): $Supertype<C> =>
  Array.isArray(composite)
    ? composite.map(mapper)
    : mapObject(mapper, composite);

export default curry(map);
