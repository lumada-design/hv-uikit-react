import { Meta, StoryObj } from "@storybook/react";
import {
  HvCard,
  HvCardMedia,
  HvCardProps,
  HvCardSection,
} from "@hitachivantara/uikit-react-pentaho";

import { StackStory } from "./stories/Stack";
import StackRaw from "./stories/Stack?raw";

const meta: Meta<typeof HvCard> = {
  title: "Pentaho/Card",
  component: HvCard,
  // @ts-expect-error https://github.com/storybookjs/storybook/issues/20782
  subcomponents: { HvCardMedia, HvCardSection },
};
export default meta;

export const Main: StoryObj<HvCardProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <HvCard {...args}>
        <HvCardSection>This is a card</HvCardSection>
      </HvCard>
    );
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
