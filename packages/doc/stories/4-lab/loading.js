import React from "react";
import { storiesOf } from "@storybook/react";
import HvLoading from "@hv/uikit-react-lab/dist/Loading";

storiesOf("Lab", module).add("Loading", () => <HvLoading />, {
  title: "Loading",
  description: "A Loading Component component, still in development",
  usage: "import HvLoading from '@hv/uikit-react-lab/dist/Loading'",
  examples: [
    {
      title: "1. Simple",
      description: "A simple Loading example",
      src: "lab/loading/loadingSample.js"
    },
    {
      title: "2. With Delay",
      description: "A simple Loading example with Delay",
      src: "lab/loading/loadingWithDelaySample.js"
    }
  ]
});
