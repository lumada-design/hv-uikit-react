/* eslint-disable react/prop-types, no-unused-vars */
import React from "react";

import { wait, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { AllComponents } from "./Card.stories";

export default {
  title: "Tests/Card",
  parameters: {
    docs: {
      disable: true,
      page: null
    }
  }
};

// __________________________________
// Extended applitools test scenarios

// test scenario, card selected and dropdownmenu opned
export const SelectedOpened = () => AllComponents();

SelectedOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.click(screen.getByRole("checkbox"));
        userEvent.click(screen.getByLabelText("Dropdown menu"));
        return wait(() => screen.getByText("Delete"));
      }
    }
  }
};
