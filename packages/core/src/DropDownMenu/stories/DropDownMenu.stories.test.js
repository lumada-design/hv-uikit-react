/* eslint-disable no-console */
import { makeStyles } from "@mui/styles";
import { screen, fireEvent } from "@storybook/testing-library";
import React, { useState } from "react";

import { HvButton, HvDropDownMenu, HvDialog, HvDialogContent, HvDialogTitle } from "../..";
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

export const ZIndexConfiguration = () => {
  const [open, setOpen] = useState(false);
  const classes = makeStyles((theme) => ({
    baseContainer: {
      zIndex: theme.zIndex.modal,
    },
  }))();

  return (
    <div>
      <HvDropDownMenu
        classes={{ baseContainer: classes.baseContainer }}
        dataList={[{ label: "Open Dialog" }]}
        onClick={() => setOpen(true)}
      />
      <HvDialog open={open} onClose={() => setOpen(false)}>
        <HvDialogTitle variant="warning">Switch model view?</HvDialogTitle>
        <HvDialogContent indentContent>
          Switching to model view will clear all the fields in your visualization. You will need to
          re-select your fields.
        </HvDialogContent>
      </HvDialog>
    </div>
  );
};
