import type { Meta, StoryObj } from "@storybook/react";
import { HvSimpleGrid } from "@hitachivantara/uikit-react-core";

import { Test as BottomPanelTestStory } from "../Canvas/BottomPanel/BottomPanel.stories";
import { Test as ToolbarTabsTestStory } from "../Canvas/ToolbarTabs/ToolbarTabs.stories";
import { setupChromatic } from ".storybook/setupChromatic";
import { renderStory } from ".storybook/utils";

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
      {renderStory(BottomPanelTestStory, context)}
      {renderStory(ToolbarTabsTestStory, context)}
    </HvSimpleGrid>
  ),
};
