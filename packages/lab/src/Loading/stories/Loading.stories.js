/* eslint-disable no-alert */
import * as React from "react";

import HvLoading from "../Loading";
import HvLoadingWithDelay from "../LoadingWithDelay";

export default {
  title: "Lab/Loading",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvLoading } from '@hv/uikit-react-lab/dist'"
  },
  component: HvLoading
};

export const Main = () => <HvLoading />;

export const WithDelay = () => <HvLoadingWithDelay delay={5000} />;

WithDelay.story = {
  parameters: {
    docs: {
      storyDescription: "A simple Loading example with Delay"
    }
  }
};
