import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import {
  HvVerticalNavigation,
  HvVerticalNavigationAction,
  HvVerticalNavigationActions,
  HvVerticalNavigationHeader,
  HvVerticalNavigationProps,
  HvVerticalNavigationSlider,
  HvVerticalNavigationTree,
  HvVerticalNavigationTreeView,
  HvVerticalNavigationTreeViewItem,
} from "@hitachivantara/uikit-react-core";

import { Collapsible as CollapsibleStory } from "./stories/Collapsible";
import CollapsibleRaw from "./stories/Collapsible?raw";
import { CollapsibleIcons as CollapsibleIconsStory } from "./stories/CollapsibleIcons";
import CollapsibleIconsRaw from "./stories/CollapsibleIcons?raw";
import { Custom as CustomStory } from "./stories/Custom";
import CustomRaw from "./stories/Custom?raw";
import { Main as MainStory } from "./stories/Main";
import MainRaw from "./stories/Main?raw";
import { MobileNavigation as MobileNavigationStory } from "./stories/MobileNavigation";
import MobileNavigationRaw from "./stories/MobileNavigation?raw";
import { SliderMode as SliderModeStory } from "./stories/SliderMode";
import SliderModeRaw from "./stories/SliderMode?raw";
import { Test as TestStory } from "./stories/Test";
import { TreeViewMode as TreeViewModeStory } from "./stories/TreeViewMode";
import TreeViewModeRaw from "./stories/TreeViewMode?raw";
import { WithoutActions as WithoutActionsStory } from "./stories/WithoutActions";
import WithoutActionsRaw from "./stories/WithoutActions?raw";

const meta: Meta<typeof HvVerticalNavigation> = {
  title: "Widgets/Vertical Navigation",
  component: HvVerticalNavigation,
  subcomponents: {
    // @ts-expect-error https://github.com/storybookjs/storybook/issues/20782
    HvVerticalNavigationHeader,
    // @ts-expect-error
    HvVerticalNavigationTree,
    // @ts-expect-error
    HvVerticalNavigationActions,
    // @ts-expect-error
    HvVerticalNavigationAction,
    // @ts-expect-error
    HvVerticalNavigationTreeView,
    // @ts-expect-error
    HvVerticalNavigationTreeViewItem,
    // @ts-expect-error
    HvVerticalNavigationSlider,
  },
  decorators: [
    (Story) => <div style={{ display: "flex", height: 530 }}>{Story()}</div>,
  ],
};

export default meta;

export const Main: StoryObj<HvVerticalNavigationProps> = {
  args: {
    open: true,
    slider: false,
  },
  argTypes: {},
  parameters: {
    docs: { source: { code: MainRaw } },
  },
  render: (args) => <MainStory {...args} />,
};

export const TreeViewMode: StoryObj<HvVerticalNavigationProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Usage of the [Treeview Design Pattern](https://w3c.github.io/aria-practices/#TreeView) to build a navigation tree for a set of hierarchically organized web pages. " +
          "Instead of TAB, use the arrow keys to navigate through items. Enter performs its default action (i.e. open/close parent nodes, select otherwise).",
      },
      source: { code: TreeViewModeRaw },
    },
  },
  render: () => <TreeViewModeStory />,
};

export const WithoutActions: StoryObj<HvVerticalNavigationProps> = {
  parameters: {
    docs: { source: { code: WithoutActionsRaw } },
  },
  render: () => <WithoutActionsStory />,
};

export const Collapsible: StoryObj<HvVerticalNavigationProps> = {
  parameters: {
    docs: { source: { code: CollapsibleRaw } },
  },
  render: () => <CollapsibleStory />,
};

export const CollapsibleIcons: StoryObj<HvVerticalNavigationProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "When collapsed in icon mode only the icons are visible, if an icon is not provided one will be generated based on the first letter of the label.",
      },
      source: { code: CollapsibleIconsRaw },
    },
  },
  render: () => <CollapsibleIconsStory />,
};

export const SliderMode: StoryObj<HvVerticalNavigationProps> = {
  parameters: {
    docs: { source: { code: SliderModeRaw } },
  },
  render: () => <SliderModeStory />,
};

export const MobileNavigation: StoryObj<HvVerticalNavigationProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Example of an implementation of the Design System Mobile Navigation pattern: the Vertical Navigation component changes to Slider mode when the window is in a smaller size.",
      },
      source: { code: MobileNavigationRaw },
    },
  },
  render: () => <MobileNavigationStory />,
};

export const Custom: StoryObj<HvVerticalNavigationProps> = {
  parameters: {
    docs: {
      description: {
        story: "Example of a vertical navigation with customizations.",
      },
      source: { code: CustomRaw },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  render: () => <CustomStory />,
};

export const Test: StoryObj<HvVerticalNavigationProps> = {
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: "landmark-unique", enabled: false },
          { id: "color-contrast", enabled: false },
        ],
      },
    },
    chromatic: { disableSnapshot: false, delay: 5000 },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button", { name: "collapseButton" });
    await userEvent.click(buttons[0]);
    const hwButtons = canvas.getAllByRole("button", { name: /hardware/i });
    expect(hwButtons).toHaveLength(2);
    await userEvent.click(hwButtons[1]);
  },
  render: () => (
    <div className="flex gap-sm">
      <TestStory />
      <TestStory mode="treeview" collapsible defaultExpanded />
      <SliderModeStory />
      <CollapsibleIconsStory />
      <CollapsibleIconsStory />
    </div>
  ),
};
