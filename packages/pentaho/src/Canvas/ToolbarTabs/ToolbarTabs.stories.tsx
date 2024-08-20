import { Meta, StoryObj } from "@storybook/react";
import { Leaf } from "@hitachivantara/uikit-react-icons";
import {
  HvCanvasToolbarTabs,
  HvCanvasToolbarTabsProps,
} from "@hitachivantara/uikit-react-pentaho";

import { ControlledStory } from "./stories/Controlled";
import ControlledRaw from "./stories/Controlled?raw";

const meta: Meta<typeof HvCanvasToolbarTabs> = {
  title: "Pentaho/Canvas/Toolbar Tabs",
  component: HvCanvasToolbarTabs,
};
export default meta;

export const Main: StoryObj<HvCanvasToolbarTabsProps> = {
  args: {
    icon: (
      <Leaf
        // Only for testing purposes
        data-testid="leaf"
      />
    ),
    defaultTabs: [
      {
        id: "tab1",
        label: "My first tab",
        icon: <Leaf />,
      },
      {
        id: "tab2",
        label: "My tab with a very long label",
        icon: <Leaf />,
      },
    ],
  },
  argTypes: {
    tabs: { control: { disable: true } },
    defaultTabs: { control: { disable: true } },
    selectedTabId: { control: { disable: true } },
    labels: { control: { disable: true } },
    icon: { control: { disable: true } },
    classes: { control: { disable: true } },
    onTabChange: { control: { disable: true } },
    onChange: { control: { disable: true } },
  },
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  render: (args) => {
    return <HvCanvasToolbarTabs {...args} />;
  },
};

export const Controlled: StoryObj<HvCanvasToolbarTabsProps> = {
  parameters: {
    docs: {
      source: {
        code: ControlledRaw,
      },
    },
  },
  render: () => <ControlledStory />,
};

export const NotEditable: StoryObj<HvCanvasToolbarTabsProps> = {
  render: () => {
    return (
      <HvCanvasToolbarTabs
        allowTabEdit={false}
        icon={<Leaf />}
        defaultTabs={[
          {
            id: "tab1",
            label: "Tab 1",
            icon: <Leaf />,
          },
          {
            id: "tab2",
            label: "Tab 2",
            icon: <Leaf />,
          },
        ]}
      />
    );
  },
};
