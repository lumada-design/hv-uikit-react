/* eslint-disable no-alert */
import * as React from "react";

import HvFooter from "../Footer";

export default {
  title: "Lab/Footer",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvFooter } from '@hv/uikit-react-lab/dist'"
  },
  component: HvFooter,
  decorators: [storyFn => <div style={{ height: "45px" }}>{storyFn()}</div>]
};

export const Main = () => <HvFooter />;
