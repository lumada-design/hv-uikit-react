import { useState } from "react";
import { css } from "@emotion/css";
import {
  HvDashboard,
  HvDashboardProps,
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeInput,
  HvFlowNodeTypeMeta,
  useFlowContext,
} from "@hitachivantara/uikit-react-lab";
import {
  HvButton,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvEmptyState,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Info } from "@hitachivantara/uikit-react-icons";

import {
  DASHBOARDS_STORAGE_KEY,
  DashboardSpecs,
  DashboardsStorage,
  NodeGroup,
} from "../types";

type PreviewProps = {
  id: string;
  type: string;
  label: React.ReactNode;
  node: any;
};

const PreviewRenderer = ({ label, node }: PreviewProps) => (
  <div
    className={css({
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      width: "100%",
      padding: theme.space.xs,
      border: `1px solid ${theme.colors.atmo4}`,
      borderRadius: theme.radii.round,
      backgroundColor: theme.colors.atmo1,
    })}
  >
    <HvTypography
      variant="title4"
      className={css({ marginBottom: theme.space.xs })}
    >
      {label}
    </HvTypography>
    <HvTypography className={css({ color: theme.colors.secondary_60 })}>
      {node.data.title}
    </HvTypography>
  </div>
);

const nodeInputs: HvFlowNodeInput[] = [
  {
    label: "Visualizations",
    isMandatory: true,
    accepts: ["visualizations"],
  },
];

export const Dashboard: HvFlowNodeFC = (props) => {
  const { id } = props;

  const { nodeTypes } = useFlowContext();

  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<DashboardSpecs>();
  const [content, setContent] = useState<PreviewProps[]>();

  const handleOpenConfig = () => {
    // Get from local storage
    const value = localStorage.getItem(DASHBOARDS_STORAGE_KEY);
    const specs: DashboardsStorage = value ? JSON.parse(value) : undefined;
    const newConfig = specs?.[id];

    const ct = newConfig?.items?.map<PreviewProps>((node) => {
      const nodeType = node.type!;
      const label = nodeType && nodeTypes?.[nodeType].meta?.label;

      return { id: node.id, type: nodeType, label, node };
    });

    // Open
    setOpen(true);
    setConfig(newConfig);
    setContent(ct);
  };

  const handleClose = () => {
    setOpen(false);
    setConfig(undefined);
    setContent(undefined);
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

  const handleLayoutChange: HvDashboardProps["onLayoutChange"] = (ly) => {
    setConfig((conf) => ({ ...conf!, layout: ly }));
  };

  return (
    <>
      <HvFlowNode description="Dashboard" inputs={nodeInputs} {...props}>
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            padding: theme.spacing("xs", "xs", "sm", "xs"),
            gap: theme.space.xs,
          })}
        >
          <HvButton onClick={handleOpenConfig}>Configure</HvButton>
          <HvButton
            variant="primarySubtle"
            component="a"
            href={`./?dashboard=${id}`}
            target="_blank"
          >
            Preview
          </HvButton>
        </div>
      </HvFlowNode>
      <HvDialog maxWidth="lg" fullWidth open={open} onClose={handleClose}>
        <HvDialogTitle variant="info">Configure Dashboard</HvDialogTitle>
        <HvDialogContent indentContent>
          <HvTypography>
            Please configure the layout of your dashboard as needed.
          </HvTypography>
          {config?.layout && config.layout.length > 0 ? (
            <HvDashboard
              layout={config.layout}
              compactType="vertical"
              rowHeight={80}
              margin={[16, 16]}
              containerPadding={[0, 16]}
              onLayoutChange={handleLayoutChange}
            >
              {content?.map((item) => (
                <div key={item.id} className={css({ display: "flex" })}>
                  <PreviewRenderer {...item} />
                </div>
              ))}
            </HvDashboard>
          ) : (
            <HvEmptyState
              className={css({
                padding: theme.spacing("sm", 0, 0, 0),
              })}
              icon={<Info />}
              message="No visualizations connected to the dashboard."
            />
          )}
        </HvDialogContent>
        <HvDialogActions>
          <HvButton variant="primary" onClick={handleApply}>
            Apply
          </HvButton>
          <HvButton variant="secondarySubtle" onClick={handleClose}>
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </>
  );
};

Dashboard.meta = {
  label: "Dashboard",
  groupId: "dashboard",
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
