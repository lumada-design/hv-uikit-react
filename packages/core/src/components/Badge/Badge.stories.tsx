import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Alert } from "@hitachivantara/uikit-react-icons";
import { HvButton, HvBadge, HvBadgeProps } from "components";

const container = {
  width: 400,
  display: "flex",
  justifyContent: "space-between",
};

const meta: Meta<typeof HvBadge> = {
  title: "Components/Badge",
  component: HvBadge,
};
export default meta;

export const Main: StoryObj<HvBadgeProps> = {
  args: {
    count: 1,
    showCount: false,
    label: "",
    maxCount: 99,
    text: "",
    textVariant: "body",
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
  decorators: [
    (Story) => <div style={{ ...container, width: 500 }}>{Story()}</div>,
  ],
  render: () => {
    return (
      <>
        <HvBadge id="badge1" count={1} />
        <HvBadge id="badge2" showCount count={8} />
        <HvBadge id="badge3" showCount count={22} />
        <HvBadge id="badge4" showCount count={100} />
        <HvBadge id="labelBadge1" label="100%" />
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
  decorators: [
    (Story) => <div style={{ ...container, width: 500 }}>{Story()}</div>,
  ],
  render: () => {
    return (
      <>
        <HvBadge id="badge5" count={0} icon={<Alert />} />
        <HvBadge id="badge6" count={1} icon={<Alert />} />
        <HvBadge id="badge7" showCount count={8} icon={<Alert />} />
        <HvBadge id="badge8" showCount count={88} icon={<Alert />} />
        <HvBadge id="badge9" showCount count={888} icon={<Alert />} />
        <HvBadge id="labelBadge3" label="100%" icon={<Alert />} />
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
  decorators: [
    (Story) => <div style={{ ...container, width: 650 }}>{Story()}</div>,
  ],
  render: () => {
    return (
      <>
        <HvBadge id="badge10" count={0} text="Events" textVariant="title3" />
        <HvBadge id="badge11" count={1} text="Events" textVariant="title3" />
        <HvBadge
          id="badge12"
          showCount
          count={8}
          text="Events"
          textVariant="title2"
        />
        <HvBadge
          id="badge13"
          showCount
          count={88}
          text="Events"
          textVariant="title3"
        />
        <HvBadge
          id="badge14"
          showCount
          count={888}
          text="Events"
          textVariant="title3"
        />
        <HvBadge
          id="labelBadge5"
          label="100%"
          text="Events"
          textVariant="title3"
        />
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
  decorators: [
    (Story) => <div style={{ ...container, width: 650 }}>{Story()}</div>,
  ],
  render: () => {
    const [count, setCount] = useState(1);
    const addCount = () => setCount(count * 2);

    return (
      <>
        <HvButton onClick={addCount}>Double Value</HvButton>
        <p />
        <HvBadge
          id="badge15"
          showCount
          count={count}
          text="Events"
          textVariant="title4"
        />
      </>
    );
  },
};
