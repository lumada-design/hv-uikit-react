/* eslint-disable no-alert */
import * as React from "react";

import HvFooter from "../Footer";

export default {
  title: "Lab/Footer",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvFooter } from "@hitachivantara/uikit-react-lab";',
    deprecated: true,
    compNameToUse: "Footer component in Core package.",
  },
  component: HvFooter,
  decorators: [(storyFn) => <div style={{ height: "45px" }}>{storyFn()}</div>],
};

export const Main = () => <HvFooter />;
