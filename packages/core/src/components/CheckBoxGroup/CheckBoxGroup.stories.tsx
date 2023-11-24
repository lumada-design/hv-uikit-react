import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvCheckBox,
  HvCheckBoxGroup,
  HvCheckBoxGroupProps,
} from "@hitachivantara/uikit-react-core";
import { CSSInterpolation, css } from "@emotion/css";

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
    description: "This is a checkbox group",
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
      <HvCheckBoxGroup {...args}>
        <HvCheckBox label="Checkbox 1" value="1" />
        <HvCheckBox label="Checkbox 2" value="2" checked />
        <HvCheckBox label="Checkbox 3" value="3" />
      </HvCheckBoxGroup>
    );
  },
};

export const Variants: StoryObj<HvCheckBoxGroupProps> = {
  render: () => {
    const styles: { root: CSSInterpolation } = {
      root: {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      },
    };

    return (
      <div className={css(styles.root)}>
        <HvCheckBoxGroup showSelectAll required label="Required">
          <HvCheckBox label="Checkbox 1" value="1" />
          <HvCheckBox label="Checkbox 2" value="2" checked />
          <HvCheckBox label="Checkbox 3" value="3" />
        </HvCheckBoxGroup>
        <HvCheckBoxGroup showSelectAll disabled label="Disabled">
          <HvCheckBox label="Checkbox 1" value="1" />
          <HvCheckBox label="Checkbox 2" value="2" checked />
          <HvCheckBox label="Checkbox 3" value="3" />
        </HvCheckBoxGroup>
        <HvCheckBoxGroup showSelectAll readOnly label="Readonly">
          <HvCheckBox label="Checkbox 1" value="1" />
          <HvCheckBox label="Checkbox 2" value="2" checked />
          <HvCheckBox label="Checkbox 3" value="3" />
        </HvCheckBoxGroup>
        <HvCheckBoxGroup
          showSelectAll
          status="invalid"
          statusMessage="Oh no!"
          label="Invalid"
        >
          <HvCheckBox label="Checkbox 1" value="1" />
          <HvCheckBox label="Checkbox 2" value="2" checked />
          <HvCheckBox label="Checkbox 3" value="3" />
        </HvCheckBoxGroup>
      </div>
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

export const Controlled: StoryObj<HvCheckBoxGroupProps> = {
  parameters: {
    docs: {
      description: {
        story: "Controlled checkbox group.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    const [value, setValue] = useState(["2"]);

    const handleOnChange: HvCheckBoxGroupProps["onChange"] = (_, newValue) => {
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

export const ShiftSelect: StoryObj<HvCheckBoxGroupProps> = {
  parameters: {
    eyes: { include: false },
  },
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
