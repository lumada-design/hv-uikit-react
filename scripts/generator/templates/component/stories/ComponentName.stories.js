import React from "react";

import { HvComponentName } from "../..";

export default {
  title: "Lab/ComponentName",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvComponentName } from "@hitachivantara/uikit-react-lab";',
  },
  component: HvComponentName,
};

export const Main = () => <HvComponentName />;

export const Sample2 = () => {
  return <HvComponentName id="sample2" />;
};

Sample2.story = {
  parameters: {
    docs: {
      storyDescription: "Sample 2 description.",
    },
  },
};
