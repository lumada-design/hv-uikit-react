import { useState } from "react";
import { css } from "@emotion/css";
import {
  HvDashboard,
  HvDashboardProps,
  HvFlowNode,
  HvFlowNodeFC,
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

interface Configuration {
  opened: boolean;
  config?: DashboardSpecs;
}

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

export const Dashboard: HvFlowNodeFC = (props) => {
  const { id } = props;

  const { nodeTypes } = useFlowContext();

  const [configuration, setConfiguration] = useState<Configuration>({
    opened: false,
  });
  const [content, setContent] = useState<PreviewProps[]>();

  const handleOpenConfig = () => {
    // Get from local storage
    const value = localStorage.getItem(DASHBOARDS_STORAGE_KEY);
    const specs: DashboardsStorage = value ? JSON.parse(value) : undefined;
    const config = specs?.[id];

    const ct = config?.items?.map<PreviewProps>((node) => {
      const nodeType = node.type!;
      const label = nodeType && nodeTypes?.[nodeType].meta?.label;

      return { id: node.id, type: nodeType, label, node };
    });

    // Open
    setConfiguration({
      opened: true,
      config,
    });
    setContent(ct);
  };

  const handleClose = () => {
    setConfiguration({ opened: false });
    setContent(undefined);
  };

  const handleApply = () => {
    // Save to local storage
    const value = localStorage.getItem(DASHBOARDS_STORAGE_KEY);
    const specs: DashboardsStorage = value ? JSON.parse(value) : undefined;
    specs[id] = configuration.config;
    localStorage.setItem(DASHBOARDS_STORAGE_KEY, JSON.stringify(specs));

    // Close
    setConfiguration({ opened: false });
    setContent(undefined);
  };

  const handleLayoutChange: HvDashboardProps["onLayoutChange"] = (ly) => {
    setConfiguration({
      ...configuration,
      config: {
        ...configuration.config!,
        layout: ly,
      },
    });
  };

  return (
    <>
      <HvFlowNode description="Dashboard" {...props}>
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
      <HvDialog
        maxWidth="lg"
        fullWidth
        open={configuration.opened}
        onClose={handleClose}
      >
        <HvDialogTitle variant="info">Configure Dashboard</HvDialogTitle>
        <HvDialogContent indentContent>
          <HvTypography>
            Please configure the layout of your dashboard as needed.
          </HvTypography>
          {configuration.config?.layout &&
          configuration.config.layout.length > 0 ? (
            <HvDashboard
              layout={configuration.config.layout}
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
  inputs: [
    {
      label: "Visualizations",
      isMandatory: true,
      accepts: ["visualizations"],
    },
  ],
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
