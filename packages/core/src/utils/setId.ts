import isNil from "lodash/isNil";
import uniqueId from "lodash/uniqueId";

export const setId = (...args) =>
  args.some(isNil) ? undefined : args.join("-");

export const setUid = (id, suffix) => {
  const uid = setId(id, suffix);
  return uid ? uniqueId(uid) : undefined;
};
