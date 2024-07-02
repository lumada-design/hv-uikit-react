import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { Background, BackgroundVariant, MiniMap } from "reactflow";
import {
  HvButton,
  HvDropDownMenu,
  HvIconButton,
  HvInlineEditor,
  HvLoading,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Backwards,
  Calendar,
  DataSource,
  Plane,
  Pod,
  Redo,
  Schema,
  Undo,
  User,
} from "@hitachivantara/uikit-react-icons";
import {
  HvCanvasPanel,
  HvCanvasTab,
  HvCanvasToolbar,
  HvFlow,
} from "@hitachivantara/uikit-react-lab";

import { ListView } from "./ListView/ListView";
import { eds, nds, nodeTypes } from "./nodes";
import { TreeView } from "./TreeView";

const meta: Meta = {
  title: "Lab/Canvas",
};
export default meta;

export const Main: StoryObj = {
  args: {
    title: "Semantic Model Name",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    const [tabs, setTabs] = useState<HvCanvasTab[]>([]);
    const [selectedTab, setSelectedTab] = useState<string>("1");

    const classes = {
      separator: css({
        height: 30,
        width: 1,
        backgroundColor: theme.colors.atmo4,
        margin: `0 ${theme.space.xs}`,
      }),
    };
    const backButton = (
      <HvButton aria-label="Back" icon>
        <Backwards />
      </HvButton>
    );

    const title = (
      <HvInlineEditor value="Semantic Model Name" variant="title4" />
    );

    const Separator = () => <div className={classes.separator} />;

    const renderIcon = (Icon: React.ElementType) => () => <Icon />;

    useEffect(() => {
      setTabs([
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
      ]);
    }, []);

    return tabs && tabs.length > 0 ? (
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      >
        <HvFlow
          style={{ width: "100%", height: "100vh" }}
          snapGrid={[1, 1]}
          snapToGrid
          nodes={nds}
          edges={eds}
          nodeTypes={nodeTypes}
        >
          <Background
            color={theme.palette.slate[950]}
            variant={BackgroundVariant.Dots}
            gap={16}
          />
          <MiniMap />
        </HvFlow>
        <HvCanvasPanel
          tabs={tabs}
          onTabChange={(tabId) => setSelectedTab(tabId)}
        >
          {selectedTab === "1" && <TreeView />}
          {selectedTab === "2" && <ListView />}
        </HvCanvasPanel>
        <HvCanvasToolbar backButton={backButton} title={title}>
          <HvIconButton title="Undo">
            <Undo />
          </HvIconButton>
          <HvIconButton title="Redo">
            <Redo />
          </HvIconButton>
          <Separator />
          <HvIconButton title="Add">
            <Pod />
          </HvIconButton>
          <Separator />
          <HvButton variant="primary">Save</HvButton>
          <HvButton variant="primaryGhost">Cancel</HvButton>
          <Separator />
          <HvDropDownMenu
            placement="right"
            onClick={(e, item) => console.log(item.label)}
            dataList={[
              { label: "Label 1", icon: renderIcon(User) },
              { label: "Label 2", icon: renderIcon(Calendar), disabled: true },
              { label: "Label 3", icon: renderIcon(Plane) },
            ]}
          />
        </HvCanvasToolbar>
      </div>
    ) : (
      <HvLoading />
    );
  },
};
