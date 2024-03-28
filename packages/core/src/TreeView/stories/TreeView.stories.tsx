import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import {
  HvTreeItem,
  HvTreeView,
  HvTreeViewProps,
} from "@hitachivantara/uikit-react-core";

import { AsyncLoading as AsyncLoadingStory } from "./AsyncLoading";
import AsyncLoadingStoryRaw from "./AsyncLoading?raw";
import { Controlled as ControlledStory } from "./Controlled";
import ControlledStoryRaw from "./Controlled?raw";
import { DataObject as DataObjectStory } from "./DataObject";
import DataObjectStoryRaw from "./DataObject?raw";
import { Main as MainStory } from "./Main";
import MainStoryRaw from "./Main?raw";
import { VerticalNavigation as VerticalNavigationStory } from "./VerticalNavigation";
import VerticalNavigationStoryRaw from "./VerticalNavigation?raw";

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
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const item = canvas.getByText("Documents"); // Not able to get it by role treeitem
    await userEvent.click(item);
    const subItem = canvas.getByText("private");
    await userEvent.click(subItem);
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
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const item = canvas.getByText("User"); // Not able to get it by role treeitem
    await userEvent.click(item);
    const subItem1 = canvas.getByText("Applications");
    await userEvent.click(subItem1);
    const subItem2 = canvas.getByText("git");
    await userEvent.click(subItem2);
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
