import { isValidElement } from "react";
import { css, cx } from "@emotion/css";
import { Handle, NodeProps, NodeToolbar, Position } from "reactflow";
import {
  HvButton,
  HvIconButton,
  HvTooltip,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import {
  HvFlowNodeInput,
  HvFlowNodeOutput,
  useHvNode,
} from "@hitachivantara/uikit-react-lab";
import { HvColorAny, theme } from "@hitachivantara/uikit-styles";

import { useCanvasContext } from "./Context";
import { FlowStatus, flowStatusesSpecs, iconsMapping } from "./utils";

const classes = {
  root: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "16px",
    backgroundColor: theme.colors.atmo1,
    boxShadow: theme.colors.shadow,
    borderWidth: "1px",
    minWidth: "200px",
    minHeight: "100px",
    borderColor: "var(--node-border-color)",
  }),
  content: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing("sm"),
    gap: theme.space.xs,
  }),
  contentIcon: css({
    width: 48,
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radii.round,
    backgroundColor: "var(--icon-bg-color)",
  }),
  nodeToolbar: css({
    backgroundColor: theme.colors.atmo1,
    borderRadius: theme.radii.full,
  }),
  handle: css({
    backgroundColor: theme.colors.secondary_80,
    border: `1px solid ${theme.colors.atmo1}`,
    height: 8,
    width: 8,
  }),
  statusIcon: css({ position: "absolute", top: -8, right: -8 }),
  contentInfo: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    "& > button": { marginTop: theme.space.xs, alignSelf: "center" },
  }),
};

export type NodeData =
  | undefined
  | {
      nodeLabel?: string; // nodeLabel is automatically added by HvFlow when the node is dropped
      tableId?: string;
      subtitle?: string;
      color?: HvColorAny;
      icon?: string;
      output?: HvFlowNodeOutput;
      input?: HvFlowNodeInput;
      status?: FlowStatus;
    };

export const Node = ({ id, data = {} }: NodeProps<NodeData>) => {
  const {
    nodeLabel: titleProp,
    subtitle: subtitleProp,
    color: colorProp,
    icon: iconProp,
    input: inputProp,
    output: outputProp,
    status: statusProp,
    tableId,
  } = data;

  const {
    toggleShowActions,
    getNodeToolbarProps,
    handleDefaultAction,
    nodeActions,
    color,
    subtitle,
    icon,
    title,
  } = useHvNode({
    id,
    title: titleProp,
    subtitle: subtitleProp,
    color: colorProp,
    icon: iconProp
      ? iconsMapping[iconProp as keyof typeof iconsMapping]
      : undefined,
    inputs: inputProp ? [inputProp] : undefined,
    outputs: outputProp ? [outputProp] : undefined,
  });

  const { selectedTable, setOpenedTables, setSelectedTable } =
    useCanvasContext();

  const status = statusProp ? flowStatusesSpecs[statusProp] : undefined;

  return (
    <div
      style={{
        // @ts-ignore
        "--node-border-color": status ? status.color : color,
        "--icon-bg-color": color,
      }}
      className={cx(
        "nowheel", // Disables the default canvas pan behaviour when scrolling inside the node
        classes.root,
      )}
      onMouseEnter={toggleShowActions}
      onMouseLeave={toggleShowActions}
    >
      <NodeToolbar className={classes.nodeToolbar} {...getNodeToolbarProps()}>
        {nodeActions?.map((action) => (
          <HvIconButton
            key={action.id}
            title={action.label}
            onClick={() => handleDefaultAction(action)}
          >
            {isValidElement(action.icon) ? action.icon : null}
          </HvIconButton>
        ))}
      </NodeToolbar>
      {inputProp && (
        <Handle
          className={classes.handle}
          type="target"
          position={Position.Left}
          id={inputProp.id ?? "0"}
        />
      )}
      {outputProp && (
        <Handle
          className={classes.handle}
          type="source"
          position={Position.Right}
          id={outputProp.id ?? "0"}
        />
      )}
      <div className={classes.content}>
        <div className={classes.contentIcon}>{icon}</div>
        <div className={classes.contentInfo}>
          <HvTypography variant="title4" component="p">
            {title}
          </HvTypography>
          <HvTypography variant="caption1">{subtitle}</HvTypography>
          {tableId && (
            <HvButton
              size="sm"
              variant="primarySubtle"
              onClick={() =>
                setOpenedTables?.((prev) => {
                  const tables = prev ? [...prev] : [];
                  if (!tables.find((x) => x.id === tableId)) {
                    if (tables.length === 0 && selectedTable === "none") {
                      setSelectedTable?.(tableId);
                    }
                    tables.push({
                      id: tableId,
                      label: title,
                    });
                    return tables;
                  }
                  return prev;
                })
              }
            >
              View Data
            </HvButton>
          )}
        </div>
      </div>
      {status && (
        <HvTooltip className={classes.statusIcon} title={status.description}>
          {status.icon}
        </HvTooltip>
      )}
    </div>
  );
};
