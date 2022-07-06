/* eslint-disable no-alert */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { HvButton, HvSlider } from "../..";

export default {
  title: "Inputs/Slider",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvSlider } from "@hitachivantara/uikit-react-core"',
  },
  component: HvSlider,
  decorators: [
    (storyFn) => (
      <div
        style={{ height: "145px", display: "flex", justifyContent: "center", paddingTop: "30px" }}
      >
        <div style={{ width: "100%" }}>{storyFn()}</div>
      </div>
    ),
  ],
};

export const Main = () => {
  const defaultValues = [10];
  return <HvSlider id="Main" label="Failure Rate" defaultValues={defaultValues} />;
};

export const RangeSlider = () => {
  const defaultValues = [10, 40];
  return <HvSlider id="Range" label="Failure Rate" defaultValues={defaultValues} />;
};

RangeSlider.parameters = {
  docs: {
    description: {
      story: "a Range slider can be achieved by adding an array with two values",
    },
  },
};

export const RangeSliderControlled = () => {
  const [values, setValues] = useState([0, 2]);
  const onChangeHandler = (knobs) => {
    setValues(knobs);
  };

  const useStyles = makeStyles((theme) => ({
    buttonWrapper: {
      marginTop: theme.hvSpacing("md"),
      "& button": {
        marginRight: theme.hvSpacing("xs"),
      },
    },
  }));

  const classes = useStyles();

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
            const newValues = values.map((value) => value - 0.2);
            setValues(newValues);
          }}
        >
          Decrement
        </HvButton>
        <HvButton
          onClick={() => {
            const newValues = values.map((value) => value + 0.2);
            setValues(newValues);
          }}
        >
          Increment
        </HvButton>
      </div>
    </div>
  );
};

RangeSlider.parameters = {
  docs: {
    description: {
      story: "a controlled slider where the values are set from outside",
    },
  },
};

export const FormattedMark = () => {
  const defaultValues = [10];
  const formatMark = (mark) => `${mark} Cº`;
  return (
    <HvSlider
      id="format"
      label="Temperature"
      formatMark={formatMark}
      defaultValues={defaultValues}
    />
  );
};

export const BlankSlider = () => {
  return <HvSlider id="BlankSlider" label="Failure Rate" required />;
};

BlankSlider.parameters = {
  docs: {
    description: {
      story: "a single slider without any value",
    },
  },
};

export const RangeBlankSlider = () => {
  return (
    <HvSlider
      id="RangeBlankSlider"
      label="Failure Rate"
      defaultValues={[undefined, undefined]}
      required
    />
  );
};

RangeBlankSlider.parameters = {
  docs: {
    description: {
      story: "a range slider without any value is achieved by adding undefined values in an array",
    },
  },
};

export const ErrorSingleSlider = () => {
  return (
    <HvSlider
      id="ErrorSingleSlider"
      label="Failure Rate"
      status="invalid"
      statusMessage="Invalid because i said so"
    />
  );
};

export const ErrorRangeSlider = () => {
  return (
    <HvSlider
      id="ErrorRangeSlider"
      label="Failure Rate"
      status="invalid"
      statusMessage="Invalid because i said so"
      defaultValues={[undefined, 53]}
    />
  );
};

export const RangeSpecificErrorSlider = () => {
  return (
    <HvSlider
      id="RangeSpecificErrorSlider"
      label="Failure Rate"
      status={["valid", "invalid"]}
      statusMessage="Invalid because i said so"
      defaultValues={[undefined, 53]}
    />
  );
};

RangeSpecificErrorSlider.parameters = {
  docs: {
    description: {
      story: "a single slider without any value",
    },
  },
};

export const SingleDisabled = () => {
  const defaultValues = [10];
  return (
    <HvSlider id="SingleDisabled" label="Failure Rate" defaultValues={defaultValues} disabled />
  );
};

export const RangeSliderDisabled = () => {
  const defaultValues = [10, 40];
  return (
    <HvSlider
      id="RangeSliderDisabled"
      label="Failure Rate"
      defaultValues={defaultValues}
      disabled
    />
  );
};

export const NoInput = () => {
  const defaultValues = [10];
  return <HvSlider id="NoInput" label="Failure Rate" defaultValues={defaultValues} hideInput />;
};

export const NoLabelNoInput = () => {
  const defaultValues = [10];
  return (
    <HvSlider
      id="NoLabelNoInput"
      knobProps={[{ "aria-label": "no-label-knob" }]}
      hideInput
      defaultValues={defaultValues}
    />
  );
};

export const ReadOnly = () => {
  const defaultValues = [10, 40];
  return <HvSlider id="ReadOnly" label="Failure Rate" defaultValues={defaultValues} readOnly />;
};
