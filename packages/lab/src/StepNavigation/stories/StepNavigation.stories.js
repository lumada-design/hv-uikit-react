import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import clsx from "clsx";

import { HvStepNavigation } from "../..";
import HvDefaultNavigation from "../DefaultNavigation";
import HvSimpleNavigation from "../SimpleNavigation";
import HvDot from "../SimpleNavigation/Dot";
import HvStep from "../DefaultNavigation/Step";

// eslint-disable-next-line react/prop-types
const FlexDecorator = ({ children }) => {
  const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: "0 10px 5px 0",
      },
      "& .two-examples": {
        display: "flex",
        flexDirection: "column",
        "& > div.steps": {
          display: "flex",
          alignItems: "center",
          "& > div, > button": {
            marginLeft: 10,
          },
        },
        "& > div:first-of-type": {
          marginBottom: 40,
        },
      },
    },
  });

  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default {
  title: "Lab/StepNavigation",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvStepNavigation } from '@hitachivantara/uikit-react-lab'",
  },
  component: HvStepNavigation,
  subcomponents: { HvDefaultNavigation, HvStep, HvSimpleNavigation, HvDot },
  decorators: [
    (Story) => (
      <FlexDecorator>
        <Story />
      </FlexDecorator>
    ),
  ],
};

const steps = [
  {
    title: "Completed",
    state: "Completed",
    onClick: () => {
      alert("You clicked on 'Completed' step");
    },
  },
  {
    title: "Failed",
    state: "Failed",
    onClick: () => {
      alert("You clicked on 'Failed' step");
    },
  },
  {
    title: "Pending",
    state: "Pending",
    onClick: () => {
      alert("You clicked on 'Pending' step");
    },
  },
  {
    title: "Current",
    state: "Current",
    onClick: () => {
      alert("You clicked on 'Current' step");
    },
  },
  {
    title: "Disabled",
    state: "Disabled",
    onClick: () => {
      alert("You clicked on 'Disabled' step");
    },
  },
];

export const Main = () => <HvStepNavigation steps={steps} />;

export const Simple = () => <HvStepNavigation id="Simple" type="Simple" steps={steps} />;

Simple.parameters = {
  docs: {
    description: {
      story: "Simple layout of step navigation.",
    },
  },
};

export const StepSizes = () => (
  <div className="two-examples">
    <div className="steps">
      {steps.map(({ state, title }, index) => (
        <HvStep
          key={`step-${state}-${["XS", "SM", "MD", "LG", "XL"][index]}`}
          {...{ size: ["XS", "SM", "MD", "LG", "XL"][index], number: index + 1, state, title }}
        />
      ))}
    </div>
    <div className="steps">
      {steps.map(({ title }, index) => (
        <HvDot
          key={`dot-${["XS", "SM", "MD", "LG", "XL"][index]}-${+index}`}
          {...{ size: ["XS", "SM", "MD", "LG", "XL"][index], state: "Completed", title }}
        />
      ))}
    </div>
  </div>
);

StepSizes.parameters = {
  docs: {
    description: { story: "Diferent step sizes ('XS', 'SM', 'MD', 'LG', 'XL')" },
  },
};

export const WithTooltip = () => (
  <div className="two-examples">
    <HvStepNavigation type="Simple" steps={steps} id="Simple-WithTooltip" showTitles={false} />
    <HvStepNavigation type="Default" steps={steps} id="Default-WithTooltip" showTitles={false} />
  </div>
);

WithTooltip.parameters = {
  docs: {
    description: {
      story: "Example with no titles displayed, only tooltips on hover.",
    },
  },
};

export const Width = () => <HvStepNavigation steps={steps} id="Width" width={1000} />;

Width.parameters = {
  docs: {
    description: { story: "Example of a step navigation with a customized width ('1000px')." },
  },
};

export const DefineClasses = () => {
  const classes = makeStyles((theme) => ({
    separator: {
      backgroundColor: [theme.palette.acce2, "!important"],
    },
    title: {
      color: theme.palette.acce2,
    },
    ghostDisabled: {},
    ghost: {
      backgroundColor: [theme.palette.acce2, "!important"],
      "&$ghostDisabled": {
        backgroundColor: [theme.palette.acce2, "!important"],
      },
      "&$ghostDisabled&:hover": {
        backgroundColor: [theme.palette.acce2, "!important"],
      },
    },
  }))();
  return (
    <HvStepNavigation
      type="Simple"
      steps={steps.map((s) => ({
        ...s,
        className: clsx(classes.ghost, {
          [classes.ghostDisabled]: ["Current", "Disabled"].includes(s.state),
        }),
        separatorClassName: classes.separator,
        titleClassName: classes.title,
      }))}
      id="SeparatorWidth"
    />
  );
};

DefineClasses.parameters = {
  docs: {
    description: {
      story:
        "Example of a step navigation with customized styles made by <b>className</b>, <b>separatorClassName</b>, <b>titleClassName</b> properties of each step definition",
    },
  },
};
