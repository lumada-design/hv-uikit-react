import {
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NodeToolbarProps } from "reactflow";
import { uid } from "uid";
import { useLabels } from "@hitachivantara/uikit-react-core";
import { Delete, Duplicate } from "@hitachivantara/uikit-react-icons";
import { getColor, HvColorAny, theme } from "@hitachivantara/uikit-styles";

import { useNodeMetaRegistry } from "../FlowContext/NodeMetaContext";
import { identifyHandles } from "../Node/utils";
import {
  HvFlowNodeAction,
  HvFlowNodeInput,
  HvFlowNodeInputGroup,
  HvFlowNodeOutput,
  HvFlowNodeOutputGroup,
} from "../types";
import { useFlowContext } from "./useFlowContext";
import { useFlowInstance } from "./useFlowInstance";
import {
  useFlowNode,
  useFlowNodeInputEdges,
  useFlowNodeOutputEdges,
} from "./useFlowNode";

const DEFAULT_LABELS = {
  deleteActionLabel: "Delete",
  duplicateActionLabel: "Duplicate",
};

export interface HvUseNodeParams {
  id: string;
  /** Node group ID */
  groupId?: string;

  title?: string;

  subtitle?: string;

  icon?: React.ReactNode;

  color?: HvColorAny;
  /** Node inputs */
  inputs?: (HvFlowNodeInput | HvFlowNodeInputGroup)[];
  /** Node outputs */
  outputs?: (HvFlowNodeOutput | HvFlowNodeOutputGroup)[];
  /** Node actions */
  nodeActions?: HvFlowNodeAction[];
  /** Labels used on the default actions. */
  labels?: Partial<typeof DEFAULT_LABELS>;
  /** Props for the NodeToolbar Component */
  nodeToolbarProps?: NodeToolbarProps;
}

export function useHvNode(props: HvUseNodeParams) {
  const {
    id,
    title: titleProp,
    icon: iconProp,
    color: colorProp,
    subtitle: subtitleProp,
    nodeActions: nodeActionsProp,
    inputs: inputsProp,
    outputs: outputsProp,
    groupId,
    labels: labelsProps,
    nodeToolbarProps,
  } = props;

  const { registerNode, unregisterNode } = useNodeMetaRegistry();
  const labels = useLabels(DEFAULT_LABELS, labelsProps);
  const inputs = useMemo(() => identifyHandles(inputsProp), [inputsProp]);
  const inputEdges = useFlowNodeInputEdges();
  const outputs = useMemo(() => identifyHandles(outputsProp), [outputsProp]);
  const outputEdges = useFlowNodeOutputEdges();
  const { nodeGroups } = useFlowContext();

  const node = useFlowNode();

  const reactFlowInstance = useFlowInstance();

  const nodeGroup = (groupId && nodeGroups && nodeGroups[groupId]) || undefined;

  const title = titleProp || nodeGroup?.label;
  const icon = iconProp || nodeGroup?.icon;
  const color = getColor(colorProp || nodeGroup?.color);
  const iconColor = isValidElement(icon)
    ? getColor(icon.props.color || "base_dark")
    : getColor("base_dark");
  const subtitle = subtitleProp || node?.data.nodeLabel;

  const [showActions, setShowActions] = useState(false);

  const toggleShowActions = useCallback(() => {
    setShowActions(!showActions);
  }, [showActions]);

  const getNodeToolbarProps = useCallback(
    () => ({
      offset: 0,
      isVisible: showActions,
      ...nodeToolbarProps,
    }),
    [nodeToolbarProps, showActions],
  );

  const nodeActions = useMemo<HvFlowNodeAction[]>(
    () =>
      nodeActionsProp || [
        { id: "delete", label: labels?.deleteActionLabel, icon: <Delete /> },
        {
          id: "duplicate",
          label: labels?.duplicateActionLabel,
          icon: <Duplicate />,
        },
      ],
    [labels?.deleteActionLabel, labels?.duplicateActionLabel, nodeActionsProp],
  );

  useEffect(() => {
    registerNode(id, {
      label: title || "",
      inputs,
      outputs,
    });
    return () => unregisterNode(id);
  }, [id, title, inputs, outputs, registerNode, unregisterNode]);

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
    [node, reactFlowInstance],
  );

  return useMemo(
    () => ({
      // state
      id,
      title,
      icon,
      color,
      iconColor,
      subtitle,
      inputs,
      inputEdges,
      outputs,
      outputEdges,
      node,
      nodeActions,
      showActions,
      // prop getters
      getNodeToolbarProps,
      // actions
      toggleShowActions,
      handleDefaultAction,
    }),
    [
      id,
      title,
      icon,
      color,
      iconColor,
      subtitle,
      inputs,
      inputEdges,
      outputs,
      outputEdges,
      node,
      nodeActions,
      showActions,
      getNodeToolbarProps,
      toggleShowActions,
      handleDefaultAction,
    ],
  );
}
