import uniqueId from "lodash/uniqueId";

export const setId = (...args) =>
  args.some((arg) => arg == null) ? undefined : args.join("-");

export const setUid = (id, suffix) => {
  const uid = setId(id, suffix);
  return uid ? uniqueId(uid) : undefined;
};
