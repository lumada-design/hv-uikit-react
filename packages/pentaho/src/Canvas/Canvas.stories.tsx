import { useState } from "react";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import {
  HvButton,
  HvSimpleGrid,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Favorite, Heart, Leaf } from "@hitachivantara/uikit-react-icons";
import {
  HvCanvasBottomPanel,
  HvCanvasBottomPanelProps,
  HvCanvasToolbarTabs,
} from "@hitachivantara/uikit-react-pentaho";

import { setupChromatic } from ".storybook/setupChromatic";

const meta: Meta = {
  title: "Pentaho/Canvas",
};
export default meta;

const classes = {
  root: css({
    display: "flex",
    flexDirection: "column",
    gap: theme.space.sm,
  }),
  buttons: css({ display: "flex", gap: theme.space.sm }),
  panel: css({ position: "relative" }),
};

const leftActions = [
  { id: "action1", label: "Action 1", icon: <Favorite /> },
  { id: "action2", label: "Action 2", icon: <Favorite /> },
];
const rightActions = [
  { id: "action3", label: "Action 3", icon: <Heart /> },
  { id: "action4", label: "Action 4", icon: <Heart /> },
  { id: "action5", label: "Action 5", icon: <Heart /> },
];

const tabs: HvCanvasBottomPanelProps["tabs"] = [
  { id: 0, title: (overflow) => (overflow ? "Tab 1 Overflowing" : "Tab 1") },
  { id: 1, title: "Tab 2" },
];

const toolbarTabs = [
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
];
const toolbarTabsOverflow = Array.from({ length: 12 }).map((i) => ({
  id: `tab${i}`,
  label: "My first tab",
  icon: <Leaf />,
}));

export const Test: StoryObj = {
  parameters: {
    ...setupChromatic(["Pentaho+ dawn", "Pentaho+ wicked"], 5000),
    docs: { disable: true },
  },
  // For visual testing
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tab = canvas.getAllByRole("tab", { name: /my first tab/i })[0];
    await userEvent.hover(tab);
  },
  render: () => {
    const [minimize, setMinimize] = useState(false);
    const [open, setOpen] = useState(true);
    const [selectedTab, setSelectedTab] = useState(tabs[0].id);
    const [extraOpen, setExtraOpen] = useState(true);

    const handleAction: HvCanvasBottomPanelProps["onAction"] = (
      event,
      action,
      tabId,
    ) => alert(`You clicked action ${action.label} for ${tabId}.`);

    return (
      <div className={classes.root}>
        <div className={classes.buttons}>
          <HvButton onClick={() => setOpen((prev) => !prev)}>
            Toggle Open
          </HvButton>
          <HvButton onClick={() => setMinimize((prev) => !prev)}>
            Toggle Minimize
          </HvButton>
          <HvButton onClick={() => setExtraOpen((prev) => !prev)}>
            Toggle Extra Tests
          </HvButton>
        </div>
        <HvSimpleGrid cols={2}>
          <HvCanvasBottomPanel
            open={open}
            className={classes.panel}
            tabs={tabs}
            leftActions={leftActions}
            rightActions={rightActions}
            overflowActions={[...leftActions, ...rightActions]}
            onAction={handleAction}
            minimize={minimize}
            selectedTabId={selectedTab}
            onTabChange={(event, id) => setSelectedTab(id as number)}
          >
            Content
          </HvCanvasBottomPanel>
          {extraOpen && (
            <>
              <HvCanvasBottomPanel
                open
                className={classes.panel}
                tabs={tabs}
                leftActions={[leftActions[0]]}
                rightActions={[rightActions[0], rightActions[1]]}
              >
                Content
              </HvCanvasBottomPanel>
              <HvCanvasBottomPanel
                open
                className={classes.panel}
                tabs={[
                  {
                    id: 1,
                    title: "Tab 2",
                  },
                ]}
                leftActions={[leftActions[0]]}
                rightActions={[rightActions[0], rightActions[1]]}
              >
                Content
              </HvCanvasBottomPanel>
              <HvCanvasBottomPanel
                open
                minimize
                className={classes.panel}
                tabs={tabs}
                leftActions={[leftActions[0]]}
                rightActions={[rightActions[0], rightActions[1]]}
              >
                Content
              </HvCanvasBottomPanel>
              <HvCanvasBottomPanel
                open
                minimize
                className={classes.panel}
                tabs={[
                  {
                    id: 1,
                    title: "Tab 2",
                  },
                ]}
                leftActions={[leftActions[0]]}
                rightActions={[rightActions[0], rightActions[1]]}
              >
                Content
              </HvCanvasBottomPanel>
              <HvCanvasToolbarTabs defaultTabs={toolbarTabs} />
              <HvCanvasToolbarTabs
                allowTabEdit={false}
                defaultTabs={toolbarTabs}
              />
              <HvCanvasToolbarTabs defaultTabs={toolbarTabsOverflow} />
            </>
          )}
        </HvSimpleGrid>
      </div>
    );
  },
};
