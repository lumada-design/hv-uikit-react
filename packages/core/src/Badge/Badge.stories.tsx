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
    count: 1,
    showCount: true,
    label: "",
    maxCount: 99,
    text: "Messages",
    textVariant: "label",
  },
  argTypes: {
    classes: { control: { disable: true } },
    icon: { control: { disable: true } },
  },
  render: (args) => {
    return <HvBadge {...args} />;
  },
};

export const Multiple: StoryObj<HvBadgeProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    return (
      <>
        <HvBadge count={1} />
        <HvBadge showCount count={8} />
        <HvBadge showCount count={22} />
        <HvBadge showCount count={100} />
        <HvBadge label="100%" />
      </>
    );
  },
};

export const WithIcon: StoryObj<HvBadgeProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    docs: {
      description: { story: "Badge sample that uses a custom icon." },
    },
  },
  render: () => {
    return (
      <>
        <HvBadge count={0} icon={<Alert />} />
        <HvBadge count={1} icon={<Alert />} />
        <HvBadge showCount count={8} icon={<Alert />} />
        <HvBadge showCount count={88} icon={<Alert />} />
        <HvBadge showCount count={888} icon={<Alert />} />
        <HvBadge label="100%" icon={<Alert />} />
      </>
    );
  },
};

export const WithText: StoryObj<HvBadgeProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    docs: {
      description: { story: "Badge sample using only text." },
    },
  },
  render: () => {
    return (
      <>
        <HvBadge count={0} text="Events" textVariant="label" />
        <HvBadge count={1} text="Events" textVariant="label" />
        <HvBadge showCount count={8} text="Events" textVariant="title4" />
        <HvBadge showCount count={88} text="Events" textVariant="title4" />
        <HvBadge showCount count={888} text="Events" textVariant="title3" />
        <HvBadge label="100%" text="Events" textVariant="title2" />
      </>
    );
  },
};

export const WithState: StoryObj<HvBadgeProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: "Badge sample using react hooks to set the number of events.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    const [count, setCount] = useState(1);
    const addCount = () => setCount(count * 2);

    return (
      <>
        <HvButton onClick={addCount}>Double Value</HvButton>
        <HvBadge showCount count={count} text="Events" textVariant="title4" />
      </>
    );
  },
};

export const Accessibility: StoryObj<HvBadgeProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: "If you want to specify a custom aria-label, use the role prop.",
      },
    },
    eyes: { include: false },
  },
  render: () => (
    <HvBadge
      showCount
      count={25}
      text="Events"
      textVariant="title4"
      role="status"
      aria-label="25 unread notifications"
    />
  ),
};
