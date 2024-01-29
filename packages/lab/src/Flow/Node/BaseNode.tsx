import React, {
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Handle,
  NodeProps,
  NodeToolbar,
  Position,
  useReactFlow,
} from "reactflow";
import { uid } from "uid";
import {
  ExtractNames,
  HvBaseProps,
  HvButton,
  HvTooltip,
  HvTypography,
  useLabels,
} from "@hitachivantara/uikit-react-core";
import { Delete, Duplicate } from "@hitachivantara/uikit-react-icons";
import { HvColorAny, getColor, theme } from "@hitachivantara/uikit-styles";

import {
  HvFlowNodeAction,
  HvFlowNodeInput,
  HvFlowNodeOutput,
  HvFlowNodeOutputGroup,
  HvFlowNodeInputGroup,
} from "../types";
import {
  useFlowNode,
  useFlowNodeInputEdges,
  useFlowNodeOutputEdges,
} from "../hooks/useFlowNode";
import { useNodeMetaRegistry } from "../FlowContext/NodeMetaContext";
import { staticClasses, useClasses } from "./BaseNode.styles";
import {
  identifyHandles,
  isConnected,
  isInputGroup,
  isOutputGroup,
  renderedIcon,
} from "./utils";

export { staticClasses as flowBaseNodeClasses };

export type HvFlowBaseNodeClasses = ExtractNames<typeof useClasses>;

const DEFAULT_LABELS = {
  outputsTitle: "Outputs",
  inputsTitle: "Inputs",
  deleteActionLabel: "Delete",
  duplicateActionLabel: "Duplicate",
};

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
  inputs?: (HvFlowNodeInput | HvFlowNodeInputGroup)[];
  /** Node outputs */
  outputs?: (HvFlowNodeOutput | HvFlowNodeOutputGroup)[];
  /** Node actions */
  nodeActions?: HvFlowNodeAction[];
  /** The content of the node footer */
  footer?: React.ReactNode;
  /** Labels used on the node. */
  labels?: Partial<typeof DEFAULT_LABELS>;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowBaseNodeClasses;
}

export const HvFlowBaseNode = ({
  id,
  title,
  headerItems,
  icon,
  color: colorProp,
  inputs: inputsProp,
  outputs: outputsProp,
  nodeActions: nodeActionsProp,
  footer,
  classes: classesProp,
  labels: labelsProps,
  className,
  children,
}: HvFlowBaseNodeProps<unknown>) => {
  const { registerNode, unregisterNode } = useNodeMetaRegistry();

  const labels = useLabels(DEFAULT_LABELS, labelsProps);

  const inputs = useMemo(() => identifyHandles(inputsProp), [inputsProp]);

  const outputs = useMemo(() => identifyHandles(outputsProp), [outputsProp]);

  const nodeActions = useMemo(
    () =>
      nodeActionsProp || [
        { id: "delete", label: labels?.deleteActionLabel, icon: <Delete /> },
        {
          id: "duplicate",
          label: labels?.duplicateActionLabel,
          icon: <Duplicate />,
        },
      ],
    [labels?.deleteActionLabel, labels?.duplicateActionLabel, nodeActionsProp]
  );

  useEffect(() => {
    registerNode(id, {
      label: title || "",
      inputs,
      outputs,
    });
    return () => unregisterNode(id);
  }, [id, title, inputs, outputs, registerNode, unregisterNode]);

  const [showActions, setShowActions] = useState(false);
  const reactFlowInstance = useReactFlow();

  const { classes, cx, css } = useClasses(classesProp);

  const node = useFlowNode();
  const inputEdges = useFlowNodeInputEdges();
  const outputEdges = useFlowNodeOutputEdges();

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

  const renderOutput = (output: HvFlowNodeOutput) => {
    const edgeConnected = isConnected(id, "source", output.id!, outputEdges);

    return (
      <div className={classes.outputContainer} key={output.id}>
        <Handle
          type="source"
          isConnectableEnd={false}
          id={output.id}
          position={Position.Right}
          className={cx(classes.handle, {
            [classes.handleConnected]: edgeConnected,
          })}
        />
        {output.isMandatory && !edgeConnected && (
          <div className={classes.mandatory} />
        )}
        <HvTypography component="div">{output.label}</HvTypography>
      </div>
    );
  };

  const renderInput = (input: HvFlowNodeInput) => {
    const edgeConnected = isConnected(id, "target", input.id!, inputEdges);

    return (
      <div className={classes.inputContainer} key={input.id}>
        <Handle
          type="target"
          isConnectableStart={false}
          id={input.id}
          position={Position.Left}
          className={cx(classes.handle, {
            [classes.handleConnected]: edgeConnected,
          })}
        />
        <HvTypography component="div">{input.label}</HvTypography>
        {input.isMandatory && !edgeConnected && (
          <div className={classes.mandatory} />
        )}
      </div>
    );
  };

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
          <HvTooltip key={action.id} enterDelay={500} title={action.label}>
            <HvButton icon onClick={() => handleDefaultAction(action)}>
              {renderedIcon(action.icon)}
            </HvButton>
          </HvTooltip>
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
            <HvTypography>{labels?.inputsTitle}</HvTypography>
          </div>
          <div className={classes.inputsContainer}>
            {inputs?.map((input, idx) => {
              if (!isInputGroup(input)) return renderInput(input);

              return (
                <div
                  className={classes.inputGroupContainer}
                  key={`group${idx}`}
                >
                  <HvTypography component="div" variant="label">
                    {input.label}
                  </HvTypography>
                  {(input as HvFlowNodeInputGroup).inputs.map((inp) =>
                    renderInput(inp)
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
            <HvTypography>{labels?.outputsTitle}</HvTypography>
          </div>
          <div className={classes.outputsContainer}>
            {outputs?.map((output, idx) => {
              if (!isOutputGroup(output)) {
                return renderOutput(output);
              }

              return (
                <div
                  className={classes.outputGroupContainer}
                  key={`group${idx}`}
                >
                  <HvTypography component="div" variant="label">
                    {output.label}
                  </HvTypography>
                  {(output as HvFlowNodeOutputGroup).outputs.map((out) => {
                    return renderOutput(out);
                  })}
                </div>
              );
            })}
          </div>
        </>
      )}
      {footer && <div className={classes.footerContainer}>{footer}</div>}
    </div>
  );
};
