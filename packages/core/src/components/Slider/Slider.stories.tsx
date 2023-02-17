import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";
import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { HvButton } from "~/components";
import { HvSlider, HvSliderProps } from "./Slider";

const meta: Meta<typeof HvSlider> = {
  title: "Components/Slider",
  component: HvSlider,
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "145px",
          display: "flex",
          justifyContent: "center",
          paddingTop: "30px",
        }}
      >
        <div style={{ width: "100%" }}>{Story()}</div>
      </div>
    ),
  ],
};

export default meta;

export const Main: StoryObj<HvSliderProps> = {
  args: { label: "Failure Rate", defaultValues: [10] },
  render: (args) => {
    return <HvSlider id="Main" {...args} />;
  },
};

export const RangeSlider: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A range slider can be achieved by adding an array with two values.",
      },
    },
  },
  render: () => {
    return (
      <HvSlider id="Range" label="Failure Rate" defaultValues={[10, 40]} />
    );
  },
};

export const RangeSliderControlled: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story: "A controlled slider where the values are set from outside.",
      },
    },
  },
  render: () => {
    const [values, setValues] = useState<number[]>([0, 2]);

    const onChangeHandler = (knobs: number[]) => {
      setValues(knobs);
    };

    const classes = {
      buttonWrapper: css({
        marginTop: theme.spacing("lg"),
        "& button": {
          marginRight: theme.spacing("xs"),
        },
      }),
    };

    return (
      <div>
        <HvSlider
          id="RangeSliderControlled"
          label="Failure Rate"
          values={values}
          onChange={onChangeHandler}
          maxPointValue={10}
          minPointValue={-10}
          markStep={10}
          markDigits={1}
        />
        <div className={classes.buttonWrapper}>
          <HvButton
            onClick={() => {
              const newValues: number[] = values.map((value) => value - 0.2);

              setValues(newValues);
            }}
          >
            Decrement
          </HvButton>
          <HvButton
            onClick={() => {
              const newValues: number[] = values.map((value) => value + 0.2);

              setValues(newValues);
            }}
          >
            Increment
          </HvButton>
        </div>
      </div>
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
    const defaultValues: number[] = [10];

    const formatMark = (mark: string | React.ReactNode) => `${mark} Cº`;

    return (
      <HvSlider
        id="format"
        label="Temperature"
        formatMark={formatMark}
        defaultValues={defaultValues}
      />
    );
  },
};

export const BlankSlider: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story: "A single slider without any value.",
      },
    },
  },
  render: () => {
    return <HvSlider id="BlankSlider" label="Failure Rate" required />;
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
        id="RangeBlankSlider"
        label="Failure Rate"
        defaultValues={[undefined, undefined]}
        required
      />
    );
  },
};

export const ErrorSingleSlider: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story: "An invalid single slider.",
      },
    },
  },
  render: () => {
    return (
      <HvSlider
        id="ErrorSingleSlider"
        label="Failure Rate"
        status="invalid"
        statusMessage="Invalid because I said so"
      />
    );
  },
};

export const ErrorRangeSlider: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story: "An invalid range slider.",
      },
    },
  },
  render: () => {
    return (
      <HvSlider
        id="ErrorRangeSlider"
        label="Failure Rate"
        status="invalid"
        statusMessage="Invalid because I said so"
        defaultValues={[undefined, 53]}
      />
    );
  },
};

export const RangeSpecificErrorSlider: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story: "A single slider without any value.",
      },
    },
  },
  render: () => {
    return (
      <HvSlider
        id="RangeSpecificErrorSlider"
        label="Failure Rate"
        status={["valid", "invalid"]}
        statusMessage="Invalid because I said so"
        defaultValues={[undefined, 53]}
      />
    );
  },
};

export const SingleDisabled: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story: "A disabled single slider.",
      },
    },
  },
  render: () => {
    return (
      <HvSlider
        id="SingleDisabled"
        label="Failure Rate"
        defaultValues={[10]}
        disabled
      />
    );
  },
};

export const RangeSliderDisabled: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story: "A disabled range slider.",
      },
    },
  },
  render: () => {
    return (
      <HvSlider
        id="RangeSliderDisabled"
        label="Failure Rate"
        defaultValues={[10, 40]}
        disabled
      />
    );
  },
};

export const NoInput: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story: "A slider without an input.",
      },
    },
  },
  render: () => {
    return (
      <HvSlider
        id="NoInput"
        label="Failure Rate"
        defaultValues={[10]}
        hideInput
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
        id="NoLabelNoInput"
        knobProps={[{ "aria-label": "no-label-knob" }]}
        hideInput
        defaultValues={[10]}
      />
    );
  },
};

export const ReadOnly: StoryObj<HvSliderProps> = {
  parameters: {
    docs: {
      description: {
        story: "A read only slider.",
      },
    },
  },
  render: () => {
    return (
      <HvSlider
        id="ReadOnly"
        label="Failure Rate"
        defaultValues={[10, 40]}
        readOnly
      />
    );
  },
};
