import type { Meta, StoryObj } from "@storybook/react";
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
  parameters: {
    docs: {
      description: {
        story:
          "By default all tabs' labels are editable. If this is not desired for your use case, the `disableTabEdit` property should be set to `true`.",
      },
    },
  },
  render: () => (
    <HvCanvasToolbarTabs
      disableTabEdit
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
  ),
};

export const NotRemovable: StoryObj<HvCanvasToolbarTabsProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "By default the tabs are removable. If this is not desired for your use case, the `fixed` property should be set to `true` at the tab level. Thus, it's possible to have both removable and not removable tabs. The `hideCreateNew` property also enables you to hide the 'Create new' button if needed.",
      },
    },
  },
  render: () => (
    <HvCanvasToolbarTabs
      hideCreateNew
      disableTabEdit
      defaultTabs={[
        {
          id: "tab1",
          label: "Tab 1",
          fixed: true,
        },
        {
          id: "tab2",
          label: "Tab 2",
        },
      ]}
    />
  ),
};

export const Test: StoryObj = {
  args: {
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
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <HvCanvasToolbarTabs />
      <HvCanvasToolbarTabs hideCreateNew />
      <HvCanvasToolbarTabs
        defaultTabs={[
          { id: "tab1", label: "My tab with a very long label" },
          { id: "tab2", label: "My tab" },
        ]}
      />
      <HvCanvasToolbarTabs
        hideCreateNew
        defaultTabs={[
          { id: "tab1", label: "My tab with a very long label" },
          { id: "tab2", label: "My tab" },
        ]}
      />
      <HvCanvasToolbarTabs
        disableTabEdit
        defaultTabs={[
          { id: "tab1", label: "My tab with a very long label" },
          { id: "tab2", label: "My tab" },
        ]}
      />
      <HvCanvasToolbarTabs
        defaultTabs={[
          {
            id: "tab1",
            label: "My tab with a very long label",
            fixed: true,
          },
          { id: "tab2", label: "My tab" },
        ]}
      />
      {/* Note: Passed through args because the icons freeze storybook otherwise */}
      <HvCanvasToolbarTabs {...args} />
    </div>
  ),
};
