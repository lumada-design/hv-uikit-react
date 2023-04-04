import { Meta, StoryObj } from "@storybook/react";
import { HvCheckBox } from "~/components";
import { useState } from "react";
import { HvCheckBoxGroup, HvCheckBoxGroupProps } from "./CheckBoxGroup";

const meta: Meta<typeof HvCheckBoxGroup> = {
  title: "Components/Checkbox/Checkbox Group",
  component: HvCheckBoxGroup,
  parameters: {
    eyes: { include: false },
  },
};

export default meta;

export const Main: StoryObj<HvCheckBoxGroupProps> = {
  args: {
    showSelectAll: true,
    label: "Choose your favorite checkboxes",
    name: "favorite",
    description: "",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <HvCheckBoxGroup id="main" {...args}>
        <HvCheckBox label="Checkbox 1" value="1" />
        <HvCheckBox label="Checkbox 2" value="2" checked />
        <HvCheckBox label="Checkbox 3" value="3" />
      </HvCheckBoxGroup>
    );
  },
};

export const Horizontal: StoryObj<HvCheckBoxGroupProps> = {
  parameters: {
    docs: {
      description: { story: "Layout checkboxes horizontally." },
    },
  },
  render: () => {
    return (
      <HvCheckBoxGroup
        orientation="horizontal"
        label="Choose your favorite checkboxes"
        description="Horizontally, this time"
      >
        <HvCheckBox label="Checkbox 1" value="1" />
        <HvCheckBox label="Checkbox 2" value="2" checked />
        <HvCheckBox label="Checkbox 3" value="3" />
      </HvCheckBoxGroup>
    );
  },
};

export const Disabled: StoryObj<HvCheckBoxGroupProps> = {
  parameters: {
    docs: {
      description: { story: "Disabled checkbox group." },
    },
  },
  render: () => {
    return (
      <HvCheckBoxGroup
        showSelectAll
        disabled
        label="No way to choose"
        description="They're all disabled"
      >
        <HvCheckBox label="Checkbox 1" value="1" />
        <HvCheckBox label="Checkbox 2" value="2" checked />
        <HvCheckBox label="Checkbox 3" value="3" />
      </HvCheckBoxGroup>
    );
  },
};

export const ReadOnly: StoryObj<HvCheckBoxGroupProps> = {
  parameters: {
    docs: {
      description: { story: "Not editable checkbox group." },
    },
  },
  render: () => {
    return (
      <HvCheckBoxGroup
        id="readonly"
        showSelectAll
        readOnly
        label="Can't change anything"
      >
        <HvCheckBox label="Checkbox 1" value="1" />
        <HvCheckBox label="Checkbox 2" value="2" checked />
        <HvCheckBox label="Checkbox 3" value="3" />
      </HvCheckBoxGroup>
    );
  },
};

export const WithoutLabel: StoryObj<HvCheckBoxGroupProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A checkbox group without label. The accessible name is provided via the `aria-label` property.",
      },
    },
  },
  render: () => {
    return (
      <HvCheckBoxGroup aria-label="Non-visible label sample">
        <HvCheckBox label="Checkbox 1" value="1" />
        <HvCheckBox label="Checkbox 2" value="2" checked />
        <HvCheckBox label="Checkbox 3" value="3" />
      </HvCheckBoxGroup>
    );
  },
};

export const Required: StoryObj<HvCheckBoxGroupProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Required checkbox group. Uncheck all checkboxes to show default error message.",
      },
    },
  },
  render: () => {
    return (
      <HvCheckBoxGroup
        orientation="horizontal"
        label="Select at least one"
        required
      >
        <HvCheckBox label="Checkbox 1" value="1" />
        <HvCheckBox label="Checkbox 2" value="2" checked />
        <HvCheckBox label="Checkbox 3" value="3" />
      </HvCheckBoxGroup>
    );
  },
};

export const Controlled: StoryObj<HvCheckBoxGroupProps> = {
  parameters: {
    docs: {
      description: {
        story: "Controlled checkbox group.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(["2"]);

    const handleOnChange = (_, newValue) => {
      setValue(newValue);
    };

    return (
      <HvCheckBoxGroup
        label="Choose the best checkbox"
        value={value}
        onChange={handleOnChange}
        showSelectAll
      >
        <HvCheckBox label="Checkbox 1" value="1" />
        <HvCheckBox label="Checkbox 2" value="2" />
        <HvCheckBox label="Checkbox 3" value="3" />
      </HvCheckBoxGroup>
    );
  },
};

export const ErrorMessage: StoryObj<HvCheckBoxGroupProps> = {
  render: () => {
    return (
      <HvCheckBoxGroup
        status="invalid"
        statusMessage="No way for this to be valid!"
        label="Choose"
      >
        <HvCheckBox label="Checkbox 1" value="1" />
        <HvCheckBox label="Checkbox 2" value="2" checked />
        <HvCheckBox label="Checkbox 3" value="3" />
      </HvCheckBoxGroup>
    );
  },
};

export const ShiftSelect: StoryObj<HvCheckBoxGroupProps> = {
  render: () => {
    return (
      <HvCheckBoxGroup label="Choose the best checkbox">
        <HvCheckBox label="Checkbox 1" value="1" />
        <HvCheckBox label="Checkbox 2" value="2" />
        <HvCheckBox label="Checkbox 3" value="3" />
        <HvCheckBox label="Checkbox 4" value="4" />
        <HvCheckBox label="Checkbox 5" value="5" />
        <HvCheckBox label="Checkbox 6" value="6" />
      </HvCheckBoxGroup>
    );
  },
};
