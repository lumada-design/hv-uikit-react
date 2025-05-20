import { isValidElement } from "react";
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
import { HvColorAny } from "@hitachivantara/uikit-styles";

import { useCanvasContext } from "./Context";
import { FlowStatus, flowStatusesSpecs, iconsMapping } from "./utils";

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
      style={
        {
          "--node-border-color": status ? status.color : color,
          "--icon-bg-color": color,
        } as React.CSSProperties
      }
      // Disables the default canvas pan behaviour when scrolling inside the node
      className="nowheel flex items-center justify-center b-rounded-large bg-bgContainer shadow-shadow b-1px min-w-200px min-h-100px b-[var(--node-border-color)]"
      onMouseEnter={toggleShowActions}
      onMouseLeave={toggleShowActions}
    >
      <NodeToolbar
        className="bg-bgContainer b-rounded-full"
        {...getNodeToolbarProps()}
      >
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
          className="bg-secondary_80 b-1px b-bgContainer h-8px w-8px"
          type="target"
          position={Position.Left}
          id={inputProp.id ?? "0"}
        />
      )}
      {outputProp && (
        <Handle
          className="bg-secondary_80 b-1px b-abgContainertmo1 h-8px w-8px"
          type="source"
          position={Position.Right}
          id={outputProp.id ?? "0"}
        />
      )}
      <div className="flex items-center justify-center p-sm gap-xs">
        <div className="w-48px h-48px flex justify-centeritems-center b-rounded-round bg-[var(--icon-bg-color)]">
          {icon}
        </div>
        <div className="flex flex-col items-start justify-center [&>button]:mt-xs [&>button]:self-center">
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
        <HvTooltip
          className="absolute top-[-8px] right-[-8px]"
          title={status.description}
        >
          {status.icon}
        </HvTooltip>
      )}
    </div>
  );
};
