/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import { wait, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
// eslint-disable-next-line no-unused-vars
import React from "react";

import { Main, CustomContent } from "./Modal.stories";

export default {
  title: "Tests/Modal",
  parameters: {
    docs: {
      disable: true,
      page: null
    }
  }
};

// __________________________________
// Extended applitools test scenarios

// test scenario, modal open
export const ModalOpened = () => Main();

ModalOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.click(screen.getByText("Open modal"));
        return wait(() => screen.getByRole("heading", { name: /switch model view\?/i }));
      }
    }
  }
};

// test scenario, modal with table open
export const TableOpened = () => CustomContent();

TableOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.click(screen.getByText("Table"));
        return wait(() => screen.getByRole("dialog"));
      }
    }
  }
};

// test scenario, modal with inputs opened
export const inputsOpened = () => CustomContent();

inputsOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        userEvent.click(screen.getByText("Inputs"));
        return wait(() => screen.getByRole("dialog"));
      }
    }
  }
};
