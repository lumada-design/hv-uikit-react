// eslint-disable-next-line no-unused-vars
import React from "react";

import { LimitedToTwoPaths, WithURLLimited } from "./BreadCrumb.stories";

export default {
  title: "Tests/Breadcrumb",
  parameters: {
    docs: {
      disable: true,
      page: null
    }
  }
};

// __________________________________
// Extended applitools test scenarios

// test scenario, drop/open hidden breadCrumb items
export const LimitedToTwoPathsOpened = () => LimitedToTwoPaths();

LimitedToTwoPathsOpened.story = {
  parameters: {
    eyes: {}
  }
};

// test scenario, drop/open hidden breadCrumb items
export const WithURLLimitedOpened = () => WithURLLimited();

WithURLLimitedOpened.story = {
  parameters: {
    eyes: {}
  }
};
