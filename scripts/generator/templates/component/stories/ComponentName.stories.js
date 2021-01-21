import React from "react";
import { HvComponentName } from "../..";

export default {
  title: "Components/ComponentName",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvComponentName } from "@hv/uikit-react-core";'
  },
  component: HvComponentName
};

export const Main = () => <HvComponentName />;

export const Sample2 = () => {
  return <HvComponentName id="sample2" />;
};

Sample2.story = {
  parameters: {
    docs: {
      storyDescription: "Sample 2 description."
    }
  }
};
