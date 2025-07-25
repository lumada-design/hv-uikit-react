import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HvColorPicker,
  HvColorPickerProps,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvColorPicker> = {
  title: "Components/Color Picker",
  component: HvColorPicker,
};
export default meta;

export const Main: StoryObj<HvColorPickerProps> = {
  args: {
    label: "Color",
    showSavedColors: true,
    showCustomColors: true,
  },
  argTypes: {
    classes: { control: { disable: true } },
    description: { control: { disable: true } },
    "aria-label": { table: { disable: true } },
    "aria-describedby": { table: { disable: true } },
    "aria-labelledby": { table: { disable: true } },
  },
  render: (args) => {
    return (
      <HvColorPicker
        onChangeComplete={(value) => console.log(value)}
        {...args}
      />
    );
  },
};

export const IconOnly: StoryObj<HvColorPickerProps> = {
  parameters: {
    docs: {
      description: {
        story: "ColorPicker component that only shows an icon.",
      },
    },
  },
  render: () => {
    return (
      <HvColorPicker
        iconOnly
        label="Color"
        defaultValue="#477DBD"
        onChange={(color) => console.log(color)}
      />
    );
  },
};

export const ControlledColorPicker: StoryObj<HvColorPickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Controlled ColorPicker component using the onChangeComplete callback. You can use this color picker to change the color of the square.",
      },
    },
  },
  render: () => {
    const [color, setColor] = useState("#95AFE8");
    const [squareColor, setSquareColor] = useState("#95AFE8");

    return (
      <div className="flex gap-lg">
        <div
          className="grid place-items-center size-134px"
          style={{ backgroundColor: squareColor }}
        >
          <HvTypography variant="label">{squareColor}</HvTypography>
        </div>
        <HvColorPicker
          aria-label="Color"
          showSavedColors={false}
          onChange={(value) => setColor(value)}
          onChangeComplete={setSquareColor}
          value={color}
        />
      </div>
    );
  },
};

export const Test: StoryObj = {
  decorators: [(Story) => <div className="flex gap-xs">{Story()}</div>],
  render: () => (
    <>
      <HvColorPicker className="w-268px" label="Color" defaultExpanded />
      <HvColorPicker
        className="w-134px"
        label="Color"
        showSavedColors={false}
        showCustomColors={false}
        defaultValue="#F6941E"
        defaultExpanded
      />
      <HvColorPicker label="Color" iconOnly />
      <HvColorPicker label="Color" iconOnly defaultValue="#59941B" />
    </>
  ),
};
