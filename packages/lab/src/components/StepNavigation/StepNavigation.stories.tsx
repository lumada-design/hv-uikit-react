import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { HvStepNavigation, HvStepNavigationProps } from "./StepNavigation";
import { HvDefaultNavigation } from "./DefaultNavigation";
import { HvSimpleNavigation } from "./SimpleNavigation";
import { HvDot } from "./SimpleNavigation/Dot";
import { HvStep, HvStepProps } from "./DefaultNavigation/Step";
import { theme } from "@hitachivantara/uikit-styles";
import dotClasses from "./SimpleNavigation/Dot/dotClasses";

const FlexDecorator = ({ children }) => {
  const StyledDiv = styled("div")({
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
  });

  return <StyledDiv>{children}</StyledDiv>;
};

type StepType = Pick<
  HvStepProps,
  "state" | "title" | "onClick" | "className" | "disabled"
> & {
  separatorClassName?: string;
  titleClassName?: string;
};

const steps: StepType[] = [
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
    title: "Enabled",
    state: "Enabled",
    onClick: () => {
      alert("You clicked on 'Enabled' step");
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

const meta: Meta<typeof HvStepNavigation> = {
  title: "Lab/Step Navigation",
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
export default meta;

export const Main: StoryObj<HvStepNavigationProps> = {
  args: {
    type: "Default",
    steps: steps,
    stepSize: "md",
  },
  argTypes: {
    classes: { control: { disable: true } },
    steps: { control: { disable: true } },
  },
  render: (args) => {
    return <HvStepNavigation {...args} />;
  },
};

export const WithTooltip = () => (
  <div className="two-examples">
    <HvStepNavigation
      type="Simple"
      steps={steps}
      id="Simple-WithTooltip"
      showTitles={false}
    />
    <HvStepNavigation
      type="Default"
      steps={steps}
      id="Default-WithTooltip"
      showTitles={false}
    />
  </div>
);

WithTooltip.parameters = {
  docs: {
    description: {
      story: "Example with no titles displayed, only tooltips on hover.",
    },
  },
};

export const Width = () => (
  <HvStepNavigation
    steps={steps}
    id="Width"
    width={{
      xs: 200,
      sm: 400,
      md: 600,
      lg: 800,
      xl: 1000,
    }}
  />
);

Width.parameters = {
  docs: {
    description: {
      story:
        "Example of a step navigation with a customized width for each breakpoint ('200px', '400px', '600px', '800px', '1000px').",
    },
  },
};

export const Customized = () => {
  const root = css({
    backgroundColor: theme.colors.positive,
    "&:hover": {
      backgroundColor: theme.colors.positive,
    },
    [`&.${dotClasses.ghostDisabled}`]: {
      backgroundColor: theme.colors.secondary,
    },
  });
  const separator = css({
    backgroundColor: theme.colors.positive,
    height: 3,
  });
  const title = css({
    color: theme.colors.secondary,
  });

  return (
    <HvStepNavigation
      type="Simple"
      steps={steps.map((s) => ({
        ...s,
        className: root,
        separatorClassName: separator,
        titleClassName: title,
      }))}
      id="SeparatorWidth"
    />
  );
};

Customized.parameters = {
  docs: {
    description: {
      story:
        "Example of a step navigation with customized styles made by <b>className</b>, <b>separatorClassName</b>, <b>titleClassName</b> properties of each step definition",
    },
  },
};
