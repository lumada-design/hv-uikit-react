import { NodeProps } from "reactflow";
import { css } from "@emotion/css";
import {
  HvFlowNode,
  HvFlowNodeTypeMeta,
} from "@hitachivantara/uikit-react-lab";
import { HvButton, theme } from "@hitachivantara/uikit-react-core";

import { NodeGroup } from "../types";

export const Dashboard = (props: NodeProps) => {
  const { id } = props;

  return (
    <HvFlowNode description="Dashboard" {...props}>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          padding: theme.spacing("xs", "xs", "sm", "xs"),
        })}
      >
        <HvButton
          component="a"
          href={`./dashboard-preview?id=${id}`}
          target="_blank"
        >
          Preview
        </HvButton>
      </div>
    </HvFlowNode>
  );
};

Dashboard.meta = {
  label: "Dashboard",
  groupId: "dashboard",
  inputs: [
    {
      label: "Visualizations",
      isMandatory: true,
      accepts: ["visualizations"],
    },
  ],
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
