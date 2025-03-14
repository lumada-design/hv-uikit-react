import { useState } from "react";
import { css } from "@emotion/css";
import { Decorator, Meta, StoryObj } from "@storybook/react";
import {
  HvColorPicker,
  HvColorPickerProps,
  HvStack,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

const makeDecorator =
  (styles: React.CSSProperties): Decorator =>
  (Story) => <div style={styles}>{Story()}</div>;

const meta: Meta<typeof HvColorPicker> = {
  title: "Widgets/Color Picker",
  component: HvColorPicker,
};
export default meta;

export const Main: StoryObj<HvColorPickerProps> = {
  args: {
    label: "Color",
  },
  argTypes: {
    classes: { control: { disable: true } },
    description: { control: { disable: true } },
    "aria-label": { table: { disable: true } },
    "aria-describedby": { table: { disable: true } },
    "aria-labelledby": { table: { disable: true } },
  },
  decorators: [makeDecorator({ display: "flex", height: 550 })],
  render: (args) => {
    return (
      <HvColorPicker
        onChangeComplete={(value) => console.log(value)}
        {...args}
      />
    );
  },
};

export const WithoutSavedColors: StoryObj<HvColorPickerProps> = {
  parameters: {
    docs: {
      description: {
        story: "ColorPicker component without the saved colors area.",
      },
    },
  },
  decorators: [makeDecorator({ display: "flex", height: 480 })],
  render: () => {
    return (
      <HvColorPicker
        aria-label="Color"
        showSavedColors={false}
        onChange={(color) => console.log(color)}
        defaultValue="#C62828"
      />
    );
  },
};

export const OnlyRecommendedColors: StoryObj<HvColorPickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "ColorPicker component with only the recommend colors area. The recommended colors are an array of colors of type `HvColorAny` which means that you can pass any color from the UI Kit theme or any CSS valid color.",
      },
    },
  },
  decorators: [makeDecorator({ display: "flex", height: 180 })],
  render: () => {
    return (
      <HvColorPicker
        aria-label="Color"
        showSavedColors={false}
        showCustomColors={false}
        onChange={(color) => {
          console.log(color);
        }}
        defaultValue="#059669"
        recommendedColors={[
          "positive",
          "negative",
          "primary",
          "cat1",
          "gold",
          "#3399AA",
        ]}
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
  decorators: [makeDecorator({ display: "flex", height: 550 })],
  render: () => {
    return (
      <HvColorPicker
        aria-label="Color"
        iconOnly
        onChange={(color) => console.log(color)}
      />
    );
  },
};

export const IconOnlyWithoutSavedColors: StoryObj<HvColorPickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "ColorPicker component that only shows an icon and without the saved colors area.",
      },
    },
  },
  decorators: [makeDecorator({ display: "flex", height: 480 })],
  render: () => {
    return (
      <HvColorPicker
        aria-label="Color"
        iconOnly
        showSavedColors={false}
        defaultValue="#477DBD"
        onChange={(color) => console.log(color)}
      />
    );
  },
};

export const IconOnlyRecommendedColors: StoryObj<HvColorPickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "ColorPicker component that only shows an icon and the recommended colors.",
      },
    },
  },
  decorators: [makeDecorator({ display: "flex", height: 180 })],
  render: () => {
    return (
      <HvColorPicker
        aria-label="Color"
        iconOnly
        showSavedColors={false}
        showCustomColors={false}
        defaultValue="#59941B"
        onChange={(color) => console.log(color)}
      />
    );
  },
};

export const CustomizedColorPicker: StoryObj<HvColorPickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "ColorPicker component with several customizations. With these customizations you can recreate the DS3 component.",
      },
    },
  },
  decorators: [makeDecorator({ display: "flex", height: 450 })],
  render: () => {
    return (
      <HvColorPicker
        aria-label="Color"
        showLabels={false}
        showSavedColors={false}
        dropdownIcon="arrow"
        defaultValue="#EC018B"
        onChange={(color) => console.log(color)}
        recommendedColorsPosition="bottom"
        recommendedColors={[
          "#C62828",
          "#DB6B22",
          "#F6941E",
          "#8DC63D",
          "#59941B",
          "#00838F",
          "#05A99C",
          "#01ADEF",
          "#477DBD",
          "#0155A5",
          "#2E3192",
          "#652C90",
          "#AA00FF",
          "#EC018B",
          "#999999",
          "#414141",
        ]}
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
  decorators: [makeDecorator({ display: "flex", height: 480 })],
  render: () => {
    const [color, setColor] = useState<string | undefined>("#95AFE8");

    const [squareColor, setSquareColor] = useState<string | undefined>(
      "#95AFE8",
    );

    return (
      <HvStack direction="row" spacing="lg">
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "134px",
            height: "134px",
          })}
          style={{ backgroundColor: squareColor }}
        >
          <HvTypography variant="label">{squareColor}</HvTypography>
        </div>
        <HvColorPicker
          aria-label="Color"
          showSavedColors={false}
          onChange={(value) => {
            setColor(value);
          }}
          onChangeComplete={setSquareColor}
          value={color}
        />
      </HvStack>
    );
  },
};

export const Test: StoryObj = {
  parameters: {
    docs: { disable: true },
  },
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
