// eslint-disable-next-line import/no-extraneous-dependencies

export const allModes = {
  "Pentaho+ dawn": {
    theme: "pentahoPlus dawn",
  },
  "Pentaho+ wicked": {
    theme: "pentahoPlus wicked",
  },
  "DS5 dawn": {
    theme: "ds5 dawn",
  },
  "DS5 wicked": {
    theme: "ds5 wicked",
  },
  "DS3 dawn": {
    theme: "ds3 dawn",
  },
  "DS3 wicked": {
    theme: "ds3 wicked",
  },
};

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
