import { allModes } from "./modes";

export const getModes = (values: (keyof typeof allModes)[]) =>
  values.reduce<Record<string, object>>((acc, cur) => {
    acc[cur] = allModes[cur];
    return acc;
  }, {});
