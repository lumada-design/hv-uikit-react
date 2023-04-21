import { Meta, StoryObj } from "@storybook/react";
import { HvFormStatus, HvRadio } from "@core/components";
import React, { useState } from "react";
import { HvRadioGroup, HvRadioGroupProps } from "./RadioGroup";

const meta: Meta<typeof HvRadioGroup> = {
  title: "Components/Radio/Radio Group",
  component: HvRadioGroup,
};

export default meta;

export const Main: StoryObj<HvRadioGroupProps> = {
  args: {
    label: "Choose your favorite radio button",
    name: "favorite",
    description: "",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <HvRadioGroup {...args}>
        <HvRadio label="Radio 1" value="1" />
        <HvRadio label="Radio 2" value="2" checked />
        <HvRadio label="Radio 3" value="3" />
      </HvRadioGroup>
    );
  },
};

export const Horizontal: StoryObj<HvRadioGroupProps> = {
  parameters: {
    docs: {
      description: { story: "Layout radio buttons horizontally." },
    },
  },
  render: () => {
    return (
      <HvRadioGroup
        orientation="horizontal"
        label="Choose your favorite radio button"
        description="Horizontally, this time"
      >
        <HvRadio label="Radio 1" value="1" />
        <HvRadio label="Radio 2" value="2" checked />
        <HvRadio label="Radio 3" value="3" />
      </HvRadioGroup>
    );
  },
};

export const Disabled: StoryObj<HvRadioGroupProps> = {
  parameters: {
    docs: {
      description: { story: "Disabled radio button group." },
    },
  },
  render: () => {
    return (
      <HvRadioGroup
        disabled
        label="No way to choose"
        description="They're all disabled"
      >
        <HvRadio label="Radio 1" value="1" />
        <HvRadio label="Radio 2" value="2" checked />
        <HvRadio label="Radio 3" value="3" />
      </HvRadioGroup>
    );
  },
};

export const ReadOnly: StoryObj<HvRadioGroupProps> = {
  parameters: {
    docs: {
      description: { story: "Not editable radio button group." },
    },
  },
  render: () => {
    return (
      <HvRadioGroup readOnly label="Can't change anything">
        <HvRadio label="Radio 1" value="1" />
        <HvRadio label="Radio 2" value="2" checked />
        <HvRadio label="Radio 3" value="3" />
      </HvRadioGroup>
    );
  },
};

export const WithoutLabel: StoryObj<HvRadioGroupProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A radio button group without label. The accessible name is provided via the `aria-label` property.",
      },
    },
  },
  render: () => {
    return (
      <HvRadioGroup aria-label="Non-visible label sample">
        <HvRadio label="Radio 1" value="1" />
        <HvRadio label="Radio 2" value="2" checked />
        <HvRadio label="Radio 3" value="3" />
      </HvRadioGroup>
    );
  },
};

export const Controlled: StoryObj<HvRadioGroupProps> = {
  parameters: {
    docs: {
      description: {
        story: "Controlled radio button group.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string>("2");
    const [status, setStatus] = useState<HvFormStatus>("standBy");

    const handleOnChange = (
      _: React.ChangeEvent<HTMLInputElement>,
      newValue: string
    ) => {
      setValue(newValue);

      if (newValue === "none") {
        setStatus("invalid");
      } else {
        setStatus("valid");
      }
    };

    return (
      <HvRadioGroup
        label="Choose the best radio button"
        value={value}
        onChange={handleOnChange}
        status={status}
        statusMessage={'Don\'t select "None"!'}
      >
        <HvRadio label="None" value="none" />
        <HvRadio label="Radio 1" value="1" />
        <HvRadio label="Radio 2" value="2" />
      </HvRadioGroup>
    );
  },
};

export const ErrorMessage: StoryObj<HvRadioGroupProps> = {
  render: () => {
    return (
      <HvRadioGroup
        status="invalid"
        statusMessage="No way for this to be valid!"
        label="Choose"
      >
        <HvRadio label="Radio 1" value="1" />
        <HvRadio label="Radio 2" value="2" checked />
        <HvRadio label="Radio 3" value="3" />
      </HvRadioGroup>
    );
  },
};
