import { Meta, StoryObj } from "@storybook/react";
import {
  HvEmptyState,
  HvEmptyStateProps,
  HvLink,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { BarChart, Ghost, Info } from "@hitachivantara/uikit-react-icons";

const meta: Meta<typeof HvEmptyState> = {
  title: "Components/Empty State",
  component: HvEmptyState,
};
export default meta;

export const Main: StoryObj<HvEmptyStateProps> = {
  args: {
    title: "No data routes",
    message: "After you start adding Data Routes, they will appear here.",
    action: "Check the documentation for help.",
    icon: <Info />,
  },
  argTypes: {
    icon: { control: { disable: true } },
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <HvEmptyState {...args} />;
  },
};

export const WithAction: StoryObj<HvEmptyStateProps> = {
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  render: () => {
    const CustomAction = <HvLink route="/">Create a new data route</HvLink>;
    return (
      <HvEmptyState
        title="No data routes"
        message="After you start adding Data Routes, they will appear here."
        icon={<BarChart />}
        action={CustomAction}
      />
    );
  },
};

export const CustomMessages: StoryObj<HvEmptyStateProps> = {
  render: () => {
    const CustomAction = (
      <>
        <HvTypography>Here are some helpful links instead:</HvTypography>
        <HvTypography link component="a" href="#" target="_blank">
          Online help
        </HvTypography>
      </>
    );

    const CustomMessage = <HvTypography>404 Not Found</HvTypography>;
    return (
      <HvEmptyState
        title="This page can't be displayed"
        message={CustomMessage}
        icon={<Ghost />}
        action={CustomAction}
      />
    );
  },
};

export const Minimal: StoryObj<HvEmptyStateProps> = {
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  render: () => {
    return <HvEmptyState message="No data to display" icon={<Info />} />;
  },
};
