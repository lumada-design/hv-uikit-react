import { useMemo, useState } from "react";
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
  HvFlowProps,
} from "@hitachivantara/uikit-react-lab";
import {
  HvCanvasBottomPanel,
  HvCanvasBottomPanelProps,
  HvCanvasProvider,
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
const initialNodes: HvFlowProps["nodes"] = [];
const initialEdges: HvFlowProps["edges"] = [];

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

  const bottomTabs = useMemo(() => {
    return (openedTables || []).map((table) => ({
      id: table.id,
      title: (overflowing) => (
        <div className={classes.titleRoot}>
          {!overflowing && <Table />}
          <HvOverflowTooltip data={table.label} />
        </div>
      ),
    })) satisfies HvCanvasBottomPanelProps["tabs"];
  }, [openedTables]);

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

  const leftActions = [
    {
      id: "toggle",
      label: minimize ? "Maximize" : "Minimize",
      icon: <DropUpXS size="XS" rotate={!minimize} />,
    },
  ];

  const rightActions = [
    {
      id: "fullscreen",
      label: "Fullscreen",
      icon: <Fullscreen iconSize="XS" />,
    },
    {
      id: "close",
      label: "Close",
      icon: <Close iconSize="XS" />,
    },
  ];

  return (
    <div className={classes.root}>
      <HvCanvasProvider>
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
          className={classes.toolbar}
          title={<HvInlineEditor defaultValue="My Canvas" variant="title4" />}
        >
          <HvButton variant="primary" onClick={handleExecute}>
            Execute
          </HvButton>
        </HvCanvasToolbar>
        {bottomTabs.length > 0 && bottomPanelOpen && (
          <HvCanvasBottomPanel
            classes={{
              rightActions: classes.rightActions,
            }}
            open={bottomPanelOpen}
            minimize={minimize}
            tabs={bottomTabs}
            selectedTabId={selectedTable}
            leftActions={leftActions}
            rightActions={rightActions}
            overflowActions={[...leftActions, ...rightActions]}
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
              {bottomTabs.find((x) => x.id === selectedTable)?.title(false)}
            </HvDialogTitle>
            <HvDialogContent>
              <DataTable id={selectedTable} />
            </HvDialogContent>
          </HvDialog>
        )}
      </HvCanvasProvider>
    </div>
  );
};

const Canvas = () => (
  <CanvasProvider>
    <Page />
  </CanvasProvider>
);

export default Canvas;
