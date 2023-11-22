import { isValidElement, useCallback, useEffect, useState } from "react";
import {
  Edge,
  Handle,
  NodeProps,
  NodeToolbar,
  Position,
  useReactFlow,
} from "reactflow";
import { uid } from "uid";
import {
  ExtractNames,
  HvActionGeneric,
  HvBaseProps,
  HvButton,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Delete, Duplicate } from "@hitachivantara/uikit-react-icons";
import { HvColorAny, getColor, theme } from "@hitachivantara/uikit-styles";

import {
  HvFlowNodeAction,
  HvFlowBuiltInActions,
  HvFlowNodeInput,
  HvFlowNodeOutput,
} from "../types";
import {
  useFlowNode,
  useFlowNodeInputEdges,
  useFlowNodeOutputEdges,
} from "../hooks/useFlowNode";
import { useNodeMetaRegistry } from "../FlowContext/NodeMetaContext";
import { staticClasses, useClasses } from "./BaseNode.styles";

export { staticClasses as flowBaseNodeClasses };

export type HvFlowBaseNodeClasses = ExtractNames<typeof useClasses>;

export interface HvFlowBaseNodeProps<T = any>
  extends Omit<HvBaseProps, "id">,
    NodeProps<T> {
  /** Header title */
  title?: string;
  /** Header icon */
  icon?: React.ReactNode;
  /** Header color */
  color?: HvColorAny;
  /** Header items */
  headerItems?: React.ReactNode;
  /** Node inputs */
  inputs?: HvFlowNodeInput[];
  /** Node outputs */
  outputs?: HvFlowNodeOutput[];
  /** Node actions */
  nodeActions?: HvFlowNodeAction[];
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowBaseNodeClasses;
}

const isInputConnected = (
  id: string,
  type: "target" | "source",
  handleId: string,
  edges: Edge[]
) => {
  if (type === "target") {
    return edges.some((e) => e.target === id && e.targetHandle === handleId);
  }
  if (type === "source") {
    return edges.some((e) => e.source === id && e.sourceHandle === handleId);
  }

  return false;
};

const defaultActions: HvFlowBuiltInActions[] = [
  { id: "delete", label: "Delete", icon: <Delete /> },
  { id: "duplicate", label: "Duplicate", icon: <Duplicate /> },
];

const renderedIcon = (actionIcon: HvActionGeneric["icon"]) =>
  isValidElement(actionIcon) ? actionIcon : (actionIcon as Function)?.();

export const HvFlowBaseNode = ({
  id,
  title,
  headerItems,
  icon,
  color: colorProp,
  inputs,
  outputs,
  nodeActions = defaultActions,
  classes: classesProp,
  className,
  children,
}: HvFlowBaseNodeProps<unknown>) => {
  const { registerNode, unregisterNode } = useNodeMetaRegistry();
  useEffect(() => {
    registerNode(id, { label: title || "", inputs, outputs });
    return () => unregisterNode(id);
  }, [id, title, inputs, outputs, registerNode, unregisterNode]);

  const [showActions, setShowActions] = useState(false);
  const reactFlowInstance = useReactFlow();

  const { classes, cx, css } = useClasses(classesProp);

  const node = useFlowNode(id);
  const inputEdges = useFlowNodeInputEdges(id);
  const outputEdges = useFlowNodeOutputEdges(id);

  const handleDefaultAction = useCallback(
    (action: HvFlowNodeAction) => {
      if (!node) return;

      if (action.callback) {
        action.callback(node);
        return;
      }

      // built-in actions
      switch (action.id) {
        case "delete":
          reactFlowInstance.deleteElements({ nodes: [node] });
          break;
        case "duplicate":
          reactFlowInstance.addNodes([
            {
              ...node,
              id: uid(),
              position: {
                x: node.position.x,
                y: node.position.y + (node.height || 0) + 20,
              },
              selected: false,
              zIndex: Number(theme.zIndices.overlay),
            },
          ]);
          break;
        default:
          break;
      }
    },
    [node, reactFlowInstance]
  );

  if (!node) return null;

  const color = getColor(colorProp);
  const iconColor = isValidElement(icon)
    ? getColor(icon.props.color || "base_dark")
    : getColor("base_dark");

  return (
    <div
      className={cx(
        "nowheel", // Disables the default canvas pan behaviour when scrolling inside the node
        css({ border: `1px solid ${color}` }),
        classes.root,
        className
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <NodeToolbar isVisible={showActions} offset={0}>
        {nodeActions?.map((action) => (
          <HvButton
            key={action.id}
            icon
            onClick={() => handleDefaultAction(action)}
          >
            {renderedIcon(action.icon)}
          </HvButton>
        ))}
      </NodeToolbar>
      <div
        className={cx(css({ backgroundColor: color }), classes.headerContainer)}
      >
        <div
          className={cx(
            classes.titleContainer,
            css({ "& svg *.color0": { fill: iconColor } })
          )}
        >
          {icon}
          <HvTypography
            component="p"
            variant="title4"
            className={classes.title}
          >
            {title}
          </HvTypography>
        </div>
        {headerItems && <div style={{ display: "flex" }}>{headerItems}</div>}
      </div>
      {children && <div className={classes.contentContainer}>{children}</div>}
      {inputs && inputs.length > 0 && (
        <>
          <div className={classes.inputsTitleContainer}>
            <HvTypography>Inputs</HvTypography>
          </div>

          <div className={classes.inputsContainer}>
            {inputs?.map((input, idx) => {
              const handleId = input.id ?? idx.toString();
              return (
                <div className={classes.inputContainer} key={idx}>
                  <Handle
                    type="target"
                    isConnectableStart={false}
                    id={handleId}
                    position={Position.Left}
                    style={{
                      top: "auto",
                      bottom:
                        (outputs?.length ? 80 : 18) +
                        (outputs?.length || 0) * 29 +
                        29 * idx,
                    }}
                  />
                  <HvTypography>{input.label}</HvTypography>
                  {input.isMandatory &&
                    !isInputConnected(id, "target", handleId, inputEdges) && (
                      <div className={classes.mandatory} />
                    )}
                </div>
              );
            })}
          </div>
        </>
      )}
      {outputs && outputs.length > 0 && (
        <>
          <div className={classes.outputsTitleContainer}>
            <HvTypography>Outputs</HvTypography>
          </div>
          <div className={classes.outputsContainer}>
            {outputs?.map((output, idx) => {
              const handleId = output.id ?? idx.toString();
              return (
                <div className={classes.outputContainer} key={idx}>
                  <Handle
                    type="source"
                    isConnectableEnd={false}
                    id={handleId}
                    position={Position.Right}
                    style={{
                      bottom: -10 + 29 * (outputs.length - idx),
                      top: "auto",
                    }}
                  />
                  {output.isMandatory &&
                    !isInputConnected(id, "source", handleId, outputEdges) && (
                      <div className={classes.mandatory} />
                    )}
                  <HvTypography>{output.label}</HvTypography>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
