import React, { useState } from "react";
import { Calendar, Plane, User } from "@hv/uikit-react-icons/dist";
import { HvButton, HvDropDownMenu } from "../..";

/* eslint-disable react/prop-types */

export default {
  title: "Components/Dropdown Menu",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvDropDownMenu } from '@hv/uikit-react-core/dist'"
  },
  component: HvDropDownMenu,
  decorators: [
    storyFn => <div style={{ display: "flex", justifyContent: "center" }}>{storyFn()}</div>
  ]
};

export const Main = () => (
  <HvDropDownMenu
    onClick={(e, item) => console.log(item.label)}
    dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
  />
);

export const Positioning = () => {
  const [position, setPosition] = useState("right");
  return (
    <HvDropDownMenu
      placement={position}
      keepOpened
      onClick={(e, item) => setPosition(item.value)}
      dataList={[
        { label: "Left", value: "left" },
        { label: "Right", value: "right" }
      ]}
    />
  );
};

Positioning.story = {
  parameters: {
    docs: {
      storyDescription: "DropDownMenu with configurable positioning in the dropdown"
    }
  }
};

export const WithIconsAndActions = () => {
  const iconSelectedColor = Icon => ({ isSelected }) => (
    <Icon color={isSelected ? "atmo1" : undefined} />
  );

  return (
    <HvDropDownMenu
      placement="right"
      onClick={(e, item) => console.log(item.label)}
      aria-label="dropdownMenu-3"
      dataList={[
        { label: "Label 1", iconCallback: iconSelectedColor(User) },
        { label: "Label 2", iconCallback: iconSelectedColor(Calendar) },
        { label: "Label 3", iconCallback: iconSelectedColor(Plane) }
      ]}
    />
  );
};

WithIconsAndActions.story = {
  parameters: {
    docs: {
      storyDescription:
        "DropDownMenu with Icons and Actions. Icons should be colored accordingly when selected"
    }
  }
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

export const Controlled = () => {
  const ControlledDropdownMenu = () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <HvButton category="ghost" onClick={() => setOpen(prevState => !prevState)}>
          {open ? "Close" : "Open"}
        </HvButton>
        <HvDropDownMenu
          id="dropMenu"
          expanded={open}
          onClick={(e, item) => console.log(item.label)}
          onToggleOpen={value => setOpen(value)}
          disablePortal={false}
          aria-label="dropdownMenu-1"
          keepOpened={false}
          dataList={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
        />
      </>
    );
  };

  return <ControlledDropdownMenu />;
};

Controlled.story = {
  parameters: {
    docs: {
      storyDescription: "DropDownMenu toggle opening controlled by an external button"
    }
  }
};
