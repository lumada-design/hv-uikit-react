import { Meta, StoryObj } from "@storybook/react";
import { Test as BottomPanelTestStory } from "packages/pentaho/src/Canvas/BottomPanel/BottomPanel.stories";
import { Test as ToolbarTabsTestStory } from "packages/pentaho/src/Canvas/ToolbarTabs/ToolbarTabs.stories";
import { HvSimpleGrid } from "@hitachivantara/uikit-react-core";

import { setupChromatic } from ".storybook/setupChromatic";

/** Visual tests for components from the Pentaho package */
const meta: Meta = {
  title: "Tests/Pentaho",
};
export default meta;

/**
 * Visual tests for:
 * - Bottom panel
 * - Toolbar tabs
 */
export const Test: StoryObj = {
  parameters: {
    ...setupChromatic(["Pentaho+ dawn", "Pentaho+ wicked"], 5000),
    docs: { disable: true },
    a11y: {
      disable: true,
    },
  },
  tags: ["skipTestRunner"],
  render: (args, context: any) => (
    <HvSimpleGrid
      cols={2}
      style={{ alignItems: "start", justifyContent: "start" }}
    >
      {BottomPanelTestStory.render?.(BottomPanelTestStory.args as any, context)}
      {ToolbarTabsTestStory.render?.(ToolbarTabsTestStory.args as any, context)}
    </HvSimpleGrid>
  ),
};
