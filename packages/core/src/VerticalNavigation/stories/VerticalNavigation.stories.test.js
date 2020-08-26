// eslint-disable-next-line no-unused-vars
import React from "react";

import { Collapsable, CollapseOnExit } from "./VerticalNavigation.stories";

export default {
  title: "Tests/Navigation System/Vertical Navigation",
  parameters: {
    docs: {
      disable: true,
      page: null
    }
  }
};

// __________________________________
// Extended applitools test scenarios

// test scenario, Collapse
export const CollapsableOpened = () => Collapsable();

CollapsableOpened.story = {
  parameters: {
    eyes: {}
  }
};

// test scenario, Collapsable On Exit open
export const CollapseOnExitOpened = () => CollapseOnExit();

CollapseOnExitOpened.story = {
  parameters: {
    eyes: {}
  }
};
