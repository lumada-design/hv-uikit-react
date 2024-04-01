import { Meta, StoryObj } from "@storybook/react";
import {
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvCardMedia,
  HvCardProps,
} from "@hitachivantara/uikit-react-core";

import { AllComponents as AllComponentsStory } from "./AllComponents";
import AllComponentsRaw from "./AllComponents?raw";
import { KPICards as KPICardsStory } from "./KPICards";
import KPICardsRaw from "./KPICards?raw";
import { Main as MainStory } from "./Main";
import MainRaw from "./Main?raw";
import { NoActions as NoActionsStory } from "./NoActions";
import NoActionsRaw from "./NoActions?raw";
import { OnlyTitle as OnlyTitleStory } from "./OnlyTitle";
import OnlyTitleRaw from "./OnlyTitle?raw";
import { Selectable as SelectableStory } from "./Selectable";
import SelectableRaw from "./Selectable?raw";

const meta: Meta<typeof HvCard> = {
  title: "Components/Card",
  component: HvCard,
  // @ts-expect-error https://github.com/storybookjs/storybook/issues/20782
  subcomponents: { HvCardHeader, HvCardContent, HvCardMedia },
  decorators: [(Story) => <div style={{ margin: 20 }}>{Story()}</div>],
};
export default meta;

export const Main: StoryObj<HvCardProps> = {
  args: {
    bgcolor: "atmo1",
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

export const AllComponents: StoryObj<HvCardProps> = {
  parameters: {
    docs: {
      source: { code: AllComponentsRaw },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false, delay: 5000 },
    eyes: { include: true, waitBeforeCapture: 5000 },
  },
  render: () => <AllComponentsStory />,
};

export const NoActions: StoryObj<HvCardProps> = {
  parameters: {
    docs: {
      source: { code: NoActionsRaw },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  render: () => <NoActionsStory />,
};

export const OnlyTitle: StoryObj<HvCardProps> = {
  parameters: {
    docs: {
      source: { code: OnlyTitleRaw },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  render: () => <OnlyTitleStory />,
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
