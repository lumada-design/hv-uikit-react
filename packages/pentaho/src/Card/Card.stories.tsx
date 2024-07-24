import { Meta, StoryObj } from "@storybook/react";
import { HvCard, HvCardProps } from "@hitachivantara/uikit-react-pentaho";

import { StackStory } from "./stories/Stack";
import StackRaw from "./stories/Stack?raw";

const meta: Meta<typeof HvCard> = {
  title: "Pentaho/Card",
  component: HvCard,
};
export default meta;

export const Main: StoryObj<HvCardProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <HvCard {...args}>This is a card</HvCard>;
  },
};

export const Stack: StoryObj<HvCardProps> = {
  parameters: {
    docs: {
      source: {
        code: StackRaw,
      },
    },
  },
  render: () => <StackStory />,
};
