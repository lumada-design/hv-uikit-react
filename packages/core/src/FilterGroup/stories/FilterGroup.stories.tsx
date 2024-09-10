import { Decorator, Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import {
  HvFilterGroup,
  HvFilterGroupProps,
} from "@hitachivantara/uikit-react-core";

import { EmptyFilters as EmptyFiltersStory } from "./EmptyFilters";
import EmptyFiltersRaw from "./EmptyFilters?raw";
import { Main as MainStory } from "./Main";
import MainRaw from "./Main?raw";
import { ResetToDefault as ResetToDefaultStory } from "./ResetToDefault";
import ResetToDefaultRaw from "./ResetToDefault?raw";
import { Uncontrolled as UncontrolledStory } from "./Uncontrolled";
import UncontrolledRaw from "./Uncontrolled?raw";

const widthDecorator: Decorator = (Story) => (
  <div style={{ width: 180 }}>{Story()}</div>
);

const meta: Meta<typeof HvFilterGroup> = {
  title: "Widgets/Filter Group",
  component: HvFilterGroup,
  decorators: [(storyFn) => <div style={{ height: 550 }}>{storyFn()}</div>],
  parameters: {
    a11y: {
      config: {
        rules: [
          // TODO: review aria-haspopup on a role-less element
          { id: "aria-valid-attr-value", enabled: false },
        ],
      },
    },
  },
};

export default meta;

export const Main: StoryObj<HvFilterGroupProps> = {
  parameters: {
    docs: {
      source: {
        code: MainRaw,
      },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: true },
  },
  // For visual testing and a11y
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole("combobox", { name: /main filter/i });
    await userEvent.click(combobox);
    await expect(
      canvas.getByRole("button", { name: /clear filters/i }),
    ).toBeInTheDocument();
  },
  decorators: [widthDecorator],
  render: () => <MainStory />,
};

export const ResetToDefault: StoryObj<HvFilterGroupProps> = {
  parameters: {
    docs: {
      source: {
        code: ResetToDefaultRaw,
      },
    },
  },
  decorators: [widthDecorator],
  render: () => <ResetToDefaultStory />,
};

export const Uncontrolled: StoryObj<HvFilterGroupProps> = {
  parameters: {
    docs: {
      source: {
        code: UncontrolledRaw,
      },
    },
  },
  decorators: [widthDecorator],
  render: () => <UncontrolledStory />,
};

export const EmptyFilters: StoryObj<HvFilterGroupProps> = {
  parameters: {
    docs: {
      source: {
        code: EmptyFiltersRaw,
      },
    },
  },
  render: () => <EmptyFiltersStory />,
};
