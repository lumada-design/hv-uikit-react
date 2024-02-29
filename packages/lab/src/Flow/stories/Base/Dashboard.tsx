import { useCallback, useEffect, useMemo, useState } from "react";
import { css } from "@emotion/css";
import {
  HvButton,
  HvSection,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import {
  HvFlowNodeFC,
  HvDashboardNode,
  HvFlowNodeProps,
  useFlowInstance,
  useFlowNodeInputEdges,
} from "@hitachivantara/uikit-react-lab";

import { LayoutConfig, useLayoutsContext } from "./LayoutsContext";
import { buildLayout } from "./utils";

interface DashboardData {
  config: LayoutConfig;
}

const INSIGHTS_INPUT_ID = "insights";

const classes = {
  footer: css({ display: "flex", justifyContent: "center" }),
};

export const Dashboard: HvFlowNodeFC<DashboardData> = (props) => {
  const { id, data } = props;

  const [config, setConfig] = useState<LayoutConfig>();

  const edges = useFlowNodeInputEdges();
  const instance = useFlowInstance();
  const { layouts, setLayouts } = useLayoutsContext();

  const inputs = useMemo(() => {
    const ins: HvFlowNodeProps["inputs"] = [
      {
        id: INSIGHTS_INPUT_ID,
        label: "Insights",
        accepts: ["kpi", "table", "lineChart"],
      },
    ];

    if (data.config?.items) {
      const predefinedInputs = data.config.items
        .filter((i) => i.predefined)
        .map((i) => ({
          id: i.id,
          label: i.label,
          accepts: [i.type],
          maxConnections: 1,
          isMandatory: true,
        }));
      ins.push({
        label: "Predefined Dashboard",
        inputs: predefinedInputs,
      });
    }

    return ins;
  }, [data.config.items]);

  const updateLayout = useCallback(
    (cfg?: LayoutConfig) => {
      setLayouts?.((prevLayouts) => {
        prevLayouts[id] = cfg;
        return prevLayouts;
      });
    },
    [id, setLayouts]
  );

  // Mount: set layout in context
  useEffect(() => {
    const initConfig = instance.getNode(id)?.data.config;
    if (initConfig) {
      updateLayout(initConfig);
    }
  }, [id, instance, updateLayout]);

  const persistChanges = useCallback(
    (egs: typeof edges) => {
      const currentConfig = layouts?.[id];

      // Process predefined items
      const predefinedItems =
        currentConfig?.items
          ?.filter((i) => i.predefined)
          .reduce<NonNullable<LayoutConfig["items"]>>((acc, item) => {
            const edge = egs.find(
              (ed) => ed.targetHandle === item.id && ed.target === id
            );

            if (!edge && item.connected) {
              acc.push({
                ...item,
                connected: false,
              });
            } else if (edge && !item.connected) {
              acc.push({
                ...item,
                connected: true,
              });
            } else {
              acc.push(item);
            }
            return acc;
          }, []) || [];

      // Process connections to not predefined items
      const insightsItems = egs
        .filter((i) => i.targetHandle === INSIGHTS_INPUT_ID)
        .reduce<NonNullable<LayoutConfig["items"]>>((acc, edge) => {
          const node = instance.getNodes().find((nd) => nd.id === edge.source);
          const viz: NonNullable<LayoutConfig["items"]> = [];

          if (node) {
            viz.push({
              id: node.id,
              label: node.type || "",
              type: node.type || "",
              connected: true,
              predefined: false,
            });
          }

          if (viz.length > 0) {
            acc.push(
              ...viz.map((v) => {
                const found = currentConfig?.items?.find((x) => x.id === v.id);

                if (found) {
                  return found;
                }
                return v;
              })
            );
          }
          return acc;
        }, []);

      const items = predefinedItems.concat(insightsItems);

      const newConfig = {
        items,
        layout: buildLayout(
          items,
          currentConfig?.layout,
          currentConfig?.cols as number
        ),
        cols: currentConfig?.cols,
      };
      updateLayout(newConfig);
    },
    [id, instance, layouts, updateLayout]
  );

  useEffect(() => {
    persistChanges(edges);
  }, [edges, persistChanges]);

  return (
    <HvDashboardNode
      title="Dashboard"
      subtitle="Dashboard"
      description="Dashboard description"
      group="dashboards"
      open={config != null}
      onClose={() => setConfig(undefined)}
      onCancel={() => setConfig(undefined)}
      onApply={() => {
        updateLayout(config);
        setConfig(undefined);
      }}
      dashboardProps={{
        cols: config?.cols,
        rowHeight: 100,
        onLayoutChange: (ly) => {
          setConfig((conf) => ({ ...conf!, layout: ly }));
        },
      }}
      layout={config?.layout}
      inputs={inputs}
      previewItems={config?.items?.map((item) => (
        <div key={item.id} className="flex">
          <HvSection
            title={<HvTypography variant="title3">{item.label}</HvTypography>}
          >
            Predefined: <code>`{String(item.predefined ?? false)}`</code>;
            Connected: <code>`{String(item.connected ?? false)}`</code>
          </HvSection>
        </div>
      ))}
      footer={
        <HvButton
          size="sm"
          variant="secondarySubtle"
          onClick={() => setConfig(layouts?.[id] || {})}
        >
          Preview
        </HvButton>
      }
      classes={{
        footerContainer: classes.footer,
      }}
      {...props}
    />
  );
};
