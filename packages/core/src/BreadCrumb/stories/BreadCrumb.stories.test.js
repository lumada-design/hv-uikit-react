/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import { wait, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
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
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("button"));
        return wait(() => screen.getByText("Label 7"));
      }
    }
  }
};

// test scenario, drop/open hidden breadCrumb items
export const WithURLLimitedOpened = () => WithURLLimited();

WithURLLimitedOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("button"));
        return wait(() => screen.getByText("DesignSystem"));
      }
    }
  }
};
