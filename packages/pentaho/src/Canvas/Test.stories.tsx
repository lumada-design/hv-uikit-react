import { Meta, StoryObj } from "@storybook/react";
import { HvSimpleGrid } from "@hitachivantara/uikit-react-core";

import { Test as BottomPanelTestStory } from "./BottomPanel/BottomPanel.stories";
import { Main as ToolbarTabsMainStory } from "./ToolbarTabs/ToolbarTabs.stories";
import { setupChromatic } from ".storybook/setupChromatic";

const meta: Meta = {
  title: "Pentaho/Canvas",
};
export default meta;

export const Test: StoryObj = {
  parameters: {
    ...setupChromatic(["Pentaho+ dawn", "Pentaho+ wicked"], 5000),
    docs: { disable: true },
  },
  render: (args, context: any) => (
    <HvSimpleGrid
      cols={2}
      style={{ alignItems: "start", justifyContent: "start" }}
    >
      {BottomPanelTestStory.render?.(BottomPanelTestStory.args as any, context)}
      {ToolbarTabsMainStory.render?.(ToolbarTabsMainStory.args as any, context)}
    </HvSimpleGrid>
  ),
};
