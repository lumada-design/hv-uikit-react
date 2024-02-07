import { Meta, StoryObj } from "@storybook/react";

import {
  HvTreeView,
  HvTreeViewProps,
  HvTreeItem,
} from "@hitachivantara/uikit-react-core";

import { Main as MainStory } from "./stories/Main";
import MainStoryRaw from "./stories/Main?raw";
import { Controlled as ControlledStory } from "./stories/Controlled";
import ControlledStoryRaw from "./stories/Controlled?raw";
import { DataObject as DataObjectStory } from "./stories/DataObject";
import DataObjectStoryRaw from "./stories/DataObject?raw";
import { AsyncLoading as AsyncLoadingStory } from "./stories/AsyncLoading";
import AsyncLoadingStoryRaw from "./stories/AsyncLoading?raw";
import { VerticalNavigation as VerticalNavigationStory } from "./stories/VerticalNavigation";
import VerticalNavigationStoryRaw from "./stories/VerticalNavigation?raw";

export default {
  title: "Components/Tree View",
  component: HvTreeView,
  argTypes: {},
  // @ts-expect-error
  subcomponents: { HvTreeItem },
} satisfies Meta<typeof HvTreeView>;

export const Main: StoryObj<HvTreeViewProps<false>> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    docs: {
      source: { code: MainStoryRaw },
    },
  },
  render: () => <MainStory />,
};

export const Controlled: StoryObj<HvTreeViewProps<true>> = {
  parameters: {
    docs: {
      source: { code: ControlledStoryRaw },
      description: {
        story:
          "The tree view can be controlled by passing in `expanded`/`onNodeToggle` and `selected`/`onNodeSelect` props to control expansion and selection state respectively. <br /> When using `multiSelect`, the values and callbacks are of type `string[]`, and `string` otherwise.",
      },
    },
  },
  render: () => <ControlledStory />,
};

export const DataObject: StoryObj<HvTreeViewProps<false>> = {
  parameters: {
    docs: {
      source: { code: DataObjectStoryRaw },
      description: {
        story:
          "Sometimes the tree data is in an object shape. These can be easily converted to `HvTreeItem` nodes using a recursive `renderItem` function.",
      },
    },
  },
  render: () => <DataObjectStory />,
};

export const AsyncLoading: StoryObj<HvTreeViewProps<true>> = {
  parameters: {
    docs: {
      source: { code: AsyncLoadingStoryRaw },
      description: {
        story:
          "Sometimes the full tree data is unknown or paginated. This sample showcases how a custom `LoadingItem` can be used to handle server-side tree data.",
      },
    },
  },

  render: () => <AsyncLoadingStory />,
};

export const VerticalNavigation: StoryObj<HvTreeViewProps<false>> = {
  parameters: {
    docs: {
      source: { code: VerticalNavigationStoryRaw },
    },
  },
  render: () => <VerticalNavigationStory />,
};
