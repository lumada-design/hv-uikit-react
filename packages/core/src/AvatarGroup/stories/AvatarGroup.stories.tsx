import { DecoratorFn, Meta, StoryObj } from "@storybook/react";
import {
  HvAvatar,
  HvAvatarGroup,
  HvAvatarGroupProps,
} from "@hitachivantara/uikit-react-core";

import { CustomOverflow as CustomOverflowStory } from "./CustomOverflow";
import CustomOverflowRaw from "./CustomOverflow?raw";
import { WithTooltip as WithTooltipStory } from "./WithTooltip";
import WithTooltipRaw from "./WithTooltip?raw";

const flexDecorator: DecoratorFn = (Story) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    {Story()}
  </div>
);

const meta: Meta<typeof HvAvatarGroup> = {
  title: "Components/Avatar/Avatar Group",
  component: HvAvatarGroup,
  decorators: [flexDecorator],
};
export default meta;

export const Main: StoryObj<HvAvatarGroupProps> = {
  args: {
    size: "sm",
    spacing: "loose",
    toBack: true,
    maxVisible: 5,
    direction: "row",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <HvAvatarGroup {...args}>
        <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
        <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
        <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
        <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
        <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
        <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
        <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
      </HvAvatarGroup>
    );
  },
};

export const Sizes: StoryObj<HvAvatarGroupProps> = {
  render: () => {
    return (
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <HvAvatarGroup size="xs" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          </HvAvatarGroup>

          <HvAvatarGroup size="sm" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          </HvAvatarGroup>

          <HvAvatarGroup size="md" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          </HvAvatarGroup>

          <HvAvatarGroup size="lg" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          </HvAvatarGroup>

          <HvAvatarGroup size="xl" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          </HvAvatarGroup>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <HvAvatarGroup size="xs" spacing="compact" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          </HvAvatarGroup>

          <HvAvatarGroup size="sm" spacing="compact" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          </HvAvatarGroup>

          <HvAvatarGroup size="md" spacing="compact" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          </HvAvatarGroup>

          <HvAvatarGroup size="lg" spacing="compact" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          </HvAvatarGroup>

          <HvAvatarGroup size="xl" spacing="compact" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          </HvAvatarGroup>
        </div>
      </div>
    );
  },
};

export const Vertical: StoryObj<HvAvatarGroupProps> = {
  render: () => {
    return (
      <HvAvatarGroup direction="column" maxVisible={3}>
        <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
        <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
        <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
        <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
        <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
        <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
        <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
      </HvAvatarGroup>
    );
  },
};

export const CustomOverflow: StoryObj<HvAvatarGroupProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "You can customize the overflow component that's displayed by passing your own component on the `overflowComponent` property. This property will receive the overflow count as a parameter. When `undefined` a default `HvAvatar` will be displayed with the count of overflowing items.",
      },
      source: {
        code: CustomOverflowRaw,
      },
    },
  },
  render: () => <CustomOverflowStory />,
};

export const WithTooltip: StoryObj<HvAvatarGroupProps> = {
  parameters: {
    docs: {
      source: {
        code: WithTooltipRaw,
      },
    },
  },
  render: () => <WithTooltipStory />,
};
