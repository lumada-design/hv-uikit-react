import { useState } from "react";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { HvButton } from "@hitachivantara/uikit-react-core";
import { Favorite, Heart } from "@hitachivantara/uikit-react-icons";
import {
  HvCanvasBottomPanel,
  HvCanvasBottomPanelProps,
} from "@hitachivantara/uikit-react-pentaho";

import { MainStory } from "./stories/Main";
import MainRaw from "./stories/Main?raw";

const meta: Meta<typeof HvCanvasBottomPanel> = {
  title: "Pentaho/Canvas/Bottom Panel",
  component: HvCanvasBottomPanel,
};
export default meta;

export const Main: StoryObj<HvCanvasBottomPanelProps> = {
  args: { open: true },
  argTypes: {
    tabs: { control: { disable: true } },
    classes: { control: { disable: true } },
    selectedTabId: { control: { disable: true } },
    leftActions: { control: { disable: true } },
    rightActions: { control: { disable: true } },
  },
  parameters: {
    docs: {
      source: {
        code: MainRaw,
      },
    },
  },
  render: (args) => {
    return <MainStory {...args} />;
  },
};

const classes = {
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

export const AutomationTest: StoryObj = {
  parameters: {
    docs: { disable: true },
  },
  render: () => {
    const [minimize, setMinimize] = useState(false);
    const [open, setOpen] = useState(true);
    const [selectedTab, setSelectedTab] = useState(tabs[0].id);

    const handleAction: HvCanvasBottomPanelProps["onAction"] = (
      event,
      action,
      tabId,
    ) => alert(`You clicked action ${action.label} for ${tabId}.`);

    return (
      <>
        <HvButton onClick={() => setOpen((prev) => !prev)}>
          Toggle Open
        </HvButton>
        <HvButton onClick={() => setMinimize((prev) => !prev)}>
          Toggle Minimize
        </HvButton>
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
      </>
    );
  },
};

export const Test: StoryObj = {
  parameters: {
    docs: { disable: true },
  },
  render: () => (
    <>
      <HvCanvasBottomPanel
        open
        className={classes.panel}
        tabs={tabs}
        leftActions={leftActions}
        rightActions={rightActions}
        overflowActions={[...leftActions, ...rightActions]}
      >
        Content
      </HvCanvasBottomPanel>
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
    </>
  ),
};
