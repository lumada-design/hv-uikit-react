import { useState } from "react";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvBadge,
  HvBadgeProps,
  HvButton,
} from "@hitachivantara/uikit-react-core";
import { Alert } from "@hitachivantara/uikit-react-icons";

const meta: Meta<typeof HvBadge> = {
  title: "Components/Badge",
  component: HvBadge,
  decorators: [
    (Story) => (
      <div className={css({ display: "flex", gap: 60 })}>{Story()}</div>
    ),
  ],
};
export default meta;

export const Main: StoryObj<HvBadgeProps> = {
  args: {
    label: 1,
    showCount: true,
    maxCount: 99,
    text: "Messages",
    textVariant: "label",
  },
  argTypes: {
    classes: { control: { disable: true } },
    icon: { control: { disable: true } },
  },
  render: (args) => <HvBadge {...args} />,
};

export const Multiple: StoryObj<HvBadgeProps> = {
  render: () => {
    return (
      <>
        <HvBadge label={1} />
        <HvBadge showCount label={8} />
        <HvBadge showCount label={22} />
        <HvBadge showCount label={100} />
        <HvBadge label="100%" />
      </>
    );
  },
};

export const WithIcon: StoryObj<HvBadgeProps> = {
  parameters: {
    docs: {
      description: { story: "Badge sample that uses a custom icon." },
    },
  },
  render: () => {
    return (
      <>
        <HvBadge label={0} icon={<Alert />} />
        <HvBadge label={1} icon={<Alert />} />
        <HvBadge showCount label={8} icon={<Alert />} />
        <HvBadge showCount label={88} icon={<Alert />} />
        <HvBadge showCount label={888} icon={<Alert />} />
        <HvBadge label="100%" icon={<Alert />} />
      </>
    );
  },
};

export const WithText: StoryObj<HvBadgeProps> = {
  parameters: {
    docs: {
      description: { story: "Badge sample using only text." },
    },
  },
  render: () => {
    return (
      <>
        <HvBadge label={0} text="Events" textVariant="label" />
        <HvBadge label={1} text="Events" textVariant="label" />
        <HvBadge showCount label={8} text="Events" textVariant="title4" />
        <HvBadge showCount label={88} text="Events" textVariant="title4" />
        <HvBadge showCount label={888} text="Events" textVariant="title3" />
        <HvBadge label="100%" text="Events" textVariant="title2" />
      </>
    );
  },
};

export const WithState: StoryObj<HvBadgeProps> = {
  parameters: {
    docs: {
      description: {
        story: "Badge sample using react hooks to set the number of events.",
      },
    },
  },
  render: () => {
    const [count, setCount] = useState(1);
    const addCount = () => setCount(count * 2);

    return (
      <>
        <HvButton onClick={addCount}>Double Value</HvButton>
        <HvBadge showCount label={count} text="Events" textVariant="title4" />
      </>
    );
  },
};

export const Accessibility: StoryObj<HvBadgeProps> = {
  parameters: {
    docs: {
      description: {
        story: "If you want to specify a custom aria-label, use the role prop.",
      },
    },
  },
  render: () => (
    <HvBadge
      showCount
      label={25}
      text="Events"
      textVariant="title4"
      role="status"
      aria-label="25 unread notifications"
    />
  ),
};

export const Test: StoryObj = {
  parameters: {
    docs: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
      <HvBadge count={10} icon={<Alert />} />
      <HvBadge showCount count={8} icon={<Alert />} />
      <HvBadge showCount label={88} icon={<Alert />} />
      <HvBadge showCount label={888} icon={<Alert />} />
      <HvBadge count={0} text="Events" textVariant="label" />
      <HvBadge label={10} text="Events" />
      <HvBadge showCount label={10} maxCount={5} text="Events" />
      <HvBadge showCount label={8} text="Events" textVariant="title4" />
    </div>
  ),
};
