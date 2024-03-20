import { useState } from "react";
import { css } from "@emotion/css";
import { Decorator, Meta, StoryObj } from "@storybook/react";
import {
  HvButton,
  HvSlider,
  HvSliderProps,
  theme,
} from "@hitachivantara/uikit-react-core";

const variantsDecorator: Decorator = (Story) => (
  <div
    className={css({
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing("md"),
    })}
  >
    {Story()}
  </div>
);

const meta: Meta<typeof HvSlider> = {
  title: "Components/Slider",
  component: HvSlider,
  decorators: [
    (Story) => (
      <div
        className={css({
          paddingTop: theme.spacing("md"),
          paddingBottom: theme.spacing("md"),
        })}
      >
        {Story()}
      </div>
    ),
  ],
};

export default meta;

export const Main: StoryObj<HvSliderProps> = {
  args: { label: "Failure Rate", defaultValues: [10] },
  argTypes: {
    classes: { control: { disable: true } },
    sliderProps: { control: { disable: true } },
    status: { control: { disable: true } },
    statusMessage: { control: { disable: true } },
    values: { control: { disable: true } },
    knobProperties: { control: { disable: true } },
    markProperties: { control: { disable: true } },
    inputProps: { control: { disable: true } },
    knobProps: { control: { disable: true } },
  },
  render: (args) => {
    return <HvSlider {...args} />;
  },
};

export const RangeSlider: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A controlled range slider where the values are set from outside.",
      },
    },
  },
  render: () => {
    const [values, setValues] = useState([0, 2]);

    return (
      <>
        <div
          className={css({
            display: "flex",
            gap: theme.spacing("xs"),
            marginBottom: theme.spacing("sm"),
          })}
        >
          <HvButton
            variant="secondarySubtle"
            onClick={() => setValues(values.map((v) => v - 0.2))}
          >
            Decrement
          </HvButton>
          <HvButton
            variant="secondarySubtle"
            onClick={() => setValues(values.map((v) => v + 0.2))}
          >
            Increment
          </HvButton>
        </div>
        <HvSlider
          label="Failure Rate"
          values={values}
          onChange={setValues}
          maxPointValue={10}
          minPointValue={-10}
          markStep={10}
          markDigits={1}
        />
      </>
    );
  },
};

export const Variants: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story: "Sliders in their various state variants.",
      },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  decorators: [variantsDecorator],
  render: () => {
    const values = [10];

    return (
      <>
        <HvSlider label="Default" defaultValues={values} />
        <HvSlider required label="Required" defaultValues={values} />
        <HvSlider disabled label="Disabled" defaultValues={values} />
        <HvSlider readOnly label="Read-only" defaultValues={values} />
        <HvSlider
          label="Invalid"
          status="invalid"
          statusMessage="Invalid because I said so"
          defaultValues={values}
        />
      </>
    );
  },
};

export const RangeVariants: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story: "Range sliders in their various state variants.",
      },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  decorators: [variantsDecorator],
  render: () => {
    const values = [10, 40];

    return (
      <>
        <HvSlider label="Default" defaultValues={values} />
        <HvSlider required label="Required" defaultValues={values} />
        <HvSlider disabled label="Disabled" defaultValues={values} />
        <HvSlider readOnly label="Read-only" defaultValues={values} />
        <HvSlider
          label="Invalid"
          status="invalid"
          statusMessage="Invalid because I said so"
          defaultValues={values}
        />
      </>
    );
  },
};

export const FormattedMark: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story: "A slider with a formatted mark to show the Cº unit.",
      },
    },
  },
  render: () => {
    return (
      <HvSlider
        label="Temperature"
        formatMark={(mark) => `${mark} Cº`}
        defaultValues={[10]}
      />
    );
  },
};

export const RangeBlankSlider: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A range slider without any value is achieved by adding undefined values in an array.",
      },
    },
  },
  render: () => {
    return (
      <HvSlider
        required
        label="Failure Rate"
        defaultValues={[undefined, undefined]}
      />
    );
  },
};

export const RangeSpecificErrorSlider: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story: "A range slider with an empty and invalid values.",
      },
    },
  },
  render: () => {
    return (
      <HvSlider
        label="Failure Rate"
        status={["valid", "invalid"]}
        statusMessage="Invalid because I said so"
        defaultValues={[undefined, 53]}
      />
    );
  },
};

export const NoLabelNoInput: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story: "A slider without an input and label.",
      },
    },
  },
  render: () => {
    return (
      <HvSlider
        knobProps={[{ "aria-label": "First knob" }]}
        hideInput
        defaultValues={[10]}
      />
    );
  },
};
