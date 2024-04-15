import { useState } from "react";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvFormStatus,
  HvRadio,
  HvRadioGroup,
  HvRadioGroupProps,
} from "@hitachivantara/uikit-react-core";

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
    value: { control: { disable: true } },
    defaultValue: { control: { disable: true } },
    status: { control: { disable: true } },
    statusMessage: { control: { disable: true } },
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

export const Variants: StoryObj<HvRadioGroupProps> = {
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  render: () => {
    const classes = {
      root: css({
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }),
    };

    return (
      <div className={classes.root}>
        <HvRadioGroup required label="Required">
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" checked />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
        <HvRadioGroup disabled label="Disabled">
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" checked />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
        <HvRadioGroup readOnly label="Readonly">
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" checked />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
        <HvRadioGroup status="invalid" statusMessage="Oh no!" label="Invalid">
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" checked />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
      </div>
    );
  },
};

export const Horizontal: StoryObj<HvRadioGroupProps> = {
  parameters: {
    docs: {
      description: { story: "Layout radio buttons horizontally." },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
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
      newValue: string,
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
