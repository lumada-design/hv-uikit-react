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
    eyes: {}
  }
};

// test scenario, modal with table open
export const TableOpened = () => CustomContent();

TableOpened.story = {
  parameters: {
    eyes: {}
  }
};

// test scenario, modal with inputs opened
export const inputsOpened = () => CustomContent();

inputsOpened.story = {
  parameters: {
    eyes: {}
  }
};
