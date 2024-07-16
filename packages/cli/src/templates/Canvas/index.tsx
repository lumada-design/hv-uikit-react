import { useMemo, useState } from "react";
import { cx } from "@emotion/css";
import { ReactFlowInstance } from "reactflow";
import {
  HvButton,
  HvDialog,
  HvDialogContent,
  HvDialogTitle,
  HvInlineEditor,
  HvOverflowTooltip,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import {
  Add,
  Close,
  DataSource,
  DropUpXS,
  Fullscreen,
  Table,
} from "@hitachivantara/uikit-react-icons";
import {
  HvFlow,
  HvFlowBackground,
  HvFlowControls,
  HvFlowEmpty,
} from "@hitachivantara/uikit-react-lab";
import {
  HvCanvasBottomPanel,
  HvCanvasBottomPanelProps,
  HvCanvasToolbar,
} from "@hitachivantara/uikit-react-pentaho";

import { CanvasProvider, useCanvasContext } from "./Context";
import { ListView } from "./ListView";
import { Node, NodeData } from "./Node";
import { CanvasSidebar } from "./Sidebar";
import { StatusEdge } from "./StatusEdge";
import { classes } from "./styles";
import { DataTable } from "./Table";
import { TreeView } from "./TreeView";
import { flowStatuses } from "./utils";

const nodeTypes = {
  node: Node,
};
const edgeTypes = {
  status: StatusEdge,
};
const initialNodes = [];
const initialEdges = [];

const sidePanelTabs = [
  {
    id: 0,
    content: (
      <div className={classes.tabLabel}>
        <DataSource />
        Data
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className={classes.tabLabel}>
        <Add />
        Nodes
      </div>
    ),
  },
];
const sidePanelContent = {
  [sidePanelTabs[0].id]: <TreeView />,
  [sidePanelTabs[1].id]: <ListView />,
};

const Page = () => {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [sidePanelTab, setSidePanelTab] = useState(sidePanelTabs[0].id);
  const [minimize, setMinimize] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [flowInstance, setFlowInstance] =
    useState<ReactFlowInstance<NodeData>>();

  const { selectedTable, openedTables, setOpenedTables, setSelectedTable } =
    useCanvasContext();

  const bottomTabs = useMemo(
    () =>
      openedTables?.map((table) => ({
        id: table.id,
        title: (
          <div className={classes.titleRoot}>
            <Table />
            <div className={classes.titleContainer}>
              <HvOverflowTooltip data={table.label} />
            </div>
          </div>
        ),
      })),
    [openedTables],
  );

  const handleCloseTab = (value: string | number) => {
    const newOpenedTables = openedTables?.filter((x) => x.id !== value) ?? [];
    if (newOpenedTables.length !== 0) {
      setOpenedTables?.(newOpenedTables);
      setSelectedTable?.(newOpenedTables[0].id as string);
    } else {
      setOpenedTables?.(undefined);
    }
  };

  const handleChangeTab: HvCanvasBottomPanelProps["onTabChange"] = (
    event,
    value,
  ) => {
    setSelectedTable?.(value as string);
  };

  const handleAction: HvCanvasBottomPanelProps["onAction"] = (
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
        if (minimize && selectedTable !== tabId) handleChangeTab(null, tabId);
        setMinimize((prev) => !prev);
        break;
      case "fullscreen":
        if (minimize && selectedTable !== tabId) handleChangeTab(null, tabId);
        setFullscreen((prev) => !prev);
        break;
      default:
        break;
    }
  };

  // Simulating an execution of the flow and updating the statuses of nodes and edges
  const handleExecute = () => {
    flowInstance?.setNodes((nodes) =>
      nodes.map((node) => {
        const random = Math.floor(Math.random() * flowStatuses.length);
        return {
          ...node,
          data: {
            ...node.data,
            status: flowStatuses[random],
          },
        };
      }),
    );
    flowInstance?.setEdges((edges) =>
      edges.map((edge) => {
        const random = Math.floor(Math.random() * flowStatuses.length);
        return {
          ...edge,
          type: Object.keys(edgeTypes)[0],
          data: {
            ...edge.data,
            status: flowStatuses[random],
          },
        };
      }),
    );
  };

  const bottomPanelOpen = useMemo(
    () =>
      !!openedTables &&
      openedTables.length > 0 &&
      bottomTabs &&
      bottomTabs.length > 0,
    [bottomTabs, openedTables],
  );

  return (
    <div className={classes.root}>
      <HvFlow
        className={classes.flow}
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={setFlowInstance}
        /** Flow sidebar passed as prop to access the flow's Dnd context inside CanvasSidePanel */
        sidebar={
          <CanvasSidebar
            tabs={sidePanelTabs}
            open={sidePanelOpen}
            tab={sidePanelTab}
            onToggle={(event, value) => setSidePanelOpen(value)}
            onTabChange={(event, value) => setSidePanelTab(value as number)}
          >
            {sidePanelContent[sidePanelTab]}
          </CanvasSidebar>
        }
      >
        <HvFlowEmpty
          className={classes.flowEmpty}
          title={
            <HvTypography variant="title3" component="p">
              Drag and Drop your Nodes
            </HvTypography>
          }
          message={
            <HvTypography
              className={classes.flowEmptyMessage}
              variant="label"
              component="p"
            >
              Then you can start configuring your flow.
            </HvTypography>
          }
          icon={null}
        />
        <HvFlowBackground />
        <HvFlowControls />
      </HvFlow>
      <HvCanvasToolbar
        className={cx(classes.toolbar, {
          [classes.fullWidth]: !sidePanelOpen,
          [classes.minWidth]: sidePanelOpen,
        })}
        title={<HvInlineEditor defaultValue="My Canvas" variant="title4" />}
      >
        <HvButton variant="primary" onClick={handleExecute}>
          Execute
        </HvButton>
      </HvCanvasToolbar>
      {bottomTabs && bottomPanelOpen && (
        <HvCanvasBottomPanel
          className={cx({
            [classes.fullWidth]: !sidePanelOpen,
            [classes.minWidth]: sidePanelOpen,
          })}
          open={bottomPanelOpen}
          minimize={minimize}
          tabs={bottomTabs}
          tab={selectedTable}
          leftActions={[
            {
              id: "toggle",
              label: minimize ? "Maximize" : "Minimize",
              icon: (
                <DropUpXS
                  style={{ rotate: !minimize ? "180deg" : undefined }}
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
          <DataTable id={selectedTable} />
        </HvCanvasBottomPanel>
      )}
      {bottomPanelOpen && (
        <HvDialog
          fullWidth
          maxWidth="lg"
          open={fullscreen}
          onClose={() => setFullscreen((prev) => !prev)}
        >
          <HvDialogTitle className={classes.dialogTitle}>
            {bottomTabs?.find((x) => x.id === selectedTable)?.title}
          </HvDialogTitle>
          <HvDialogContent>
            <DataTable id={selectedTable} />
          </HvDialogContent>
        </HvDialog>
      )}
    </div>
  );
};

const Canvas = () => (
  <CanvasProvider>
    <Page />
  </CanvasProvider>
);

export default Canvas;
