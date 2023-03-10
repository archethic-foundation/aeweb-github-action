// @flow

const getObjectLength = object => Math.max(...(Object.keys(object): any)) + 1;

/**
 * Creates a new array using the given object
 * If all of its entries are array keys.
 * 
 * (it could also have a property length with its size)
 */
const fromObject = (object: Object): Array<any> =>
  Array.from(
    "length" in object ? object : {...object, length: getObjectLength(object)}
  );

export default fromObject;
