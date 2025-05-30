// eslint-disable-next-line import/no-extraneous-dependencies
import { allModes } from ".../../../.storybook/modes";

/**
 * Builds the Chromatic object needed to enable snapshots in Storybook stories
 */
export const setupChromatic = (
  values: (keyof typeof allModes)[] = ["DS5 dawn"],
  delay = 0,
  options?: Record<string, any>, // TODO: import typings & merge with delay
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
      ...options,
    },
  };
};

export const renderStory = (story: any, ctx: any) => {
  return story.render?.(story.args, ctx);
};
