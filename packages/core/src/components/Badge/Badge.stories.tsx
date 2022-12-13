import { Alert } from "@hitachivantara/uikit-icons";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "..";
import { Badge, BadgeProps } from "./Badge";

const container = {
  width: 400,
  display: "flex",
  justifyContent: "space-between",
};

const meta: Meta<typeof Badge> = {
  title: "Display/Badge",
  component: Badge,
};
export default meta;

export const Main: StoryObj<BadgeProps> = {
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
    return <Badge {...args} />;
  },
};

export const Multiple: StoryObj<BadgeProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div style={{ ...container, width: 500 }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    return (
      <>
        <Badge id="badge1" count={1} />
        <Badge id="badge2" showCount count={8} />
        <Badge id="badge3" showCount count={22} />
        <Badge id="badge4" showCount count={100} />
        <Badge id="labelBadge1" label="100%" />
      </>
    );
  },
};

export const WithIcon: StoryObj<BadgeProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    docs: {
      description: { story: "Badge sample that uses a custom icon." },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ ...container, width: 500 }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    return (
      <>
        <Badge id="badge5" count={0} icon={<Alert />} />
        <Badge id="badge6" count={1} icon={<Alert />} />
        <Badge id="badge7" showCount count={8} icon={<Alert />} />
        <Badge id="badge8" showCount count={88} icon={<Alert />} />
        <Badge id="badge9" showCount count={888} icon={<Alert />} />
        <Badge id="labelBadge3" label="100%" icon={<Alert />} />
      </>
    );
  },
};

export const WithText: StoryObj<BadgeProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    docs: {
      description: { story: "Badge sample using only text." },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ ...container, width: 650 }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    return (
      <>
        <Badge id="badge10" count={0} text="Events" textVariant="title3" />
        <Badge id="badge11" count={1} text="Events" textVariant="title3" />
        <Badge
          id="badge12"
          showCount
          count={8}
          text="Events"
          textVariant="title2"
        />
        <Badge
          id="badge13"
          showCount
          count={88}
          text="Events"
          textVariant="title3"
        />
        <Badge
          id="badge14"
          showCount
          count={888}
          text="Events"
          textVariant="title3"
        />
        <Badge
          id="labelBadge5"
          label="100%"
          text="Events"
          textVariant="title3"
        />
      </>
    );
  },
};

export const WithState: StoryObj<BadgeProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: "Badge sample using react hooks to set the number of events.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ ...container, width: 650 }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [count, setCount] = useState(1);
    const addCount = () => setCount(count * 2);

    return (
      <>
        <Button onClick={addCount}>Double Value</Button>
        <p />
        <Badge
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
