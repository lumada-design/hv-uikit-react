import { uniqueId } from "./helpers";

export const setId = (...args: any[]) =>
  args.some((arg) => arg == null) ? undefined : args.join("-");

/** @deprecated use `useUniqueId` instead */
export const setUid = (id: string, suffix: string) => {
  const uid = setId(id, suffix);
  return uid ? uniqueId(uid) : undefined;
};
