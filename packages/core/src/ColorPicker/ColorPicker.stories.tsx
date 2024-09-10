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
  decorators: [makeDecorator({ height: 550 })],
  render: (args) => {
    return (
      <div style={{ width: "134px" }}>
        <HvColorPicker
          onChange={(value) => {
            console.log(value);
          }}
          {...args}
        />
      </div>
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
  decorators: [makeDecorator({ height: 480 })],
  render: () => {
    return (
      <div style={{ width: "134px" }}>
        <HvColorPicker
          aria-label="Color"
          showSavedColors={false}
          onChange={(color) => console.log(color)}
          defaultValue="#C62828"
        />
      </div>
    );
  },
};

export const OnlyRecommendedColors: StoryObj<HvColorPickerProps> = {
  parameters: {
    docs: {
      description: {
        story: "ColorPicker component with only the recommend colors area.",
      },
    },
  },
  decorators: [makeDecorator({ height: 180 })],
  render: () => {
    return (
      <div style={{ width: "134px" }}>
        <HvColorPicker
          aria-label="Color"
          showSavedColors={false}
          showCustomColors={false}
          onChange={(color) => console.log(color)}
          defaultValue="#F6941E"
        />
      </div>
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
  decorators: [makeDecorator({ height: 550 })],
  render: () => {
    return (
      <div style={{ width: "134px" }}>
        <HvColorPicker
          aria-label="Color"
          iconOnly
          onChange={(color) => console.log(color)}
        />
      </div>
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
  decorators: [makeDecorator({ height: 480 })],
  render: () => {
    return (
      <div style={{ width: "134px" }}>
        <HvColorPicker
          aria-label="Color"
          iconOnly
          showSavedColors={false}
          defaultValue="#477DBD"
          onChange={(color) => console.log(color)}
        />
      </div>
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
  decorators: [makeDecorator({ height: 180 })],
  render: () => {
    return (
      <div style={{ width: "134px" }}>
        <HvColorPicker
          aria-label="Color"
          iconOnly
          showSavedColors={false}
          showCustomColors={false}
          defaultValue="#59941B"
          onChange={(color) => console.log(color)}
        />
      </div>
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
  decorators: [makeDecorator({ height: 450 })],
  render: () => {
    return (
      <div style={{ width: "240px" }}>
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
      </div>
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
  decorators: [makeDecorator({ height: 480 })],
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
        <div style={{ width: "134px" }}>
          <HvColorPicker
            aria-label="Color"
            showSavedColors={false}
            onChange={(value) => {
              setColor(value);
            }}
            onChangeComplete={setSquareColor}
            value={color}
          />
        </div>
      </HvStack>
    );
  },
};

export const Test: StoryObj = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", gap: 5 }}>
      <div style={{ width: 268 }}>
        <HvColorPicker label="Color" defaultExpanded />
      </div>
      <div style={{ width: 268 }}>
        <HvColorPicker
          label="Color"
          showSavedColors={false}
          defaultValue="#C62828"
          defaultExpanded
        />
      </div>
      <div style={{ width: "134px" }}>
        <HvColorPicker
          label="Color"
          showSavedColors={false}
          showCustomColors={false}
          defaultValue="#F6941E"
          defaultExpanded
        />
      </div>
      <div style={{ marginLeft: 130 }}>
        <HvColorPicker label="Color" iconOnly />
      </div>
      <HvColorPicker label="Color" iconOnly defaultValue="#59941B" />
    </div>
  ),
};
