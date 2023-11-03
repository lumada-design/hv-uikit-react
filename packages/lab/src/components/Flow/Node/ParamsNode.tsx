import { useState } from "react";

import { NodeProps, useStore } from "reactflow";

import { ExtractNames, HvButton } from "@hitachivantara/uikit-react-core";
import { Down, Up } from "@hitachivantara/uikit-react-icons";

import { HvFlowNodeParam } from "../types";
import { staticClasses, useClasses } from "./ParamsNode.styles";
import ParamRenderer from "./Parameters/ParamRenderer";
import { HvFlowBaseNode, HvFlowBaseNodeProps } from "./BaseNode";

export { staticClasses as flowParamsNodeClasses };
// TODO How to include here the types from the parent component?
export type HvFlowPramsNodeClasses = ExtractNames<typeof useClasses>;

export interface HvFlowParamsNodeProps<T>
  extends Omit<HvFlowBaseNodeProps<T>, "classes">,
    NodeProps<T> {
  /** Node expanded */
  expanded?: boolean;
  /** Node parameters */
  params?: HvFlowNodeParam[];
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowPramsNodeClasses | HvFlowBaseNodeProps<T>["classes"];
}

export const HvFlowParamsNode = ({
  id,
  headerItems,
  expanded = false,
  params,
  classes: classesProp,
  children,
  ...props
}: HvFlowParamsNodeProps<unknown>) => {
  const [showParams, setShowParams] = useState(expanded);

  const { classes } = useClasses(classesProp as HvFlowPramsNodeClasses);

  const nodes = useStore((s) => s.getNodes());

  const node = nodes.find((n) => n.id === id);

  const hasParams = !!(params && params.length > 0);

  if (!node) return null;

  return (
    <HvFlowBaseNode
      id={id}
      classes={classesProp as HvFlowBaseNodeProps<unknown>["classes"]}
      headerItems={
        <>
          {headerItems}
          {hasParams && (
            <HvButton icon onClick={() => setShowParams((p) => !p)}>
              {showParams ? <Up /> : <Down />}
            </HvButton>
          )}
        </>
      }
      {...props}
    >
      {children}
      {showParams && params && (
        <div className={classes.paramsContainer}>
          <ParamRenderer nodeId={id} params={params} data={node?.data} />
        </div>
      )}
    </HvFlowBaseNode>
  );
};
