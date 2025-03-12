import { Meta, StoryObj } from "@storybook/react";
import {
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvCardMedia,
  HvCardProps,
} from "@hitachivantara/uikit-react-core";

import { Expandable as ExpandableStory } from "./stories/Expandable";
import ExpandableRaw from "./stories/Expandable?raw";
import { KPICards as KPICardsStory } from "./stories/KPICards";
import KPICardsRaw from "./stories/KPICards?raw";
import { Main as MainStory } from "./stories/Main";
import MainRaw from "./stories/Main?raw";
import { Selectable as SelectableStory } from "./stories/Selectable";
import SelectableRaw from "./stories/Selectable?raw";
import { Variants as VariantsStory } from "./stories/Variants";
import VariantsRaw from "./stories/Variants?raw";

const meta: Meta<typeof HvCard> = {
  title: "Components/Card",
  component: HvCard,
  // @ts-ignore https://github.com/storybookjs/storybook/issues/23170
  subcomponents: { HvCardHeader, HvCardContent, HvCardMedia },
  decorators: [(Story) => <div style={{ margin: 20 }}>{Story()}</div>],
};
export default meta;

export const Main: StoryObj<HvCardProps> = {
  args: {
    bgcolor: "textDimmed",
    statusColor: "negative",
    selectable: false,
    selected: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    icon: { control: { disable: true } },
  },
  parameters: {
    docs: {
      source: { code: MainRaw },
    },
  },
  render: (args) => <MainStory {...args} />,
};

export const Variants: StoryObj<HvCardProps> = {
  parameters: {
    docs: {
      description: {
        story: `The \`Card\` component can be constructed by composing several sub-components, like \`HvCardHeader\`, \`HvCardContent\`, \`HvCardMedia\`, and \`HvActionsBar\`. 
        This sample showcases how these modular pieces can be combined to create a wide variety of card layouts and styles.`,
      },
      source: { code: VariantsRaw },
    },
  },
  render: () => <VariantsStory />,
};

export const KPICards: StoryObj<HvCardProps> = {
  parameters: {
    docs: {
      source: { code: KPICardsRaw },
    },
  },
  render: () => <KPICardsStory />,
};

export const Selectable: StoryObj<HvCardProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A card sample showcasing the ability to select in the content and click action.",
      },
      source: { code: SelectableRaw },
    },
  },
  render: () => <SelectableStory />,
};

export const Expandable: StoryObj<HvCardProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A card sample showcasing the ability to expand a card and show hidden content.",
      },
      source: { code: ExpandableRaw },
    },
  },
  render: () => <ExpandableStory />,
};
