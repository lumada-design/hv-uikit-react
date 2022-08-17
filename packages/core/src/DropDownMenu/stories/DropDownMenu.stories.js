import React, { useState } from "react";
import { Calendar, Plane, User } from "@hitachivantara/uikit-react-icons";

import { HvButton, HvDropDownMenu } from "../..";

export default {
  title: "Inputs/Dropdown/Dropdown Menu",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvDropDownMenu } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.6.0",
  },
  component: HvDropDownMenu,
  decorators: [
    (storyFn) => <div style={{ display: "flex", justifyContent: "center" }}>{storyFn()}</div>,
  ],
};

export const Main = () => (
  <HvDropDownMenu
    onClick={(e, item) => console.log(item.label)}
    dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
  />
);

Main.parameters = {
  eyes: { include: false },
};

export const Positioning = () => {
  const [position, setPosition] = useState("right");
  return (
    <HvDropDownMenu
      placement={position}
      keepOpened
      onClick={(e, item) => setPosition(item.value)}
      dataList={[
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ]}
    />
  );
};

Positioning.parameters = {
  docs: {
    description: { story: "DropDownMenu with configurable positioning in the dropdown" },
  },
  eyes: { include: false },
};

export const WithIconsAndActions = () => {
  const iconSelectedColor =
    (Icon) =>
    ({ isSelected }) =>
      <Icon color={isSelected ? "atmo1" : undefined} />;

  return (
    <HvDropDownMenu
      id="dropdownmenu-with-icons-and-actions"
      placement="right"
      onClick={(e, item) => console.log(item.label)}
      aria-label="dropdownMenu-3"
      dataList={[
        { label: "Label 1", icon: iconSelectedColor(User) },
        { label: "Label 2", icon: iconSelectedColor(Calendar) },
        { label: "Label 3", icon: iconSelectedColor(Plane) },
      ]}
    />
  );
};

WithIconsAndActions.parameters = {
  docs: {
    description: {
      story:
        "DropDownMenu with Icons and Actions. Icons should be colored accordingly when selected",
    },
  },
  eyes: { include: false },
};

export const Disabled = () => (
  <HvDropDownMenu
    disabled
    id="dropMenu"
    onClick={(e, item) => console.log(item.label)}
    disablePortal={false}
    aria-label="dropdownMenu-4"
    dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
  />
);

export const DisabledItems = () => (
  <HvDropDownMenu
    id="dpmDisabledItems"
    aria-label="dropdownMenu-DisabledItems"
    dataList={[{ label: "Label 1" }, { label: "Label 2", disabled: true }, { label: "Label 3" }]}
  />
);

DisabledItems.parameters = {
  eyes: { include: false },
};

export const Controlled = () => {
  const ControlledDropdownMenu = () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <HvButton
          category="ghost"
          onClick={() => {
            setOpen(!open);
          }}
          style={{ width: 125 }}
        >
          Click to&nbsp;
          {!open ? "Open" : "Close"}
        </HvButton>
        <HvDropDownMenu
          id="dropMenu"
          expanded={open}
          onClick={(e, item) => console.log(item.label)}
          disablePortal={false}
          aria-label="dropdownMenu-1"
          keepOpened={false}
          dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
          onToggle={(e, s) => {
            setOpen(s);
          }}
        />
      </>
    );
  };

  return <ControlledDropdownMenu />;
};

Controlled.parameters = {
  docs: {
    description: { story: "DropDownMenu toggle opening controlled by an external button" },
  },
  eyes: { include: false },
};
