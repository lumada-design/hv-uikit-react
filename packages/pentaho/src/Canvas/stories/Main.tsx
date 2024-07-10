import { useMemo, useState } from "react";
import { cx } from "@emotion/css";
import { BackgroundVariant } from "reactflow";
import {
  HvButton,
  HvDialog,
  HvDialogContent,
  HvDialogTitle,
  HvDropDownMenu,
  HvIconButton,
  HvInlineEditor,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Backwards,
  Calendar,
  Close,
  DropUpXS,
  Fullscreen,
  Plane,
  Redo,
  Undo,
  User,
} from "@hitachivantara/uikit-react-icons";
import {
  HvFlow,
  HvFlowBackground,
  HvFlowMinimap,
} from "@hitachivantara/uikit-react-lab";
import {
  HvCanvasFloatingPanel,
  HvCanvasFloatingPanelProps,
  HvCanvasPanel,
  HvCanvasToolbar,
} from "@hitachivantara/uikit-react-pentaho";

// The code is available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/Canvas/stories
import { eds, nds, nodeTypes } from "./nodes";
import { classes } from "./styles";
import {
  floatingPanelContent,
  floatingPanelTabs,
  panelContent,
  panelTabs,
  Separator,
} from "./utils";

export const MainStory = () => {
  // --- State for Canvas Panel
  const [panelTab, setPanelTab] = useState(panelTabs[0].id);
  const [panelOpened, setPanelOpened] = useState(false);

  // --- State for Canvas Floating Panel
  const [floatingPanelTab, setFloatingPanelTab] = useState(
    floatingPanelTabs[0].id,
  );
  const [floatingPanelOpened, setFloatingPanelOpened] = useState(false);
  const [floatingTabs, setFloatingTabs] =
    useState<HvCanvasFloatingPanelProps["tabs"]>(floatingPanelTabs);
  const [minimized, setMinimized] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const handleCloseTab = (value: string | number) => {
    const newFloatingTabs = floatingTabs.filter((tab) => tab.id !== value);
    if (newFloatingTabs.length !== 0) {
      setFloatingTabs(newFloatingTabs);
      setFloatingPanelTab(newFloatingTabs[0].id as number);
    } else {
      setFloatingPanelOpened(false);
    }
  };

  const handleChangeTab: HvCanvasFloatingPanelProps["onTabChange"] = (
    event,
    value,
  ) => {
    setFloatingPanelTab(value as number);
  };

  const handleAction: HvCanvasFloatingPanelProps["onAction"] = (
    event,
    action,
    tabId,
  ) => {
    switch (action.id) {
      case "close":
        event.stopPropagation();
        handleCloseTab(tabId);
        break;
      case "toggle":
        if (minimized && floatingPanelTab !== tabId)
          handleChangeTab(null, tabId);
        setMinimized((prev) => !prev);
        break;
      case "fullscreen":
        if (minimized && floatingPanelTab !== tabId)
          handleChangeTab(null, tabId);
        setFullscreen((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const dialogTitle = useMemo(
    () => floatingPanelTabs.find((tab) => tab.id === floatingPanelTab)?.title,
    [floatingPanelTab],
  );

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
        />
        <HvFlowMinimap />
      </HvFlow>
      <HvCanvasToolbar
        className={cx({
          [classes.absoluteFull]: !panelOpened,
          [classes.absoluteMin]: panelOpened,
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
        <HvButton
          variant="primaryGhost"
          onClick={() => {
            setFloatingPanelOpened(!floatingPanelOpened);
            setFloatingTabs(floatingPanelTabs);
            setFloatingPanelTab(floatingPanelTabs[0].id);
          }}
        >
          Toggle
        </HvButton>
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
        open={panelOpened}
        tabs={panelTabs}
        tab={panelTab}
        onTabChange={(event, value) => setPanelTab(value as number)}
        onToggle={(event, value) => setPanelOpened(value)}
      >
        {panelContent[panelTab]}
      </HvCanvasPanel>
      <HvCanvasFloatingPanel
        className={cx({
          [classes.absoluteFull]: !panelOpened,
          [classes.absoluteMin]: panelOpened,
        })}
        open={floatingPanelOpened}
        minimize={minimized}
        tabs={floatingTabs}
        tab={floatingPanelTab}
        leftActions={[
          {
            id: "toggle",
            label: minimized ? "Maximize" : "Minimize",
            icon: (
              <DropUpXS
                style={{ rotate: !minimized ? "180deg" : undefined }}
                className={classes.toggleIcon}
              />
            ),
          },
        ]}
        rightActions={[
          {
            id: "fullscreen",
            label: "Fullscreen",
            icon: <Fullscreen />,
          },
          {
            id: "close",
            label: "Close",
            icon: <Close />,
          },
        ]}
        onTabChange={handleChangeTab}
        onAction={handleAction}
      >
        {floatingPanelContent[floatingPanelTab]}
      </HvCanvasFloatingPanel>
      <HvDialog
        fullWidth
        maxWidth="lg"
        open={fullscreen}
        onClose={() => setFullscreen((prev) => !prev)}
      >
        <HvDialogTitle className={classes.dialogTitle}>
          {dialogTitle}
        </HvDialogTitle>
        <HvDialogContent>
          {floatingPanelContent[floatingPanelTab]}
        </HvDialogContent>
      </HvDialog>
    </>
  );
};
