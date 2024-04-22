import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import {
  HvButton,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvEmptyState,
  HvSection,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Info } from "@hitachivantara/uikit-react-icons";
import {
  HvDashboard,
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeInput,
  HvFlowNodeTypeMeta,
  useFlowContext,
} from "@hitachivantara/uikit-react-lab";

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
  empty: css({
    padding: theme.spacing("sm", 0, 0, 0),
  }),
  footer: css({
    display: "flex",
    gap: theme.space.sm,
    justifyContent: "center",
  }),
};

export const Dashboard: HvFlowNodeFC<NodeGroup> = (props) => {
  const { id } = props;

  const { nodeTypes } = useFlowContext();

  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<DashboardSpecs>();

  const content = useMemo(() => {
    if (!config) return undefined;

    return config.items.map<PreviewProps>((node) => {
      const nodeType = node.type!;
      const label = nodeType && nodeTypes?.[nodeType].meta?.label;

      return { id: node.id, type: nodeType, label, node };
    });
  }, [config, nodeTypes]);

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
    <HvFlowNode
      description="Dashboard"
      inputs={nodeInputs}
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
    >
      <HvDialog open={open} maxWidth="lg" fullWidth onClose={handleClose}>
        <HvDialogTitle variant="info">Configure dashboard</HvDialogTitle>
        <HvDialogContent indentContent>
          Please configure the layout of your dashboard as needed.
          {config?.layout && config?.layout?.length > 0 ? (
            <HvDashboard
              cols={config?.cols || 12}
              layout={config?.layout}
              compactType="vertical"
              rowHeight={80}
              margin={[16, 16]}
              containerPadding={[0, 16]}
              onLayoutChange={(ly) => {
                setConfig((conf) => ({ ...conf!, layout: ly }));
              }}
            >
              {content?.map((item) => (
                <div key={item.id} className="flex">
                  <PreviewRenderer {...item} />
                </div>
              ))}
            </HvDashboard>
          ) : (
            <HvEmptyState
              className={classes.empty}
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
    </HvFlowNode>
  );
};

Dashboard.meta = {
  label: "Dashboard",
  groupId: "dashboard",
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
