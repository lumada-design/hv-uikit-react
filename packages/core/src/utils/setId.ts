import uniqueId from "lodash/uniqueId";

export const setId = (...args: any[]) =>
  args.some((arg) => arg == null) ? undefined : args.join("-");

export const setUid = (id: string, suffix: string) => {
  const uid = setId(id, suffix);
  return uid ? uniqueId(uid) : undefined;
};
