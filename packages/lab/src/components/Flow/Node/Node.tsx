import {
  ExtractNames,
  HvBaseProps,
  HvButton,
  HvTooltip,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Down, Info, Up } from "@hitachivantara/uikit-react-icons";
import { getColor } from "@hitachivantara/uikit-styles";
import { useEffect, useState } from "react";
import { Handle, NodeProps, Position, useReactFlow, useStore } from "reactflow";
import { useFlowContext } from "../FlowContext/FlowContext";

import { HvFlowNodeInput, HvFlowNodeOutput, HvFlowNodeParam } from "../types";
import { staticClasses, useClasses } from "./Node.styles";
import ParamRenderer from "./Parameters/ParamRenderer";

export { staticClasses as flowNodeClasses };

export type HvFlowNodeClasses = ExtractNames<typeof useClasses>;

export interface HvFlowNodeProps extends Omit<HvBaseProps, "id">, NodeProps {
  /** Node title */
  title: string;
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
  title,
  description,
  expanded = false,
  params,
  classes: classesProp,
  className,
}: HvFlowNodeProps) => {
  const [showParams, setShowParams] = useState(expanded);
  const reactFlowInstance = useReactFlow();

  const { classes, cx, css } = useClasses(classesProp);

  const { nodeGroups, nodeTypes } = useFlowContext();
  const edges = useStore((s) => s.edges);
  const nodes = useStore((s) => s.getNodes());

  const node = nodes.find((n) => n.id === id);

  const groupId = nodeTypes?.[type].meta?.groupId;
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
            n.data[param.label] = param.value;
          });
        }
      }
      return n;
    });
    reactFlowInstance.setNodes(newNodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasParams = !!(params && params.length > 0);

  return (
    <div
      className={cx(
        css({ border: `1px solid ${color}` }),
        classes.root,
        className
      )}
    >
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
        <HvTypography>{title}</HvTypography>
      </div>
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
                top: 160 + 29 * idx,
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
      {showParams && params && (
        <div className={classes.paramsContainer}>
          <ParamRenderer nodeId={id} params={params} data={node?.data} />
        </div>
      )}
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
                bottom: -8 + 29 * (outputs.length - idx),
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
    </div>
  );
};
