import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { Meta, StoryObj } from "@storybook/react";
import { theme } from "@hitachivantara/uikit-react-core";

import { HvDefaultNavigation, HvStep, HvStepProps } from "./DefaultNavigation";
import { dotClasses, HvDot, HvSimpleNavigation } from "./SimpleNavigation";
import { HvStepNavigation, HvStepNavigationProps } from "./StepNavigation";

const StyledDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  overflow: "auto",
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
  // @ts-expect-error https://github.com/storybookjs/storybook/issues/20782
  subcomponents: {
    HvDefaultNavigation,
    HvStep,
    HvSimpleNavigation,
    HvDot,
  } as unknown,
  decorators: [
    (Story) => (
      <StyledDiv>
        <Story />
      </StyledDiv>
    ),
  ],
};
export default meta;

export const Main: StoryObj<HvStepNavigationProps> = {
  args: {
    type: "Default",
    steps,
    stepSize: undefined,
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
      showTitles={false}
      aria-label="Simple step navigation with tooltip"
    />
    <HvStepNavigation
      type="Default"
      steps={steps}
      showTitles={false}
      aria-label="Default step navigation with tooltip"
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
