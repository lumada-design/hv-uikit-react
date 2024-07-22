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
import { CollapsibleIconsWithCustomPopupStyles as CollapsibleIconsWithCustomPopupStylesStory } from "./stories/CollapsibleIconsWithCustomPopupStyles";
import CollapsibleIconsWithCustomPopupStylesRaw from "./stories/CollapsibleIconsWithCustomPopupStyles?raw";
import { CollapsibleIconsWithoutSubItems as CollapsibleIconsWithoutSubItemsStory } from "./stories/CollapsibleIconsWithoutSubItems";
import CollapsibleIconsWithoutSubItemsRaw from "./stories/CollapsibleIconsWithoutSubItems?raw";
import { Custom as CustomStory } from "./stories/Custom";
import CustomRaw from "./stories/Custom?raw";
import { Main as MainStory } from "./stories/Main";
import MainRaw from "./stories/Main?raw";
import { MobileNavigation as MobileNavigationStory } from "./stories/MobileNavigation";
import MobileNavigationRaw from "./stories/MobileNavigation?raw";
import { SliderMode as SliderModeStory } from "./stories/SliderMode";
import SliderModeRaw from "./stories/SliderMode?raw";
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
    (Story) => (
      <div style={{ display: "flex", width: 220, height: 530 }}>{Story()}</div>
    ),
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
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
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
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  render: () => <TreeViewModeStory />,
};

export const WithoutActions: StoryObj<HvVerticalNavigationProps> = {
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    docs: { source: { code: WithoutActionsRaw } },
  },
  render: () => <WithoutActionsStory />,
};

export const Collapsible: StoryObj<HvVerticalNavigationProps> = {
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
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
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  render: () => <CollapsibleIconsStory />,
};

export const CollapsibleIconsWithoutSubItems: StoryObj<HvVerticalNavigationProps> =
  {
    parameters: {
      docs: {
        description: {
          story:
            "When collapsed in icon mode and no item has sub item, the panel will be have a smaller width.",
        },
        source: { code: CollapsibleIconsWithoutSubItemsRaw },
      },
      // Enables Chromatic snapshot
      chromatic: { disableSnapshot: false },
    },
    render: () => <CollapsibleIconsWithoutSubItemsStory />,
  };

export const CollapsibleIconsWithCustomPopupStyles: StoryObj<HvVerticalNavigationProps> =
  {
    parameters: {
      docs: {
        description: {
          story:
            "Custom popup styles can be applied to the popup container by passing a style object to the popupStyles prop.",
        },
        source: { code: CollapsibleIconsWithCustomPopupStylesRaw },
      },
      // Enables Chromatic snapshot
      chromatic: { disableSnapshot: false },
    },
    // For visual testing and a11y
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const button = canvas.getByRole("button", { name: /collapse/i });
      await userEvent.click(button);
      await expect(
        canvas.getByRole("heading", { name: /menu/i }),
      ).toBeInTheDocument();
    },
    render: () => <CollapsibleIconsWithCustomPopupStylesStory />,
  };

export const SliderMode: StoryObj<HvVerticalNavigationProps> = {
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false, delay: 5000 },
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
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
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
