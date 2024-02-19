import { DecoratorFn, Meta, StoryObj } from "@storybook/react";
import { waitFor, screen, fireEvent } from "@storybook/testing-library";
import {
  HvFilterGroup,
  HvFilterGroupProps,
} from "@hitachivantara/uikit-react-core";

import { Main as MainStory } from "./Main";
import MainRaw from "./Main?raw";
import { ResetToDefault as ResetToDefaultStory } from "./ResetToDefault";
import ResetToDefaultRaw from "./ResetToDefault?raw";
import { Uncontrolled as UncontrolledStory } from "./Uncontrolled";
import UncontrolledRaw from "./Uncontrolled?raw";
import { EmptyFilters as EmptyFiltersStory } from "./EmptyFilters";
import EmptyFiltersRaw from "./EmptyFilters?raw";

const widthDecorator: DecoratorFn = (Story) => (
  <div style={{ width: 180 }}>{Story()}</div>
);

const meta: Meta<typeof HvFilterGroup> = {
  title: "Widgets/Filter Group",
  component: HvFilterGroup,
  decorators: [(storyFn) => <div style={{ height: 550 }}>{storyFn()}</div>],
};

export default meta;

export const Main: StoryObj<HvFilterGroupProps> = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("combobox"));

        return waitFor(() => screen.getByRole("tooltip"));
      },
    },
    docs: {
      source: {
        code: MainRaw,
      },
    },
  },
  decorators: [widthDecorator],
  render: () => <MainStory />,
};

export const ResetToDefault: StoryObj<HvFilterGroupProps> = {
  parameters: {
    eyes: { include: false },
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
    eyes: { include: false },
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
    eyes: { include: false },
    docs: {
      source: {
        code: EmptyFiltersRaw,
      },
    },
  },
  render: () => <EmptyFiltersStory />,
};
