import { useState } from "react";
import { css } from "@emotion/css";
import { Layout } from "react-grid-layout";
import {
  HvButton,
  HvSection,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import {
  HvFlowNodeFC,
  HvDashboardNode,
  useFlowInputNodes,
} from "@hitachivantara/uikit-react-lab";

import type { NodeGroups } from ".";

const classes = {
  footer: css({ display: "flex", justifyContent: "center" }),
};

export const Dashboard: HvFlowNodeFC<NodeGroups> = (props) => {
  const { id: idProp } = props;
  const [open, setOpen] = useState(false);

  const inputNodes = useFlowInputNodes(idProp);

  const nodeLayout = inputNodes.map<Layout>((node, i) => {
    const { type, data } = node;
    const fullWidth = node.type !== "kpi";
    const h = 2;
    const w = fullWidth ? 12 : 4;
    const x = fullWidth ? 0 : i * 4;
    const y = fullWidth ? h * i : Math.floor((h * i) / 2);
    return { i: node.id, type, data, w, h, x, y };
  });

  const previewItems = inputNodes.map((node) => (
    <div key={node.id} className="flex">
      <HvSection
        title={<HvTypography variant="title3">{node.type}</HvTypography>}
      >
        Preview for the <code>`{node.type}`</code> node
      </HvSection>
    </div>
  ));

  return (
    <HvDashboardNode
      description="Dashboard description"
      open={open}
      onClose={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      layout={nodeLayout}
      expanded
      params={[
        {
          id: "dashboardType",
          label: "Dashboard",
          type: "select",
          options: ["Time Series", "KPI", "Table"],
        },
      ]}
      inputs={[
        {
          label: "Insights",
          isMandatory: true,
          accepts: ["insight"],
        },
      ]}
      previewItems={previewItems}
      classes={{
        footerContainer: classes.footer,
      }}
      footer={
        <HvButton
          size="sm"
          variant="secondarySubtle"
          onClick={() => setOpen(true)}
        >
          Preview Dashboard
        </HvButton>
      }
      {...props}
    />
  );
};

Dashboard.meta = {
  label: "Dashboard",
  groupId: "dashboard",
};
