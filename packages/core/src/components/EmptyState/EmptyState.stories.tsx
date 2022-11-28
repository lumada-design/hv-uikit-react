import { BarChart, Ghost, Info } from "@hitachivantara/uikit-icons";
import { Meta, StoryObj } from "@storybook/react";
import { HvTypography } from "..";
import { EmptyState, EmptyStateProps } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Theme/EmptyState",
  component: EmptyState,
};
export default meta;

export const AMain: StoryObj<EmptyStateProps> = {
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
    return <EmptyState {...args} />;
  },
};

export const WithAction: StoryObj<EmptyStateProps> = {
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
      <HvTypography variant="label">Create a new data route</HvTypography>
    );
    return (
      <EmptyState
        title={title}
        message={message}
        icon={icon}
        action={CustomAction}
      />
    );
  },
};

export const CustomMessages: StoryObj<EmptyStateProps> = {
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
      <EmptyState
        title={title}
        message={CustomMessage}
        icon={icon}
        action={CustomAction}
      />
    );
  },
};

export const Minimal: StoryObj<EmptyStateProps> = {
  args: {
    message: "No data to display",
    icon: <Info />,
  },
  argTypes: {
    icon: { control: { disable: true } },
    classes: { control: { disable: true } },
  },
  render: ({ message, icon }) => {
    return <EmptyState message={message} icon={icon} />;
  },
};
