import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
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

// Function to emulate pausing between interactions
const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve("Time passed"), ms);
  });

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
  // For visual testing
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const item = canvas.getByText("Documents"); // Not able to get it by role treeitem
    await userEvent.click(item);
    // Wait before clicking the other item to avoid errors in visual tests
    await sleep(500);
    const subItem = canvas.getByText("private");
    await userEvent.click(subItem);
    await expect(canvas.getAllByRole("treeitem")).toHaveLength(5);
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
  // For visual testing
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const item = canvas.getByText("User"); // Not able to get it by role treeitem
    await userEvent.click(item);
    // Wait before clicking the other item to avoid errors in visual tests
    await sleep(500);
    const subItem1 = canvas.getByText("Applications");
    await userEvent.click(subItem1);
    await sleep(500);
    const subItem2 = canvas.getByText("git");
    await userEvent.click(subItem2);
    await expect(canvas.getAllByRole("treeitem")).toHaveLength(9);
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
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  // For visual testing
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const item = canvas.getByText("Storage"); // Not able to get it by role treeitem
    await userEvent.click(item);
    // Wait before clicking the other item to avoid errors in visual tests
    await sleep(500);
    const subItem1 = canvas.getByText("Cloud");
    await userEvent.click(subItem1);
    await expect(canvas.getAllByRole("treeitem")).toHaveLength(8);
  },
  render: () => <VerticalNavigationStory />,
};
