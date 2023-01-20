import { Meta, StoryObj } from "@storybook/react";
import {
  HvFormStatus,
  HvListItem,
  HvSelectionList,
  HvSelectionListProps,
} from "components";
import { useState } from "react";

const meta: Meta<typeof HvSelectionList> = {
  title: "Inputs/Selection List",
  component: HvSelectionList,
};
export default meta;

export const Main: StoryObj<HvSelectionListProps> = {
  args: {
    label: "Choose your favorite items",
    orientation: "vertical",
    required: false,
    disabled: false,
    readOnly: false,
    description: "This is where you choose your favorite item",
    status: "valid",
    statusMessage: "My custom status message",
    multiple: false,
    singleSelectionToggle: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <HvSelectionList {...args}>
        <HvListItem value="1">ListItem 1</HvListItem>
        <HvListItem value="2" selected>
          ListItem 2
        </HvListItem>
        <HvListItem value="3">ListItem 3</HvListItem>
      </HvSelectionList>
    );
  },
};

export const Controlled: StoryObj<HvSelectionListProps> = {
  parameters: {
    docs: {
      description: {
        story: "Controlled selection list.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(["2"]);
    const [status, setStatus] = useState<HvFormStatus>("standBy");

    const handleOnChange = (_evt, newValue) => {
      setValue(newValue);

      if (newValue === "0") {
        setStatus("invalid");
      } else {
        setStatus("valid");
      }
    };

    return (
      <HvSelectionList
        label="Choose the best item"
        value={value}
        onChange={handleOnChange}
        status={status}
        statusMessage={'Don\'t select "ListItem 0"!'}
      >
        <HvListItem value="0">ListItem 0</HvListItem>
        <HvListItem value="1">ListItem 1</HvListItem>
        <HvListItem value="2">ListItem 2</HvListItem>
      </HvSelectionList>
    );
  },
};

export const CleanMultiSelection: StoryObj<HvSelectionListProps> = {
  render: () => {
    return (
      <HvSelectionList
        id="main"
        label="Choose your favorite items"
        name="favorite"
        multiple
      >
        <HvListItem value="1">ListItem 1</HvListItem>
        <HvListItem value="2">ListItem 2</HvListItem>
        <HvListItem value="3">ListItem 3</HvListItem>
        <HvListItem value="4">ListItem 4</HvListItem>
        <HvListItem value="5">ListItem 5</HvListItem>
        <HvListItem value="6">ListItem 6</HvListItem>
      </HvSelectionList>
    );
  },
};
