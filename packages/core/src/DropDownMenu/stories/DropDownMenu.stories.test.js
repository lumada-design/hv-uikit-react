/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import { screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
import React from "react";

import { HvButton, HvDropDownMenu } from "../..";
import { WithIconsAndActions, DisabledItems } from "./DropDownMenu.stories";

export default {
  title: "Tests/Dropdown Menu",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
  decorators: [
    (storyFn) => <div style={{ display: "flex", justifyContent: "center" }}>{storyFn()}</div>,
  ],
};

// __________________________________
// Extended robot test scenarios

export const KeyboardNavigation = () => (
  <>
    <HvButton id="button1">button1</HvButton>
    <HvDropDownMenu
      id="dpmKeepOpenedFalse"
      dataList={[{ label: "Label 1" }, { label: "Label 2", disabled: true }, { label: "Label 3" }]}
      onClick={(e, item) => console.log(item.label)}
      keepOpened={false}
    />
    <HvButton id="button2">button2</HvButton>
  </>
);

KeyboardNavigation.parameters = {
  eyes: { include: false },
};

// __________________________________
// Extended pa11y test scenarios

export const A11YClosed = () => (
  <HvDropDownMenu
    id="dropdownmenu-closed"
    onClick={(e, item) => console.log(item.label)}
    dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
  />
);

A11YClosed.parameters = {
  eyes: { include: false },
};

export const A11YOpen = () => (
  <HvDropDownMenu
    id="dropdownmenu-open"
    onClick={(e, item) => console.log(item.label)}
    dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
  />
);

A11YOpen.parameters = {
  pa11y: {
    actions: [
      // open menu before testing
      "click element #dropdownmenu-open-icon-button",
      "wait for element #dropdownmenu-open-list to be visible",
    ],
  },
  eyes: { include: false },
};

// __________________________________
// Extended applitools test scenarios

const openMenu = async () => {
  fireEvent.click(screen.getByRole("button"));

  const menu = await screen.findByRole("menu");

  // extra buffer to allow popper layout
  return new Promise((resolve) => setTimeout(() => resolve(menu), 1000));
};

// test scenario, With Icons And Actions opened
export const sWithIconsAndActions = () => WithIconsAndActions();

sWithIconsAndActions.parameters = {
  eyes: {
    runBefore() {
      return openMenu();
    },
  },
};

// test scenario, Disabled Items opened
export const sDisabledItems = () => DisabledItems();

sDisabledItems.parameters = {
  eyes: {
    runBefore() {
      return openMenu();
    },
  },
};
