import { Decorator, Meta, StoryObj } from "@storybook/react";
import {
  HvAvatar,
  HvAvatarGroup,
  HvAvatarGroupProps,
} from "@hitachivantara/uikit-react-core";

import { CustomOverflow as CustomOverflowStory } from "./CustomOverflow";
import CustomOverflowRaw from "./CustomOverflow?raw";
import { WithTooltip as WithTooltipStory } from "./WithTooltip";
import WithTooltipRaw from "./WithTooltip?raw";

const flexDecorator: Decorator = (Story) => (
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
    size: "md",
    spacing: "loose",
    toBack: true,
    maxVisible: 5,
    direction: "row",
    highlight: true,
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
        <HvAvatar alt="Clara" src="https://i.imgur.com/6sYhSb6.png" />
        <HvAvatar alt="Steve" src="https://i.imgur.com/8we9311.jpeg" />
        <HvAvatar alt="Sarah" src="https://i.imgur.com/2aJYRLM.jpeg" />
        <HvAvatar alt="Cristina" src="https://i.imgur.com/fj50fND.jpeg" />
      </HvAvatarGroup>
    );
  },
};

export const Sizes: StoryObj<HvAvatarGroupProps> = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <HvAvatarGroup size="xs" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Steve" src="https://i.imgur.com/8we9311.jpeg" />
            <HvAvatar alt="Sarah" src="https://i.imgur.com/2aJYRLM.jpeg" />
            <HvAvatar alt="Cristina" src="https://i.imgur.com/fj50fND.jpeg" />
          </HvAvatarGroup>

          <HvAvatarGroup size="sm" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Steve" src="https://i.imgur.com/8we9311.jpeg" />
            <HvAvatar alt="Sarah" src="https://i.imgur.com/2aJYRLM.jpeg" />
            <HvAvatar alt="Cristina" src="https://i.imgur.com/fj50fND.jpeg" />
          </HvAvatarGroup>

          <HvAvatarGroup size="md" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Steve" src="https://i.imgur.com/8we9311.jpeg" />
            <HvAvatar alt="Sarah" src="https://i.imgur.com/2aJYRLM.jpeg" />
            <HvAvatar alt="Cristina" src="https://i.imgur.com/fj50fND.jpeg" />
          </HvAvatarGroup>

          <HvAvatarGroup size="lg" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Steve" src="https://i.imgur.com/8we9311.jpeg" />
            <HvAvatar alt="Sarah" src="https://i.imgur.com/2aJYRLM.jpeg" />
            <HvAvatar alt="Cristina" src="https://i.imgur.com/fj50fND.jpeg" />
          </HvAvatarGroup>

          <HvAvatarGroup size="xl" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Steve" src="https://i.imgur.com/8we9311.jpeg" />
            <HvAvatar alt="Sarah" src="https://i.imgur.com/2aJYRLM.jpeg" />
            <HvAvatar alt="Cristina" src="https://i.imgur.com/fj50fND.jpeg" />
          </HvAvatarGroup>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <HvAvatarGroup size="xs" spacing="compact" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Steve" src="https://i.imgur.com/8we9311.jpeg" />
            <HvAvatar alt="Sarah" src="https://i.imgur.com/2aJYRLM.jpeg" />
            <HvAvatar alt="Cristina" src="https://i.imgur.com/fj50fND.jpeg" />
          </HvAvatarGroup>

          <HvAvatarGroup size="sm" spacing="compact" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Steve" src="https://i.imgur.com/8we9311.jpeg" />
            <HvAvatar alt="Sarah" src="https://i.imgur.com/2aJYRLM.jpeg" />
            <HvAvatar alt="Cristina" src="https://i.imgur.com/fj50fND.jpeg" />
          </HvAvatarGroup>

          <HvAvatarGroup size="md" spacing="compact" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Steve" src="https://i.imgur.com/8we9311.jpeg" />
            <HvAvatar alt="Sarah" src="https://i.imgur.com/2aJYRLM.jpeg" />
            <HvAvatar alt="Cristina" src="https://i.imgur.com/fj50fND.jpeg" />
          </HvAvatarGroup>

          <HvAvatarGroup size="lg" spacing="compact" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Steve" src="https://i.imgur.com/8we9311.jpeg" />
            <HvAvatar alt="Sarah" src="https://i.imgur.com/2aJYRLM.jpeg" />
            <HvAvatar alt="Cristina" src="https://i.imgur.com/fj50fND.jpeg" />
          </HvAvatarGroup>

          <HvAvatarGroup size="xl" spacing="compact" maxVisible={3}>
            <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
            <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
            <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
            <HvAvatar alt="Clara" src="https://i.imgur.com/6sYhSb6.png" />
            <HvAvatar alt="Steve" src="https://i.imgur.com/8we9311.jpeg" />
            <HvAvatar alt="Sarah" src="https://i.imgur.com/2aJYRLM.jpeg" />
            <HvAvatar alt="Cristina" src="https://i.imgur.com/fj50fND.jpeg" />
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
        <HvAvatar alt="Clara" src="https://i.imgur.com/6sYhSb6.png" />
        <HvAvatar alt="Steve" src="https://i.imgur.com/8we9311.jpeg" />
        <HvAvatar alt="Sarah" src="https://i.imgur.com/2aJYRLM.jpeg" />
        <HvAvatar alt="Cristina" src="https://i.imgur.com/fj50fND.jpeg" />
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
      description: {
        story:
          "The `HvAvatarGroup` component accepts `HvAvatar` as children. But you can wrap them with a `HvTooltip` component to display a tooltip on hover.",
      },
      source: {
        code: WithTooltipRaw,
      },
    },
  },
  render: () => <WithTooltipStory />,
};

export const Test: StoryObj = {
  parameters: {
    chromatic: { disableSnapshot: false, delay: 5000 },
    docs: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <HvAvatarGroup size="xs" direction="column" maxVisible={3}>
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

        <HvAvatarGroup size="xl" maxVisible={3} toBack={false}>
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
        <HvAvatarGroup
          size="xs"
          spacing="compact"
          direction="column"
          maxVisible={3}
        >
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

        <HvAvatarGroup
          size="xl"
          spacing="compact"
          maxVisible={3}
          toBack={false}
        >
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
  ),
};
