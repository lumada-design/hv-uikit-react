import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import {
  HvDashboardNode,
  HvFlowNodeFC,
  HvFlowNodeInput,
} from "@hitachivantara/uikit-react-lab";
import {
  HvButton,
  HvSection,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

import {
  DASHBOARDS_STORAGE_KEY,
  DashboardSpecs,
  DashboardsStorage,
  NodeData,
} from "../types";

import { toTitleCase } from "../utils";

type PreviewProps = {
  id: string;
  type?: string;
  label: React.ReactNode;
  node: any;
};

const PreviewRenderer = ({ label, node }: PreviewProps) => (
  <HvSection
    title={<HvTypography variant="title4">{label}</HvTypography>}
    classes={{ content: "mt-0" }}
  >
    <HvTypography className="text-secondary_60">{node.data.title}</HvTypography>
  </HvSection>
);

const nodeInputs: HvFlowNodeInput[] = [
  {
    label: "Visualizations",
    isMandatory: true,
    accepts: ["visualizations"],
  },
];

const classes = {
  footer: css({
    display: "flex",
    gap: theme.space.sm,
    justifyContent: "center",
  }),
};

export const Dashboard: HvFlowNodeFC<NodeData> = (props) => {
  const { id } = props;

  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<DashboardSpecs>();

  const content = useMemo(() => {
    if (!config) return undefined;

    return config.items.map<PreviewProps>((node) => {
      const label = toTitleCase(node.type);

      return { id: node.id, type: node.type, label, node };
    });
  }, [config]);

  const handleOpenConfig = () => {
    // Get from local storage
    const value = localStorage.getItem(DASHBOARDS_STORAGE_KEY);
    const specs: DashboardsStorage = value ? JSON.parse(value) : undefined;
    const newConfig = specs?.[id];

    // Open
    setOpen(true);
    setConfig(newConfig);
  };

  const handleClose = () => {
    setOpen(false);
    setConfig(undefined);
  };

  const handleApply = () => {
    // Save to local storage
    const value = localStorage.getItem(DASHBOARDS_STORAGE_KEY);
    const specs: DashboardsStorage = value ? JSON.parse(value) : undefined;
    specs[id] = config;
    localStorage.setItem(DASHBOARDS_STORAGE_KEY, JSON.stringify(specs));

    // Close
    handleClose();
  };

  return (
    <HvDashboardNode
      title="Dashboard"
      description="Dashboard"
      group="dashboard"
      inputs={nodeInputs}
      open={open}
      layout={config?.layout}
      labels={{
        emptyMessage: "No visualizations connected to the dashboard.",
        dialogTitle: "Configure dashboard",
        dialogSubtitle:
          "Please configure the layout of your dashboard as needed.",
        dialogApply: "Apply",
        dialogCancel: "Cancel",
      }}
      onClose={handleClose}
      onApply={handleApply}
      onCancel={handleClose}
      dashboardProps={{
        cols: config?.cols,
        onLayoutChange: (ly) => {
          setConfig((conf) => ({ ...conf!, layout: ly }));
        },
      }}
      previewItems={content?.map((item) => (
        <div key={item.id} className="flex">
          <PreviewRenderer {...item} />
        </div>
      ))}
      classes={{
        footerContainer: classes.footer,
      }}
      footer={
        <>
          <HvButton size="sm" onClick={handleOpenConfig}>
            Configure
          </HvButton>
          <HvButton
            size="sm"
            variant="primarySubtle"
            component="a"
            href={`./?dashboard=${id}`}
            target="_blank"
          >
            Preview
          </HvButton>
        </>
      }
      {...props}
    />
  );
};
