import type { Meta, StoryObj } from "@storybook/react";
import {
  HvBadge,
  HvBadgeProps,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Alert } from "@hitachivantara/uikit-react-icons";

const meta: Meta<typeof HvBadge> = {
  title: "Components/Badge",
  component: HvBadge,
  decorators: [(Story) => <div className="flex gap-60px">{Story()}</div>],
};
export default meta;

export const Main: StoryObj<HvBadgeProps> = {
  args: {
    label: 1,
    showCount: true,
    maxCount: 99,
    text: "Messages",
    textVariant: "label",
    color: "text",
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
        <HvBadge label={0}>
          <HvTypography variant="label">Events</HvTypography>
        </HvBadge>
        <HvBadge label={1}>
          <HvTypography variant="label">Events</HvTypography>
        </HvBadge>
        <HvBadge showCount label={8}>
          <HvTypography variant="title4">Events</HvTypography>
        </HvBadge>
        <HvBadge showCount label={88}>
          <HvTypography variant="title4">Events</HvTypography>
        </HvBadge>
        <HvBadge showCount label={888}>
          <HvTypography variant="title3">Events</HvTypography>
        </HvBadge>
        <HvBadge label="100%">
          <HvTypography variant="title2">Events</HvTypography>
        </HvBadge>
      </>
    );
  },
};

export const Test: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
      <HvBadge count={10} icon={<Alert />} />
      <HvBadge showCount count={8} icon={<Alert />} />
      <HvBadge showCount label={88} icon={<Alert />} />
      <HvBadge showCount label={888} icon={<Alert />} />
      <HvBadge count={0} text="Events" textVariant="label" />
      <HvBadge label={10} text="Events" />
      <HvBadge showCount label={10} maxCount={5} text="Events" />
      <HvBadge showCount label={8}>
        <HvTypography variant="title4">Events</HvTypography>
      </HvBadge>
      <HvBadge color="primary" showCount label={8} icon={<Alert />} />
      <HvBadge color="primary" label={8} icon={<Alert />} />
      <HvBadge color="textSubtle" showCount label={8} icon={<Alert />} />
      <HvBadge color="textSubtle" label={8} icon={<Alert />} />
    </div>
  ),
};
