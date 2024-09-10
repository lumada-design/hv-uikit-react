import { allModes } from "./modes";

/**
 * Builds the Chromatic object needed to enable snapshots in Storybook stories
 */
export const setupChromatic = (
  values: (keyof typeof allModes)[] = ["DS5 dawn"],
  delay = 0,
) => {
  const modes = values.reduce<Record<string, object>>((acc, cur) => {
    acc[cur] = allModes[cur];
    return acc;
  }, {});

  return {
    chromatic: {
      disableSnapshot: false, // enable Chromatic snapshot
      delay,
      modes,
    },
  };
};
