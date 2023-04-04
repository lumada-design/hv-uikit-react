import { Meta, StoryObj } from "@storybook/react";
import { BarChart, Ghost, Info } from "@hitachivantara/uikit-react-icons";
import {
  HvLink,
  HvTypography,
  HvEmptyState,
  HvEmptyStateProps,
} from "~/components";

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
  args: {
    title: "No data routes",
    message: "After you start adding Data Routes, they will appear here.",
    icon: <BarChart />,
  },
  argTypes: {
    icon: { control: { disable: true } },
    classes: { control: { disable: true } },
  },
  render: ({ title, message, icon }) => {
    const CustomAction = (
      // <HvTypography variant="label">Create a new data route</HvTypography>
      <HvLink route="/">Create a new data route</HvLink>
    );
    return (
      <HvEmptyState
        title={title}
        message={message}
        icon={icon}
        action={CustomAction}
      />
    );
  },
};

export const CustomMessages: StoryObj<HvEmptyStateProps> = {
  args: {
    title: "This page can't be displayed",
    icon: <Ghost />,
  },
  argTypes: {
    icon: { control: { disable: true } },
    classes: { control: { disable: true } },
  },
  render: ({ title, icon }) => {
    const CustomAction = (
      <HvTypography>
        <div>Here are some helpful links instead:</div>
        <a href="#" target="_blank">
          Online Help
        </a>
      </HvTypography>
    );

    const CustomMessage = <HvTypography>404 Not Found</HvTypography>;
    return (
      <HvEmptyState
        title={title}
        message={CustomMessage}
        icon={icon}
        action={CustomAction}
      />
    );
  },
};

export const Minimal: StoryObj<HvEmptyStateProps> = {
  args: {
    message: "No data to display",
    icon: <Info />,
  },
  argTypes: {
    icon: { control: { disable: true } },
    classes: { control: { disable: true } },
  },
  render: ({ message, icon }) => {
    return <HvEmptyState message={message} icon={icon} />;
  },
};
