import { useState } from "react";
import { css, cx } from "@emotion/css";
import { BackgroundVariant } from "reactflow";
import {
  HvButton,
  HvDropDownMenu,
  HvIconButton,
  HvInlineEditor,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Backwards,
  Calendar,
  DataSource,
  Plane,
  Redo,
  Schema,
  Undo,
  User,
} from "@hitachivantara/uikit-react-icons";
import {
  HvCanvasPanel,
  HvCanvasToolbar,
  HvFlow,
  HvFlowBackground,
  HvFlowMinimap,
} from "@hitachivantara/uikit-react-lab";

// The code is available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/Canvas/stories
import { ListView } from "./ListView/ListView";
import { eds, nds, nodeTypes } from "./nodes";
import { TreeView } from "./TreeView";

const classes = {
  separator: css({
    height: 30,
    width: 1,
    backgroundColor: theme.colors.atmo4,
    margin: `0 ${theme.space.xs}`,
  }),
  flow: css({ width: "100%", height: "100vh" }),
  toolbarFull: css({
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    width: `calc(100% - 2 * ${theme.space.md})`,
  }),
  toolbarMin: css({
    right: theme.space.md,
    width: `calc(100% - 320px - 2 * ${theme.space.md})`,
  }),
};

const tabs = [
  {
    id: "1",
    content: (
      <>
        <DataSource />
        Add Data
      </>
    ),
  },
  {
    id: "2",
    content: (
      <>
        <Schema />
        Model Structure
      </>
    ),
  },
];

const Separator = () => <div className={classes.separator} />;

export const MainStory = () => {
  const [selectedTab, setSelectedTab] = useState<string>("1");
  const [opened, setOpened] = useState(false);

  return (
    <>
      <HvFlow
        className={classes.flow}
        snapGrid={[1, 1]}
        snapToGrid
        nodes={nds}
        edges={eds}
        nodeTypes={nodeTypes}
      >
        <HvFlowBackground
          color={theme.colors.secondary_80}
          variant={BackgroundVariant.Dots}
          gap={16}
          style={{ color: "red" }}
        />
        <HvFlowMinimap />
      </HvFlow>
      <HvCanvasToolbar
        className={cx({
          [classes.toolbarFull]: !opened,
          [classes.toolbarMin]: opened,
        })}
        backButton={
          <HvButton aria-label="Back" icon>
            <Backwards />
          </HvButton>
        }
        title={<HvInlineEditor value="Semantic Model Name" variant="title4" />}
      >
        <HvIconButton title="Undo">
          <Undo />
        </HvIconButton>
        <HvIconButton title="Redo">
          <Redo />
        </HvIconButton>
        <Separator />
        <HvButton variant="primary">Save</HvButton>
        <HvButton variant="primaryGhost">Cancel</HvButton>
        <Separator />
        <HvDropDownMenu
          placement="right"
          onClick={(e, item) => console.log(item.label)}
          dataList={[
            { label: "Label 1", icon: <User /> },
            { label: "Label 2", icon: <Calendar />, disabled: true },
            { label: "Label 3", icon: <Plane /> },
          ]}
        />
      </HvCanvasToolbar>
      <HvCanvasPanel
        open={opened}
        tabs={tabs}
        onTabChange={(event, tabId) => setSelectedTab(tabId)}
        onToggle={(event, value) => setOpened(value)}
      >
        {selectedTab === "1" && <TreeView />}
        {selectedTab === "2" && <ListView />}
      </HvCanvasPanel>
    </>
  );
};
