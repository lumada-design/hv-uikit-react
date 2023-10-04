import {
  ExtractNames,
  HvActionGeneric,
  HvActionsGenericProps,
  HvBaseProps,
  HvButton,
  HvDropDownMenu,
  HvTooltip,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Down, Info, Up } from "@hitachivantara/uikit-react-icons";
import { getColor, theme } from "@hitachivantara/uikit-styles";
import { isValidElement, useCallback, useEffect, useState } from "react";
import {
  Handle,
  NodeProps,
  NodeToolbar,
  Position,
  useReactFlow,
  useStore,
} from "reactflow";
import { useFlowContext } from "../FlowContext/FlowContext";

import {
  HvFlowDefaultAction,
  HvFlowNodeInput,
  HvFlowNodeOutput,
  HvFlowNodeParam,
} from "../types";
import { staticClasses, useClasses } from "./Node.styles";
import ParamRenderer from "./Parameters/ParamRenderer";

export { staticClasses as flowNodeClasses };

export type HvFlowNodeClasses = ExtractNames<typeof useClasses>;

export interface HvFlowNodeProps extends Omit<HvBaseProps, "id">, NodeProps {
  /** Node description */
  description: string;
  /** Node expanded */
  expanded?: boolean;
  /** Node inputs */
  inputs?: HvFlowNodeInput[];
  /** Node outputs */
  outputs?: HvFlowNodeOutput[];
  /** Node parameters */
  params?: HvFlowNodeParam[];
  /** Node actions */
  actions?: HvActionGeneric[]; // HvFlowNodeActions[];
  /** Node action callback */
  actionCallback?: HvActionsGenericProps["actionsCallback"];
  /** Node maximum number of actions visible */
  maxVisibleActions?: number;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowNodeClasses;
}

const isInputConnected = (id, type, idx, edges) => {
  if (type === "target") {
    return edges.some(
      (e) => e.target === id && e.targetHandle === idx.toString()
    );
  }
  if (type === "source") {
    return edges.some(
      (e) => e.source === id && e.sourceHandle === idx.toString()
    );
  }
};

export const HvFlowNode = ({
  id,
  type,
  description,
  expanded = false,
  params,
  actions,
  actionCallback,
  maxVisibleActions = 1,
  classes: classesProp,
  className,
  children,
}: HvFlowNodeProps) => {
  const [showParams, setShowParams] = useState(expanded);
  const [showActions, setShowActions] = useState(false);
  const reactFlowInstance = useReactFlow();

  const { classes, cx, css } = useClasses(classesProp);

  const { nodeGroups, nodeTypes, defaultActions } = useFlowContext();
  const edges = useStore((s) => s.edges);
  const nodes = useStore((s) => s.getNodes());

  const node = nodes.find((n) => n.id === id);

  const groupId = nodeTypes?.[type].meta?.groupId;
  const title = nodeTypes?.[type].meta?.label;
  const groupLabel = groupId && nodeGroups && nodeGroups[groupId].label;

  const inputs = nodeTypes?.[type]?.meta?.inputs;
  const outputs = nodeTypes?.[type]?.meta?.outputs;
  const icon = groupId && nodeGroups && nodeGroups[groupId].icon;
  const colorProp = groupId && nodeGroups && nodeGroups[groupId].color;
  const color = getColor(colorProp);

  useEffect(() => {
    const newNodes = nodes.map((n) => {
      if (n.id === id) {
        if (Object.keys(n.data).length === 0) {
          params?.forEach((param) => {
            n.data[param.id] = param.value;
          });
        }
      }
      return n;
    });
    reactFlowInstance.setNodes(newNodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDefaultAction = useCallback(
    (action: HvFlowDefaultAction) => {
      if (!node) return;

      switch (action) {
        case "delete":
          reactFlowInstance.deleteElements({ nodes: [node] });
          break;
        case "duplicate":
          reactFlowInstance.addNodes([
            {
              ...node,
              id: `${reactFlowInstance.getNodes().length + 1}`,
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

  const hasParams = !!(params && params.length > 0);

  if (!node) return null;

  const actsVisible = actions?.slice(0, maxVisibleActions);
  const actsDropdown = actions?.slice(maxVisibleActions);

  const renderedIcon = (actionIcon: HvActionGeneric["icon"]) =>
    isValidElement(actionIcon) ? actionIcon : (actionIcon as Function)?.();

  return (
    <div
      className={cx(
        css({ border: `1px solid ${color}` }),
        classes.root,
        className
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <NodeToolbar isVisible={showActions} offset={0}>
        {defaultActions?.map((action) => (
          <HvButton icon onClick={() => handleDefaultAction(action.id)}>
            {renderedIcon(action.icon)}
          </HvButton>
        ))}
      </NodeToolbar>
      <div
        className={cx(css({ backgroundColor: color }), classes.headerContainer)}
      >
        <div className={classes.groupContainer}>
          {icon}
          <HvTypography variant="title4" className={classes.group}>
            {groupLabel}
          </HvTypography>
        </div>
        <div style={{ display: "flex" }}>
          <HvTooltip title={<HvTypography>{description}</HvTypography>}>
            <div>
              <Info />
            </div>
          </HvTooltip>
          <HvButton
            icon
            disabled={!hasParams}
            onClick={() => setShowParams((p) => !p)}
          >
            {showParams ? <Up /> : <Down />}
          </HvButton>
        </div>
      </div>
      <div className={classes.titleContainer}>
        <div>
          <HvTypography>{title}</HvTypography>
        </div>
        <div className={classes.actions}>
          {actions?.length && actions?.length > 0 && (
            <>
              {actsVisible?.map((action) => (
                <HvTooltip title={<HvTypography>{action.label}</HvTypography>}>
                  <div>
                    <HvButton
                      icon
                      onClick={(event) => {
                        actionCallback?.(event, node.id, action);
                      }}
                    >
                      {renderedIcon(action.icon)}
                    </HvButton>
                  </div>
                </HvTooltip>
              ))}

              {actsDropdown && actsDropdown.length > 0 && (
                <HvDropDownMenu
                  keepOpened={false}
                  dataList={actsDropdown?.map((action) => ({
                    id: action.id,
                    label: action.label,
                  }))}
                  onClick={(event, action) => {
                    actionCallback?.(event, node.id, action as HvActionGeneric);
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
      {children && <div className={classes.contentContainer}>{children}</div>}
      {showParams && params && (
        <div className={classes.paramsContainer}>
          <ParamRenderer nodeId={id} params={params} data={node?.data} />
        </div>
      )}
      {inputs && inputs.length > 0 && (
        <>
          <div className={classes.inputsTitleContainer}>
            <HvTypography>Inputs</HvTypography>
          </div>

          <div className={classes.inputsContainer}>
            {inputs?.map((input, idx) => (
              <div className={classes.inputContainer} key={idx}>
                <Handle
                  type="target"
                  isConnectableStart={false}
                  id={`${idx}`}
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
                  !isInputConnected(id, "target", idx, edges) && (
                    <div className={classes.mandatory} />
                  )}
              </div>
            ))}
          </div>
        </>
      )}
      {outputs && outputs.length > 0 && (
        <>
          <div className={classes.outputsTitleContainer}>
            <HvTypography>Outputs</HvTypography>
          </div>
          <div className={classes.outputsContainer}>
            {outputs?.map((output, idx) => (
              <div className={classes.outputContainer} key={idx}>
                <Handle
                  type="source"
                  isConnectableEnd={false}
                  id={`${idx}`}
                  position={Position.Right}
                  style={{
                    bottom: -10 + 29 * (outputs.length - idx),
                    top: "auto",
                  }}
                />
                {output.isMandatory &&
                  !isInputConnected(id, "source", idx, edges) && (
                    <div className={classes.mandatory} />
                  )}
                <HvTypography>{output.label}</HvTypography>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
