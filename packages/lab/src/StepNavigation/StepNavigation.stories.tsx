import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { theme } from "@hitachivantara/uikit-react-core";
import {
  HvStepNavigation,
  HvStepNavigationProps,
} from "@hitachivantara/uikit-react-lab";

import { HvDefaultNavigation, HvStep, HvStepProps } from "./DefaultNavigation";
import { dotClasses, HvDot, HvSimpleNavigation } from "./SimpleNavigation";

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          overflow: "auto",
        }}
      >
        <Story />
      </div>
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
  render: (args) => <HvStepNavigation {...args} />,
};

export const Variants: StoryObj<HvStepNavigationProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Variants of the step navigation component with titles and with tooltips shown on hover.",
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.space.lg,
      }}
    >
      <HvStepNavigation
        type="Default"
        steps={steps}
        aria-label="Default step navigation with tooltip"
      />
      <HvStepNavigation
        type="Simple"
        steps={steps}
        aria-label="Simple step navigation"
      />
      <HvStepNavigation
        type="Default"
        steps={steps}
        showTitles={false}
        aria-label="Default step navigation"
      />
      <HvStepNavigation
        type="Simple"
        steps={steps}
        showTitles={false}
        aria-label="Simple step navigation with tooltip"
      />
    </div>
  ),
};

export const Width: StoryObj<HvStepNavigationProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Example of a step navigation with a customized width for each breakpoint ('200px', '400px', '600px', '800px', '1000px').",
      },
    },
  },
  render: () => (
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
  ),
};

export const Customized: StoryObj<HvStepNavigationProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Example of a step navigation with customized styles made by <b>className</b>, <b>separatorClassName</b>, <b>titleClassName</b> properties of each step definition",
      },
    },
  },
  render: () => {
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
  },
};
